import { Chip } from '@heroui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  background?: string;
  color?: string;
};

export const Tag = ({ children, background, color }: Props) => {
  return (
    <Chip
      className="flex items-center rounded-full px-3 uppercase text-[var(--bg-primary)] align-middle"
      style={{ background, color }}
      size="sm"
    >
      {children}
    </Chip>
  );
};
