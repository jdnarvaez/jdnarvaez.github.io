import { CornerBrackets } from './CornerBrackets';

const TICKS = Array.from({ length: 11 }, (_, i) => i);

/**
 * Full-screen, non-interactive HUD chrome layered above the content:
 * vignette, scanlines, a targeting frame, a side ruler, and edge metadata.
 */
export function Overlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 38%, transparent 55%, color-mix(in oklab, var(--background) 88%, transparent) 100%)',
        }}
      />
      {/* scanlines */}
      <div className="scanlines absolute inset-0 opacity-50" />

      {/* targeting frame around the content viewport (below the status bar) */}
      <div className="absolute inset-x-3 bottom-3 top-[68px]">
        <CornerBrackets
          size={22}
          inset={0}
          color="color-mix(in oklab, var(--accent) 55%, transparent)"
        />
      </div>

      {/* left vertical ruler */}
      <div className="absolute bottom-10 left-3 top-[88px] hidden w-8 flex-col justify-between lg:flex">
        {TICKS.map((t) => (
          <div key={t} className="flex items-center gap-1.5">
            <span
              className="block bg-[var(--grid-line-strong,rgba(255,255,255,0.22))]"
              style={{
                width: t % 5 === 0 ? 10 : 5,
                height: 1,
                background:
                  t % 5 === 0
                    ? 'color-mix(in oklab, var(--accent) 60%, transparent)'
                    : 'color-mix(in oklab, var(--foreground) 22%, transparent)',
              }}
            />
            {t % 5 === 0 && (
              <span className="hud-label text-[8px] tabular-nums opacity-50">
                {String((10 - t) * 10).padStart(3, '0')}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* right edge rotated wordmark */}
      <div className="absolute right-[10px] top-1/2 hidden -translate-y-1/2 lg:block">
        <span
          className="hud-label text-[9px] opacity-50"
          style={{ writingMode: 'vertical-rl' }}
        >
          JDNARVÁEZ // PORTFOLIO // BUILD&nbsp;MMXXVI
        </span>
      </div>

      {/* bottom corners */}
      <div className="absolute bottom-3.5 left-5 hidden items-center gap-2 sm:flex">
        <span className="hud-label text-[9px] opacity-60"></span>
      </div>
      <div className="absolute bottom-3.5 right-6 hidden items-center gap-2 lg:flex">
        <span className="hud-label text-[9px] opacity-60"></span>
      </div>
    </div>
  );
}
