import { Button, Link, ScrollShadow } from '@heroui/react';
import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TbArrowUp, TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';
import { Hero } from './components/Hero';
import { IntroSequence } from './components/IntroSequence';
import { Radar } from './components/Radar';
import { Overlay } from './components/hud/Overlay';
import { StatusBar, type Section } from './components/hud/StatusBar';
import { SectionLabel } from './components/SectionLabel';
import { Timeline } from './components/Timeline';
import { education, experience, profile } from './data/resume';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Background } from './three/Background';
import { pointerSignal } from './three/scrollSignal';

const SECTIONS: Section[] = [
  { id: 'intro', label: 'INTRO', index: '01' },
  { id: 'experience', label: 'EXPERIENCE', index: '02' },
  { id: 'education', label: 'EDUCATION', index: '03' },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--separator)] pt-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="hud-label mt-2 flex items-center">
            © MMXXVI
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <TbBrandGithub size={17} />
          </Link>
          <Link
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <TbBrandLinkedin size={17} />
          </Link>
          <Button
            variant="outline"
            size="sm"
            onPress={() =>
              document
                .getElementById('top')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="font-mono text-[11px] uppercase tracking-[0.16em]"
          >
            <TbArrowUp size={14} /> Top
          </Button>
        </div>
      </div>
    </footer>
  );
}

type Theme = 'light' | 'dark';

export default function App() {
  const reducedMotion = useReducedMotion() ?? false;
  const [scroller, setScroller] = useState<HTMLElement | null>(null);
  const active = useScrollSpy(SECTION_IDS, scroller);
  const progress = useScrollProgress(scroller);

  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('light')
      ? 'light'
      : 'dark'
  );

  // Intro plays on every load (skipped only with reduced motion).
  const [introDone, setIntroDone] = useState<boolean>(reducedMotion);
  // Whether the main content should animate its "enter the grid" reveal.
  const animateReveal = useRef(!introDone).current;

  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  // Cursor parallax for the 3D scene.
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointerSignal.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerSignal.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      const de = document.documentElement;
      de.classList.remove('light', 'dark');
      de.classList.add(next);
      de.setAttribute('data-theme', next);
      de.style.colorScheme = next;
      const bg = next === 'light' ? '#f3efe6' : '#0a0908';
      de.style.setProperty('--boot-bg', bg);
      de.style.background = bg;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <>
      <Background reducedMotion={reducedMotion} theme={theme} />
      <Overlay />
      <StatusBar
        sections={SECTIONS}
        active={active}
        progress={progress}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {!introDone && (
        <IntroSequence theme={theme} onDone={handleIntroDone} />
      )}

      {/* The whole page scrolls inside a ScrollShadow for HUD edge-fades. */}
      <ScrollShadow
        ref={(el) => setScroller(el)}
        size={64}
        className="hud-scroll fixed inset-x-0 bottom-0 top-[52px] z-10 scroll-smooth"
      >
        <motion.main
          className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-10"
          initial={animateReveal ? { opacity: 0, scale: 1.04 } : false}
          animate={
            introDone
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 1.04 }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span id="top" />
          <Hero theme={theme} reveal={introDone} />

          <section className="mt-8">
            <SectionLabel
              id="experience"
              index="02"
              title="Experience"
            meta={`${String(experience.length).padStart(2, '0')} RECORDS`}
          />
          <Timeline entries={experience} scroller={scroller} />
        </section>

          <section className="mt-16">
            <SectionLabel
              id="education"
              index="03"
              title="Education"
            meta={`${String(education.length).padStart(2, '0')} RECORDS`}
          />
          <Timeline entries={education} scroller={scroller} />
        </section>

          <Footer />
        </motion.main>
      </ScrollShadow>

      <Radar
        sections={SECTIONS}
        active={active}
        progress={progress}
        onJump={(id) =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      />
    </>
  );
}
