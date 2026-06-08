import { useEffect, useRef, useState } from 'react';

const GLYPHS = '█▓▒░/\\<>[]{}=+*#%0123456789ABCDEFXYZ';

type Props = {
  words: readonly string[];
  interval?: number;
  className?: string;
};

/**
 * Cycles through words with a terminal "decode/scramble" effect. Replaces the
 * old flubber letter-morph. Honors prefers-reduced-motion (plain swap).
 */
export function RoleCycler({ words, interval = 2800, className }: Props) {
  const [text, setText] = useState(words[0] ?? '');
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  useEffect(() => {
    if (words.length === 0) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let i = 0;
    let raf = 0;
    let timer = 0;

    const scrambleTo = (target: string) => {
      if (reduce) {
        setText(target);
        return;
      }
      const start = performance.now();
      const dur = 520;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const revealed = Math.floor(p * target.length);
        let out = target.slice(0, revealed);
        for (let k = revealed; k < target.length; k++) {
          out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setText(out);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setText(target);
      };
      raf = requestAnimationFrame(tick);
    };

    const cycle = () => {
      i = (i + 1) % words.length;
      scrambleTo(words[i]);
      timer = window.setTimeout(cycle, interval);
    };
    timer = window.setTimeout(cycle, interval);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [words, interval]);

  return (
    <span className={className} style={{ position: 'relative' }}>
      {/* reserve width for the longest word to avoid layout shift */}
      <span aria-hidden className="invisible">
        {longest}
      </span>
      <span className="absolute inset-0">{text}</span>
    </span>
  );
}
