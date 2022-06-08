import { ReactNode } from 'react';
import styles from './Tag.module.scss';

const colors = ['#CEFF00', '#1F91C7', '#527EC3', '#7A67B2', '#964E92', '#A23569'];

const color = () => {
  return colors[Math.round(Math.random() * (colors.length - 1))];
};

type Props = {
  children: ReactNode;
};

export const Tag = ({ children }: Props) => {
  return (
    <div className={styles.tag} style={{ background: color() }}>
      {children}
    </div>
  );
};
