import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { CornerBrackets } from './CornerBrackets';

type Props = {
  label?: string;
  code?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  brackets?: boolean;
  bracketColor?: string;
};

/**
 * Translucent "data panel" — the workhorse container for HUD content. Glassy
 * blurred surface, hairline border, optional header strip (mono label + code),
 * and accent corner brackets.
 */
export function HudPanel({
  label,
  code,
  children,
  className,
  bodyClassName,
  brackets = true,
  bracketColor = 'color-mix(in oklab, var(--accent) 70%, transparent)',
}: Props) {
  const hasHeader = Boolean(label || code);
  return (
    <div className={cn('hud-panel relative', className)}>
      {brackets && <CornerBrackets size={12} inset={-1} color={bracketColor} />}
      {hasHeader && (
        <div className="flex items-center justify-between gap-4 border-b border-[var(--separator)] px-4 py-2">
          {label && (
            <span className="hud-label text-[color:var(--foreground)]/80">
              {label}
            </span>
          )}
          {code && (
            <span className="hud-label text-[color:var(--accent)]">{code}</span>
          )}
        </div>
      )}
      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </div>
  );
}
