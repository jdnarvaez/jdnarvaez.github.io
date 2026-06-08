import { useEffect, useState } from 'react';
import { TbMoon, TbSun } from 'react-icons/tb';
import { cn } from '../../utils/cn';

export type Section = { id: string; label: string; index: string };

type Props = {
  sections: Section[];
  active: string;
  progress: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function StatusBar({
  sections,
  active,
  progress,
  theme,
  onToggleTheme,
}: Props) {
  const now = useClock();
  const clock = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}`;
  const pct = Math.round(progress * 100);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className="hud-panel pointer-events-auto fixed inset-x-0 top-0 z-40 border-x-0 border-t-0"
      style={{ backdropFilter: 'blur(12px) saturate(1.1)' }}
    >
      <div className="flex h-[52px] items-center gap-4 px-3 sm:px-5">
        {/* left: identity (equal-width column) */}
        <div className="flex min-w-0 flex-1 items-center">
          <a
            href="#top"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('top')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5"
        >
          <span className="grid size-10 place-items-center border border-[var(--border)] text-[var(--accent)] text-glow font-mono text-sm font-bold leading-none">
            JDN
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[13px] font-black tracking-[-0.11em] text-[var(--foreground)]">
              JUAN&nbsp;NARVÁEZ
            </span>
            <span className="hud-label text-[9px]">DEV // DESIGN // ENG</span>
          </span>
          </a>
        </div>

        {/* center: section nav — viewport-centered between equal side columns */}
        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'group relative flex items-center gap-1.5 px-2 py-1.5 transition-colors duration-200',
                  isActive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                )}
              >
                <span
                  className={cn(
                    'size-1.5 shrink-0 transition-all duration-200',
                    isActive
                      ? 'bg-[var(--accent)] box-glow'
                      : 'bg-[var(--muted)]/40 group-hover:bg-[var(--foreground)]/60'
                  )}
                  style={{ clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }}
                />
                <span className="hud-label text-[10px] tabular-nums opacity-70">
                  {s.index}
                </span>
                <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] sm:inline pb-0.5">
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* right: telemetry + theme toggle (equal-width column) */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <span className="hidden hud-label text-[10px] tabular-nums text-[var(--foreground)]/80 md:inline">
            {clock}
          </span>
          <span className="hud-label text-[10px] tabular-nums text-[var(--accent)] md:hidden">
            {pad(pct)}%
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            aria-pressed={theme === 'light'}
            className="grid size-7 shrink-0 place-items-center border border-[var(--border)] text-[var(--foreground)] transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[var(--accent)]"
          >
            {theme === 'dark' ? <TbSun size={14} /> : <TbMoon size={14} />}
          </button>
        </div>
      </div>

      {/* scroll progress meter */}
      <div className="relative h-[2px] w-full bg-[var(--separator)]">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--accent)]"
          style={{
            width: `${pct}%`,
            boxShadow: '0 0 8px 0 color-mix(in oklab, var(--accent) 70%, transparent)',
          }}
        />
      </div>
    </header>
  );
}
