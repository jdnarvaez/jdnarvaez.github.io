import type { ReactNode } from 'react';
import { Chip } from '@heroui/react';
import { cn } from '../utils/cn';

type Props = {
  children: ReactNode;
  accent?: boolean;
};

/** HUD-styled HeroUI Chip used for the tech tag clouds. */
export function Tag({ children, accent = false }: Props) {
  return (
    <Chip
      size="sm"
      variant="soft"
      color={accent ? 'accent' : 'default'}
      className={cn(
        'border font-mono text-[10px] uppercase tracking-[0.12em]',
        accent
          ? 'border-[color:var(--accent)]/40 text-[var(--accent)]'
          : 'border-[var(--border)] text-[var(--foreground)]/70'
      )}
    >
      {children}
    </Chip>
  );
}
