import { useEffect, useState } from 'react';
import { scrollSignal } from '../three/scrollSignal';

/**
 * Document/container scroll progress (0..1) as React state for HUD readouts,
 * and keeps the shared `scrollSignal` (read by the 3D scene) up to date with
 * progress + a decaying velocity estimate.
 *
 * Pass the scroll container element (e.g. the ScrollShadow root). Falls back to
 * window/document scroll when `target` is null.
 */
export function useScrollProgress(target: HTMLElement | null): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const usesEl = !!target;
    const getMetrics = () => {
      if (target) {
        return {
          y: target.scrollTop,
          max: target.scrollHeight - target.clientHeight,
        };
      }
      const doc = document.documentElement;
      return { y: window.scrollY, max: doc.scrollHeight - window.innerHeight };
    };

    let raf = 0;
    let lastY = getMetrics().y;

    const compute = () => {
      raf = 0;
      const { y, max } = getMetrics();
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      scrollSignal.progress = p;
      scrollSignal.velocity = y - lastY;
      lastY = y;

      setProgress((prev) => (Math.abs(prev - p) < 0.0005 ? prev : p));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    const scroller: HTMLElement | Window = target ?? window;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // re-run when the target element becomes available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return progress;
}
