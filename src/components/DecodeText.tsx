import { useEffect, useRef, useState } from 'react';

const GLYPHS = '█▓▒░/\\<>[]{}=+*#%0123456789ABCDEFXYZ';

type Props = {
  text: string;
  /** When this flips true, the decode plays once. */
  play: boolean;
  /** Stagger delay in ms before the scramble starts. */
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * One-shot "decode" effect: scrambles glyphs then resolves to `text`, left to
 * right, the first time `play` becomes true. Honors reduced motion.
 */
export function DecodeText({
  text,
  play,
  delay = 0,
  duration = 480,
  className,
}: Props) {
  const [out, setOut] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (!play || started.current) return;
    started.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text);
      return;
    }

    let raf = 0;
    const begin = performance.now() + delay;
    const tick = (now: number) => {
      if (now < begin) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const pr = Math.min(1, (now - begin) / duration);
      const revealed = Math.floor(pr * text.length);
      let s = text.slice(0, revealed);
      for (let k = revealed; k < text.length; k++) {
        s += text[k] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (pr < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, text, delay, duration]);

  return <span className={className}>{out}</span>;
}
