import { Link } from '@heroui/react';
import { TbArrowDown, TbBrandGithub, TbBrandLinkedin, TbFileText } from 'react-icons/tb';
import { profile } from '../data/resume';
import { cn } from '../utils/cn';
import { CornerBrackets } from './hud/CornerBrackets';
import { HeroName } from './HeroName';
import { PixelPortrait } from './PixelPortrait';
import { RoleCycler } from './RoleCycler';

type Theme = 'light' | 'dark';

const actionBase =
  'pointer-events-auto inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-200';

function Barcode({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('h-7 w-full', className)}
      style={{
        background:
          'repeating-linear-gradient(90deg, var(--foreground) 0 1px, transparent 1px 3px, var(--foreground) 3px 4px, transparent 4px 7px, var(--foreground) 7px 9px, transparent 9px 11px)',
        opacity: 0.55,
      }}
    />
  );
}

function IDBadge({ theme }: { theme: Theme }) {
  return (
    <div className="hud-panel relative mx-auto w-full max-w-sm">
      <CornerBrackets size={14} inset={-1} color="var(--accent)" />
      <div className="flex items-center justify-between border-b border-[var(--separator)] px-4 py-2">
        <span className="hud-label text-[var(--foreground)]/80">
          ID // OPERATOR
        </span>
      </div>

      <div className="flex gap-4 p-4">
        <div
          className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden border border-[var(--border)]"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
            background:
              'radial-gradient(125% 90% at 50% 32%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 72%), var(--background)',
          }}
        >
          <PixelPortrait
            src={profile.portrait}
            columns={44}
            aspect={3 / 4}
            mode="dots"
            theme={theme}
            className="absolute inset-0"
          />
          <span className="scanlines absolute inset-0 opacity-40" />
        </div>

        <dl className="flex min-w-0 flex-1 flex-col justify-center gap-2 font-mono text-[11px]">
          {[
            ['NAME', profile.name],
            ['ROLE', 'PRINCIPAL ENGINEER'],
            ['LOCATION', profile.location],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <dt className="hud-label text-[8px]">{k}</dt>
              <dd className="truncate uppercase tracking-[0.08em] text-[var(--foreground)]">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="px-4 pb-3">
        <Barcode />
        <div className="mt-1 flex justify-between">
          <span className="hud-label text-[8px]">SN/ 0xJDN-04F2</span>
        </div>
      </div>
    </div>
  );
}

export function Hero({ theme, reveal }: { theme: Theme; reveal: boolean }) {
  return (
    <section
      id="intro"
      className="relative flex min-h-[calc(100dvh-52px)] scroll-mt-20 flex-col justify-center py-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.9fr]">
        {/* identity */}
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="hud-label text-[var(--accent)]">
              ▚ PORTFOLIO
            </span>
            <span className="hidden h-px w-12 bg-[var(--separator)] sm:block" />
            <span className="hud-label">{profile.location}</span>
          </div>

          <HeroName reveal={reveal} />

          <div className="mt-5 flex items-center gap-3 text-base sm:text-4xl">
            <RoleCycler
              words={profile.roles}
              className="font-mono font-bold uppercase tracking-tighter text-[var(--accent)] text-glow"
            />
          </div>

          <div className="hud-panel mt-6 max-w-xl p-4 sm:p-5">
            <span className="hud-label mb-2 block text-[9px] text-[color:var(--accent)]/80">
              // INTRO
            </span>
            <p className="text-sm leading-relaxed text-[var(--foreground)]/85 sm:text-[15px]">
              {profile.intro}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                actionBase,
                'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] box-glow'
              )}
            >
              <TbFileText size={15} /> Resume
            </Link>
            <Link
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                actionBase,
                'border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              )}
            >
              <TbBrandGithub size={15} /> GitHub
            </Link>
            <Link
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                actionBase,
                'border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              )}
            >
              <TbBrandLinkedin size={15} /> LinkedIn
            </Link>
          </div>
        </div>

        {/* ID badge */}
        <IDBadge theme={theme} />
      </div>

      {/* scroll hint */}
      <div className="mt-12 flex items-center gap-2 self-center text-[var(--muted)]">
        <TbArrowDown size={14} className="animate-bounce" />
        <span className="hud-label text-[9px]">SCROLL TO VIEW RECORD</span>
      </div>
    </section>
  );
}
