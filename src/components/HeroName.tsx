import { motion, useReducedMotion } from 'motion/react';

const LINES = ['JUAN', 'NARVÁEZ'];

/**
 * The hero wordmark, animated like the old SVG logo: each line's outline draws
 * in (left-to-right wipe of a stroked ghost), then the solid fill sweeps in and
 * the outline recedes. Honors reduced-motion (renders solid immediately).
 */
export function HeroName({ reveal }: { reveal: boolean }) {
  const reduce = useReducedMotion();
  const show = reveal || !!reduce;

  return (
    <h1 className="font-display text-[clamp(2.75rem,9vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.11em] text-[var(--foreground)]">
      {LINES.map((line, i) => {
        return (
          <span key={line} className="relative block w-fit">
            {/* solid fill */}
            <motion.span
              className="block"
              initial={
                reduce ? false : { clipPath: 'inset(-30% 100% -20% 0%)' }
              }
              animate={
                show
                  ? { clipPath: 'inset(-30% 0% -20% 0%)' }
                  : { clipPath: 'inset(-30% 100% -20% 0%)' }
              }
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : 0.5 + i * 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>

            {/* stroked outline that draws first, then recedes */}
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 block text-transparent"
                style={{ WebkitTextStroke: '1.5px var(--accent)' }}
                initial={{ clipPath: 'inset(-30% 100% -20% 0%)', opacity: 1 }}
                animate={
                  reveal
                    ? { clipPath: 'inset(-30% 0% -20% 0%)', opacity: 0 }
                    : { clipPath: 'inset(-30% 100% -20% 0%)', opacity: 1 }
                }
                transition={{
                  clipPath: {
                    duration: 0.8,
                    delay: i * 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: { duration: 0.4, delay: i * 0.42 + 0.7 },
                }}
              >
                {line}
              </motion.span>
            )}
          </span>
        );
      })}
    </h1>
  );
}
