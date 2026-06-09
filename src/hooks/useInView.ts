import { useEffect, useRef, useState } from 'react';

type Options = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

/**
 * IntersectionObserver hook. Returns a ref to attach and whether it's in view.
 * With `once`, it latches true on first intersection and disconnects.
 */
export function useInView<T extends HTMLElement>(options: Options = {}) {
  const { once = true, rootMargin = '0px', threshold = 0 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView] as const;
}
