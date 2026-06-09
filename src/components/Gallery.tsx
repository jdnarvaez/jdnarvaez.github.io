import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollShadow } from '@heroui/react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { TbChevronLeft, TbChevronRight, TbX } from 'react-icons/tb';

type Props = {
  images: string[];
  label: string;
};

/**
 * HUD thumbnail row + lightbox. Opening shares a `layoutId` with the clicked
 * thumbnail (app-store style zoom-morph). Inside, all images live on one track
 * that translates by index, so prev/next slide left/right.
 */
export function Gallery({ images, label }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  const lid = (i: number) => `${uid}-frame-${i}`;

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
    <LayoutGroup>
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
            <motion.img
              layoutId={lid(i)}
              src={src}
              alt={`${label} screenshot ${i + 1}`}
              loading="lazy"
              className="size-full object-cover"
              style={{ opacity: open === null ? 1 : 0 }}
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
              key="lightbox"
              className="fixed inset-0 z-[70] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              style={{
                background:
                  'color-mix(in oklab, var(--background) 86%, transparent)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* sliding track — one image per viewport, translated by index */}
              <motion.div
                className="flex h-full w-full"
                initial={false}
                animate={{ x: `${open * -100}vw` }}
                transition={{ type: 'spring', stiffness: 320, damping: 36 }}
              >
                {images.map((src, i) => (
                  <div
                    key={src}
                    className="flex h-full w-full shrink-0 items-center justify-center p-4 sm:p-12"
                  >
                    <motion.img
                      layoutId={lid(i)}
                      src={src}
                      alt={`${label} screenshot ${i + 1}`}
                      onClick={(e) => e.stopPropagation()}
                      className="max-h-[82vh] max-w-[88vw] cursor-default border border-[var(--border)] object-contain"
                      transition={{
                        layout: { type: 'spring', stiffness: 240, damping: 30 },
                      }}
                    />
                  </div>
                ))}
              </motion.div>

              {/* HUD chrome */}
              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3">
                <span className="hud-label text-[var(--accent)]">{label}</span>
                <span className="hud-label">
                  {String(open + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={close}
                className="absolute right-5 top-5 grid size-9 place-items-center border border-[var(--border)] bg-[color:var(--background)]/40 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label="Close"
              >
                <TbX size={18} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-[var(--border)] bg-[color:var(--background)]/40 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label="Previous"
              >
                <TbChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-[var(--border)] bg-[color:var(--background)]/40 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label="Next"
              >
                <TbChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </LayoutGroup>
  );
}
