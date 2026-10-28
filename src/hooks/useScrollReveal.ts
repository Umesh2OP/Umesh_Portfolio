/**
 * useScrollReveal — shared scroll-driven animation hooks
 */
import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/** Tracks whether an element is in the viewport */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();           // fire once
      }
    }, { threshold: 0.15, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/** Scroll progress [0..1] for a specific container ref */
export function useContainerScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref as React.RefObject<HTMLElement>, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return { ref, scrollYProgress, smooth };
}

/** Parallax: maps scroll progress to a y-offset */
export function useParallax(scrollYProgress: MotionValue<number>, range: [number, number] = [-40, 40]) {
  return useTransform(scrollYProgress, [0, 1], range);
}

/** Animated counter that counts up when in view */
export function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (!inView) return;
    const start   = performance.now();
    const tick    = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased   = 1 - Math.pow(1 - elapsed, 3);   // ease-out-cubic
      setCount(Math.round(eased * target));
      if (elapsed < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { ref, count };
}
