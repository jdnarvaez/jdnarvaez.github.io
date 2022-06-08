import { useEffect, useRef } from 'react';

type Params = {
  callback: (fps: number) => void;
  requestedFPS?: number;
  delay?: number;
};

export const useAnimationFrame = ({ callback, requestedFPS = 60, delay = 0 }: Params) => {
  const requestRef = useRef(0);
  const frameCount = useRef(0);
  const fps = useRef(0);
  const fpsInterval = useRef(0);
  const startTime = useRef(0);
  const now = useRef(0);
  const then = useRef(0);
  const elapsed = useRef(0);

  const start = (frameRate: number) => {
    fps.current = frameRate;
    fpsInterval.current = 1000 / fps.current;
    then.current = Date.now();
    startTime.current = then.current;
    requestRef.current = requestAnimationFrame(animate);
  };

  const animate = () => {
    requestRef.current = requestAnimationFrame(animate);
    now.current = Date.now();
    elapsed.current = now.current - then.current;

    if (elapsed.current > fpsInterval.current) {
      then.current = now.current - (elapsed.current % fpsInterval.current);
      const sinceStart = now.current - startTime.current;
      frameCount.current += 1;
      const currentFps = Math.round((1000 / (sinceStart / frameCount.current)) * 100) / 100;
      callback(currentFps);
    }
  };

  useEffect(() => {
    setTimeout(() => start(requestedFPS), delay);
    return () => cancelAnimationFrame(requestRef.current);
  }, [requestedFPS]);
};
