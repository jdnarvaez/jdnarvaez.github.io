import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { memo } from 'react';

const rows = new Array(150).fill(1);
const cols = new Array(100).fill(1);

const colors = ['#ff71d2', '#ff8f89', '#ceff00', '#00e8ff'];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const BackgroundBoxes = memo(
  ({ className, ...rest }: { className?: string }) => {
    return (
      <motion.div
        className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden z-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div
          style={{
            transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
          }}
          className={cn(
            'absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 z-0 bottom-0 right-0',
            className
          )}
          {...rest}
        >
          {rows.map((_, i) => (
            <motion.div
              key={`row ${i}`}
              className="w-16 h-8  border-l  border-slate-700 relative"
            >
              {cols.map((_, j) => (
                <motion.div
                  whileHover={{
                    backgroundColor: `${getRandomColor()}`,
                    transition: { duration: 0 },
                  }}
                  animate={{
                    transition: { duration: 2 },
                  }}
                  key={`col ${j}`}
                  className="w-16 h-8  border-r border-t border-slate-700 relative"
                >
                  {j % 2 === 0 && i % 2 === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  ) : null}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
        {/** Drop shadow for nav bar */}
        <div
          className="absolute top-0 bottom-0 right-0 left-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, var(--bg-primary) 0%, var(--bg-primary) 11%, rgba(0,0,0,0) 50%)',
          }}
        />
      </motion.div>
    );
  }
);
