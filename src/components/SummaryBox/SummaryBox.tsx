import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { FloatingBox, FloatingBoxProps } from '../FloatingBox';
import { Tags } from '../Tags';

import styles from './SummaryBox.module.scss';

const variants = {
  visible: { opacity: 1, scale: 1, y: 0 },
  hidden: {
    opacity: 0,
    scale: 0.65,
    y: 50,
  },
};

type Props = Omit<FloatingBoxProps, 'children'> & {
  title: string;
  years?: string;
  logo: string;
  highlights: string[];
  positions?: string[];
  organization?: string;
  tags?: string[];
};

export const SummaryBox = ({
  title,
  years,
  logo,
  highlights,
  positions,
  organization,
  tags,
  ...props
}: Props) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      style={{ width: '100%', marginBottom: '6vmin' }}
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <FloatingBox
        {...props}
        className={styles.summaryBox}
        style={{
          marginRight: '20%',
          paddingRight: '3vmin',
          paddingTop: '3vmin',
          paddingLeft: '3vmin',
          marginLeft: '20%',
          paddingBottom: '3vmin',
        }}
      >
        <motion.div className={styles.left}>
          <motion.div className={styles.logo} style={{ backgroundImage: `url(${logo})` }} />
        </motion.div>
        <motion.div className={styles.right}>
          <motion.div className={styles.header}>
            <motion.div className={styles.info}>
              <motion.div className={styles.caption}>
                <motion.div>{title}</motion.div>
                {years && <motion.div className={styles.years}>{years}</motion.div>}
                {positions && (
                  <motion.div className={styles.positions}>
                    {positions.map((position) => (
                      <div key={position} className={styles.position}>
                        {position}
                      </div>
                    ))}
                  </motion.div>
                )}
                {organization && (
                  <motion.div className={styles.organization}>{organization}</motion.div>
                )}
                <Tags tags={tags} />
              </motion.div>
              <motion.div className={styles.divider} />
            </motion.div>
          </motion.div>
          <motion.div className={styles.content}>
            <motion.div className={`${styles.highlights} light-text`}>
              {highlights.map((highlight, idx) => (
                <motion.div className={styles.highlight} key={`highlight-${idx}`}>
                  {highlight}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </FloatingBox>
    </motion.div>
  );
};
