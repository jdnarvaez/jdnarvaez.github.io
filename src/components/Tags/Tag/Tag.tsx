import { ReactNode } from 'react';

const colors = [
  '#CEFF00',
  '#1F91C7',
  '#527EC3',
  '#7A67B2',
  '#964E92',
  '#A23569',
];

const randomColor = () => {
  return colors[Math.round(Math.random() * (colors.length - 1))];
};

type Props = {
  children: ReactNode;
  background?: string;
  color?: string;
};

export const Tag = ({ children, background = randomColor(), color }: Props) => {
  return (
    <div
      className="flex items-center rounded-full px-3 font-bold uppercase text-[var(--bg-primary)] align-middle"
      style={{ background, color }}
    >
      {children}
    </div>
  );
};
