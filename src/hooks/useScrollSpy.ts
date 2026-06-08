import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently "active" based on scroll position. Uses
 * each section's viewport-relative top against an activation line near the top
 * of the viewport, so it works whether the page scrolls on `window` or inside
 * a scroll container (e.g. ScrollShadow).
 *
 * Pass the scroll container element so end-of-list detection is accurate.
 */
export function useScrollSpy(
  ids: string[],
  target: HTMLElement | null,
  offset = 0.35
): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = window.innerHeight * offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
      }

      // Force the last section active when scrolled to the very bottom.
      if (target) {
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 2) {
          current = ids[ids.length - 1];
        }
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1];
      }

      setActive((prev) => (prev === current ? prev : current));
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
  }, [ids, target, offset]);

  return active;
}
