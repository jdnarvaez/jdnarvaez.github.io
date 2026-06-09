import type { TimelineEntry } from '../data/resume';
import { useInView } from '../hooks/useInView';
import { DecodeText } from './DecodeText';
import { Gallery } from './Gallery';
import { CornerBrackets } from './hud/CornerBrackets';
import { Tag } from './Tag';

type Props = {
  entry: TimelineEntry;
  index: string;
};

export function ExperienceItem({ entry, index }: Props) {
  const { logo, title, years, positions, organizations, highlights, tags, images } =
    entry;
  const [ref, inView] = useInView<HTMLElement>({
    rootMargin: '0px 0px -12% 0px',
  });

  return (
    <article
      ref={ref}
      className="hud-panel group relative transition-colors duration-300 hover:border-[color:var(--accent)]/45"
    >
      <CornerBrackets
        size={11}
        inset={-1}
        color="var(--accent)"
        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* header */}
      <div className="flex items-stretch justify-between gap-3 border-b border-[var(--separator)]">
        <div className="flex min-w-0 items-center gap-3 px-3 py-2.5 sm:px-4">
          <span className="hud-label text-[var(--accent)]">{index}</span>
          <span className="h-3.5 w-px bg-[var(--separator)]" />
          <h3 className="truncate font-display text-lg font-extrabold uppercase tracking-[-0.11em] text-[var(--foreground)] sm:text-xl pr-1">
            <DecodeText text={title} play={inView} />
          </h3>
        </div>
        {years && (
          <div className="flex items-center whitespace-nowrap border-l border-[var(--separator)] px-3 py-2.5 sm:px-4">
            <span className="hud-label text-[10px]">{years}</span>
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex gap-4 p-3 sm:p-4">
        {/* logo */}
        <div className="hidden shrink-0 sm:block">
          <div className="grid size-14 place-items-center border border-[var(--border)] bg-[color:var(--surface)]/60 p-1.5">
            <img
              src={logo}
              alt={`${title} logo`}
              className="max-h-full max-w-full object-contain opacity-90 transition-opacity group-hover:opacity-100"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {/* roles + orgs */}
          {(positions?.length || organizations?.length) && (
            <div className="mb-3">
              {positions && positions.length > 0 && (
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-display text-sm font-extrabold uppercase tracking-[-0.11em] text-[var(--foreground)]">
                    {positions[0]}
                  </span>
                  {positions.slice(1).map((p) => (
                    <span
                      key={p}
                      className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]"
                    >
                      / {p}
                    </span>
                  ))}
                </div>
              )}
              {organizations && organizations.length > 0 && (
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]/80">
                  {organizations.join('  //  ')}
                </div>
              )}
            </div>
          )}

          {/* highlights */}
          <ul className="flex flex-col gap-1.5">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[13px] leading-snug">
                <span
                  className="mt-[.35em] size-2 shrink-0 bg-[var(--accent)]/70"
                  style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                  aria-hidden
                />
                <span className="text-[var(--foreground)]/85">{h}</span>
              </li>
            ))}
          </ul>

          {/* tags */}
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((t, i) => (
                <Tag key={t}>
                  <DecodeText text={t} play={inView} delay={i * 30} />
                </Tag>
              ))}
            </div>
          )}

          {/* gallery */}
          {images && images.length > 0 && (
            <div className="mt-4">
              <Gallery images={images} label={title.toUpperCase()} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
