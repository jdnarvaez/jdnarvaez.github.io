import { useEffect, useRef } from 'react';
import { cn } from '../utils/cn';

type RGB = [number, number, number];

type Props = {
  src: string;
  /** Sampling columns across the width. Higher = finer. */
  columns?: number;
  /** Output aspect ratio (width / height). */
  aspect?: number;
  mode?: 'dots' | 'ascii';
  theme?: 'light' | 'dark';
  className?: string;
};

// Orange ramps: shadow -> highlight. Dark uses bright neon; light uses burnt
// orange so the dots read on the pale badge.
const RAMP: Record<'light' | 'dark', { cool: RGB; hot: RGB }> = {
  dark: { cool: [255, 106, 26], hot: [255, 201, 138] },
  light: { cool: [138, 60, 16], hot: [196, 96, 38] },
};
// dark -> light
const ASCII_RAMP = ' .,:;irsXA253hMHGS#9B&@';

const OUT_W = 360; // logical canvas width; CSS scales it to the container

/**
 * Renders an image as a dot-matrix (halftone) or ASCII portrait on a canvas,
 * tinted with the theme's neon orange. Same-origin asset, so pixel sampling is
 * un-tainted. Re-renders on prop changes only (static, cheap).
 */
export function PixelPortrait({
  src,
  columns = 48,
  aspect = 3 / 4,
  mode = 'dots',
  theme = 'dark',
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const { cool: COOL, hot: HOT } = RAMP[theme];

    const img = new Image();
    img.decoding = 'async';
    img.src = src;

    img.onload = () => {
      if (cancelled) return;
      const cols = columns;
      const rows =
        mode === 'ascii'
          ? Math.max(8, Math.round((cols * 0.5) / aspect))
          : Math.round(cols / aspect);

      // --- sample the image into a cols x rows grid (cover-crop) ---
      const sample = document.createElement('canvas');
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext('2d', { willReadFrequently: true });
      if (!sctx) return;

      const imgAspect = img.width / img.height;
      const gridAspect = cols / rows;
      let sw: number, sh: number, sx: number, sy: number;
      if (imgAspect > gridAspect) {
        sh = img.height;
        sw = img.height * gridAspect;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / gridAspect;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      sctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      // --- draw the stylized output ---
      const outH = OUT_W / aspect;
      const cellW = OUT_W / cols;
      const cellH = outH / rows;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(OUT_W * dpr);
      canvas.height = Math.round(outH * dpr);
      canvas.style.aspectRatio = `${OUT_W} / ${outH}`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, OUT_W, outH);

      if (mode === 'ascii') {
        ctx.font = `${Math.round(cellH * 0.96)}px 'Space Mono', ui-monospace, monospace`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum =
            (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          const t = Math.pow(Math.min(1, Math.max(0, lum)), 0.85);
          if (t < 0.05) continue;

          const cr = Math.round(COOL[0] + (HOT[0] - COOL[0]) * t);
          const cg = Math.round(COOL[1] + (HOT[1] - COOL[1]) * t);
          const cb = Math.round(COOL[2] + (HOT[2] - COOL[2]) * t);
          const alpha = Math.min(1, 0.32 + t * 0.8);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;

          const cx = x * cellW + cellW / 2;
          const cy = y * cellH + cellH / 2;

          if (mode === 'ascii') {
            const idx = Math.min(
              ASCII_RAMP.length - 1,
              Math.floor(t * ASCII_RAMP.length)
            );
            const ch = ASCII_RAMP[idx];
            if (ch !== ' ') ctx.fillText(ch, cx, cy);
          } else {
            const maxR = Math.min(cellW, cellH) * 0.5 * 0.92;
            const radius = maxR * Math.pow(t, 0.6);
            if (radius < 0.3) continue;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    return () => {
      cancelled = true;
    };
  }, [src, columns, aspect, mode, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('block h-full w-full', className)}
      aria-label="Portrait of Juan Narváez, rendered as a dot matrix"
      role="img"
    />
  );
}
