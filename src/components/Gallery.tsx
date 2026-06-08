import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollShadow } from '@heroui/react';
import { AnimatePresence, motion } from 'motion/react';
import { TbChevronLeft, TbChevronRight, TbX } from 'react-icons/tb';
import { CornerBrackets } from './hud/CornerBrackets';

type Props = {
  images: string[];
  label: string;
};

/**
 * Horizontal row of HUD-framed, duotone screenshot thumbnails. Click opens a
 * full-colour lightbox with keyboard navigation.
 */
export function Gallery({ images, label }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? i : (i + dir + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="hud-label text-[9px]">SURVEILLANCE //</span>
        <span className="hud-label text-[9px] text-[var(--accent)]">
          {String(images.length).padStart(2, '0')} FRAMES
        </span>
      </div>

      <ScrollShadow
        orientation="horizontal"
        size={44}
        className="hud-scroll flex gap-3 pb-2"
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            className="group relative aspect-video h-24 shrink-0 overflow-hidden border border-[var(--border)] bg-[color:var(--surface)]/60 transition-colors duration-200 hover:border-[color:var(--accent)]/60 sm:h-28"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
            aria-label={`${label} — frame ${i + 1}`}
          >
            <img
              src={src}
              alt={`${label} screenshot ${i + 1}`}
              loading="lazy"
              className="size-full object-cover"
            />
            <span className="absolute left-1.5 top-1.5 bg-[color:var(--background)]/70 px-1 py-0.5 hud-label text-[8px] text-[var(--accent)]">
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </ScrollShadow>

      {createPortal(
        <AnimatePresence>
          {open !== null && (
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
            style={{
              background:
                'color-mix(in oklab, var(--background) 86%, transparent)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="absolute left-5 top-5 flex items-center gap-3">
              <span className="hud-label text-[var(--accent)]">{label}</span>
              <span className="hud-label">
                {String((open ?? 0) + 1).padStart(2, '0')} /{' '}
                {String(images.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={close}
              className="pointer-events-auto absolute right-5 top-5 grid size-9 place-items-center border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Close"
            >
              <TbX size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="pointer-events-auto absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Previous"
            >
              <TbChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="pointer-events-auto absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Next"
            >
              <TbChevronRight size={20} />
            </button>

            <motion.div
              key={open}
              className="relative max-h-full max-w-4xl"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <CornerBrackets size={18} inset={-6} color="var(--accent)" />
              <img
                src={images[open]}
                alt={`${label} screenshot ${open + 1}`}
                className="max-h-[80vh] w-auto border border-[var(--border)] object-contain"
              />
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
