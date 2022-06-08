import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

export type FloatingBoxProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

export const FloatingBox = ({ children, style, ...props }: FloatingBoxProps) => {
  const styles = Object.assign(
    {
      color: 'var(--primary-text)',
      background: 'rgba(20, 25, 35, 0.25)',
      backdropFilter: 'blur(20px)',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '5px 5px 5px 5px rgba(5, 10, 15, .2)',
    },
    style
  );

  return (
    <motion.div style={styles} {...props}>
      {children}
    </motion.div>
  );
};
