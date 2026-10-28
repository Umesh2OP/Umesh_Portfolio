import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useIsCompactViewport } from '../../hooks/useIsCompactViewport';

interface SectionRevealProps {
  children: ReactNode;
}

export function SectionReveal({ children }: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isCompact = useIsCompactViewport();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0.2, 0.68, 1, 0.68, 0.2],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isCompact ? [48, 0, -28] : [88, 0, -56],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isCompact ? [0.98, 1, 0.99] : [0.95, 1, 0.97],
  );

  return (
    <motion.div
      ref={sectionRef}
      className="section-reveal"
      style={reduceMotion ? undefined : { opacity, y, scale }}
    >
      {children}
    </motion.div>
  );
}
