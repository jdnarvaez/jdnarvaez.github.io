import { useEffect, useRef } from 'react';
import type { TimelineEntry } from '../data/resume';
import { ExperienceItem } from './ExperienceItem';

type Props = {
  entries: TimelineEntry[];
  /** The page scroll container (ScrollShadow root) driving the progress beam. */
  scroller?: HTMLElement | null;
};

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Vertical timeline. The left spine doubles as a per-section scroll-progress
 * beam: a neon track that fills as you read down through the records.
 */
export function Timeline({ entries, scroller }: Props) {
  const olRef = useRef<HTMLOListElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ol = olRef.current;
    const beam = beamRef.current;
    if (!ol || !beam) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = ol.getBoundingClientRect();
      const line = window.innerHeight * 0.5; // reading line at viewport center
      // 0 when the list top reaches the line, 1 when its bottom passes it
      const p = Math.min(
        1,
        Math.max(0, (line - rect.top) / Math.max(1, rect.height))
      );
      const usable = Math.max(0, rect.height - 24); // track is inset 12px top/bottom
      beam.style.height = `${p * usable}px`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    const target: HTMLElement | Window = scroller ?? window;
    target.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      target.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scroller, entries.length]);

  return (
    <ol ref={olRef} className="relative mt-6 flex flex-col gap-5 sm:pl-9">
      {/* spine track (unfilled) */}
      <span
        aria-hidden
        className="absolute bottom-3 left-[14px] top-3 hidden w-px bg-[var(--separator)] sm:block"
      />
      {/* progress beam (fills with scroll) */}
      <span
        ref={beamRef}
        aria-hidden
        className="absolute left-[14px] top-3 hidden w-px sm:block"
        style={{
          height: 0,
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--accent) 25%, transparent), var(--accent))',
          boxShadow: '0 0 8px color-mix(in oklab, var(--accent) 55%, transparent)',
        }}
      />
      {entries.map((entry, i) => (
        <li key={`${entry.title}-${i}`} className="relative">
          <ExperienceItem entry={entry} index={pad(i + 1)} />
        </li>
      ))}
    </ol>
  );
}
