import { motion, MotionProps, MotionValue } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = Pick<MotionProps, 'style'> & {
  id: string;
  y?: number | MotionValue;
  x?: number;
  onShow?: (id: string) => void;
  children: ReactNode;
};

export const ContentAnchor = ({ id, children, y, x = 0, onShow, style }: Props) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      onShow?.(id);
    }
  }, [inView]);

  return (
    <motion.div
      id={id}
      style={Object.assign(
        { y, x, width: '100%', display: 'flex', justifyContent: 'center' },
        style
      )}
    >
      <div
        ref={ref}
        className="extra-bold-text"
        style={{ fontSize: '10vmin', letterSpacing: '-.75vmin', color: 'var(--primary-text)' }}
      >
        {children}
      </div>
    </motion.div>
  );
};
