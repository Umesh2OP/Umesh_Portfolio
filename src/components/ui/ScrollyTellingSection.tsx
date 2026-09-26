import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollyTellingSectionProps {
  children: React.ReactNode;
  chapterNumber?: string;
  chapterTitle?: string;
  className?: string;
}

export function ScrollyTellingSection({
  children,
  chapterNumber,
  chapterTitle,
  className = '',
}: ScrollyTellingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax 3D scale and opacity driven strictly by scroll position
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [12, 0, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [50, 0, 0, -30]);

  return (
    <div ref={containerRef} className={`relative py-10 ${className}`}>
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          y,
          transformStyle: 'preserve-3d',
          perspective: '1500px',
        }}
        className="transform-gpu transition-all duration-75"
      >
        {/* Scrollytelling Narrative Chapter Ribbon */}
        {chapterNumber && chapterTitle && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-4">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 uppercase select-none">
              <span className="flex items-center gap-2 text-orange font-extrabold bg-orange/10 px-3 py-1 rounded-full border border-orange/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
                SCROLL NARRATIVE // {chapterNumber}
              </span>
              <span className="text-neutral-500 font-bold hidden sm:inline-block">/</span>
              <span className="text-neutral-700 dark:text-neutral-200 font-extrabold">{chapterTitle}</span>
            </div>
          </div>
        )}

        {children}
      </motion.div>
    </div>
  );
}

export default ScrollyTellingSection;
