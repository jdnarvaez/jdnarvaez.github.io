import { useState, useRef, Suspense, useEffect } from 'react';

import {
  motion,
  AnimateSharedLayout,
  useViewportScroll,
  AnimatePresence,
  useTransform,
  useMotionValue,
} from 'framer-motion';

import { useSpring } from '@react-spring/core';
import { Canvas, useLoader, useFrame, extend, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import { SpringyBoxes } from '../SpringyBoxes';

export const BackgroundAnimation = ({ activeNavItem }: { activeNavItem: string }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'fixed',
          top: '0px',
          left: '115px',
          right: '0px',
          bottom: '0px',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: activeNavItem === 'intro' ? 0.3 : 0.75,
        }}
      >
        <Canvas orthographic camera={{ zoom: 10, position: [0, 150, 150] }}>
          <Suspense fallback={<Html center className="loading" children="Loading..." />}>
            <SpringyBoxes transparent opacity={0.25} />
          </Suspense>
        </Canvas>
      </motion.div>
    </AnimatePresence>
  );
};
