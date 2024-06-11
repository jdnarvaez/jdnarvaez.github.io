import { motion } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  id: string;
  onShow?: (id: string) => void;
};

export const ContentAnchor = ({
  id,
  children,
  onShow,
}: PropsWithChildren<Props>) => {
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
      className="flex w-full items-center justify-center"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div
        ref={ref}
        className="extra-bold-text"
        style={{
          fontSize: '10vmin',
          letterSpacing: '-.75vmin',
          color: 'var(--primary-text)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
