import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { introSignal } from '../three/introSignal';
import { CornerBrackets } from './hud/CornerBrackets';

type Props = {
  theme: 'light' | 'dark';
  onDone: () => void;
};

const WORD = 'INITIALIZING';
const BOOT_LINES = ['MOUNTING SCENE', 'DECRYPTING RECORDS', 'ESTABLISHING UPLINK'];
const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Boot sequence: the "INITIALIZING" readout draws out with a progress bar and
 * status lines, then the panel zooms toward the viewer ("entering the grid")
 * while the 3D camera flies in. Skippable (click / key) and only mounted when
 * the intro should actually play (App gates on reduced-motion + once-per-session).
 */
export function IntroSequence({ theme, onDone }: Props) {
  const [phase, setPhase] = useState<'boot' | 'enter'>('boot');
  const [typed, setTyped] = useState('');
  const [progress, setProgress] = useState(0);
  const [linesShown, setLinesShown] = useState(0);
  const doneRef = useRef(false);
  const bg = theme === 'light' ? '#f3efe6' : '#0a0908';

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    introSignal.enter = 1;
    onDone();
  };

  useEffect(() => {
    introSignal.enter = 0; // hold camera far out while booting
    const timers: number[] = [];
    let raf = 0;

    let i = 0;
    const typeStep = () => {
      i += 1;
      setTyped(WORD.slice(0, i));
      if (i < WORD.length) timers.push(window.setTimeout(typeStep, 55));
    };
    timers.push(window.setTimeout(typeStep, 150));

    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const pr = Math.min(1, (now - start) / dur);
      setProgress(pr);
      setLinesShown(Math.min(BOOT_LINES.length, Math.floor(pr * (BOOT_LINES.length + 0.4))));
      if (pr < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    timers.push(window.setTimeout(() => setPhase('enter'), 1650));

    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'enter') return;
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const e = Math.min(1, (now - start) / dur);
      introSignal.enter = 1 - Math.pow(1 - e, 3); // easeOutCubic
      if (e < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t = window.setTimeout(finish, 680); // reveal the app partway through the fly-in
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const pct = Math.round(progress * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center"
      style={{ background: bg }}
      animate={{ opacity: phase === 'enter' ? 0 : 1 }}
      transition={{ duration: phase === 'enter' ? 0.6 : 0 }}
    >
      <motion.div
        className="relative w-[min(86vw,420px)] px-6 py-7"
        style={{ transformOrigin: 'center 42%' }}
        animate={
          phase === 'enter'
            ? { scale: 8, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.72, ease: [0.6, 0, 0.4, 1] }}
      >
        <CornerBrackets size={16} color="var(--accent)" />

        <div className="mb-4 flex items-center justify-between">
          <span className="hud-label text-[var(--accent)]">GRID OS // BOOT</span>
          <span className="hud-label tabular-nums">{pad2(pct)}%</span>
        </div>

        <div className="mb-5 flex items-baseline gap-1 font-mono text-2xl font-bold uppercase tracking-[0.1em] text-[var(--foreground)]">
          <span className="text-glow">{typed}</span>
          <span className="hud-blink text-[var(--accent)]">_</span>
        </div>

        <div className="relative mb-5 h-[3px] w-full bg-[var(--separator)]">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--accent)] box-glow"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex flex-col gap-1">
          {BOOT_LINES.map((line, i) => (
            <div
              key={line}
              className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ opacity: i < linesShown ? 1 : 0.15, transition: 'opacity .2s' }}
            >
              <span className="text-[var(--muted)]">{line}</span>
              <span className="text-[var(--accent)]">
                {i < linesShown ? 'OK' : '··'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
