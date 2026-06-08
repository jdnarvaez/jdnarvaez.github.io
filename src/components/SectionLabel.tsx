type Props = {
  id: string;
  index: string;
  title: string;
  meta?: string;
};

/**
 * Big HUD section header + scroll anchor. `scroll-mt` offsets the fixed
 * status bar so smooth-scroll lands below it.
 */
export function SectionLabel({ id, index, title, meta }: Props) {
  return (
    <div id={id} className="scroll-mt-20 pt-10">
      <div className="flex items-end gap-3 sm:gap-4">
        <span className="hud-label mb-1 text-[var(--accent)]">{index}</span>
        <h2 className="font-display text-3xl font-black uppercase leading-none tracking-[-0.11em] text-[var(--foreground)] sm:text-5xl">
          {title}
        </h2>
        <span className="mb-1.5 hidden h-px flex-1 bg-[var(--separator)] sm:block" />
        {meta && (
          <span className="hud-label mb-1.5 hidden whitespace-nowrap sm:block">
            {meta}
          </span>
        )}
      </div>
      <div className="mt-3 h-px w-full bg-gradient-to-r from-[color:var(--accent)]/60 via-[color:var(--separator)] to-transparent" />
    </div>
  );
}
