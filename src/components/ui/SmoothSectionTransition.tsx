import React from 'react';
import { motion } from 'framer-motion';

interface SmoothSectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  sectionNumber?: string;
  sectionTitle?: string;
}

export function SmoothSectionTransition({
  children,
  id,
  className = '',
  sectionNumber,
  sectionTitle,
}: SmoothSectionTransitionProps) {
  return (
    <div
      id={id}
      className="relative w-full my-4 select-none"
    >
      {/* Lightweight GPU-Accelerated Smooth Section Reveal */}
      <motion.section
        initial={{
          y: 28,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`relative transform-gpu ${className}`}
      >
        {/* Section Top Spine Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange/60 to-transparent z-30 pointer-events-none" />

        {/* Kinetic Manuscript Header */}
        {sectionNumber && sectionTitle && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-2 relative z-30">
            <div className="flex items-center justify-between">
              
              {/* Left Side: Page Badge & Title */}
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase">
                <span className="flex items-center gap-2 text-orange font-extrabold bg-orange/10 px-3 py-1 rounded-full border border-orange/20 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                  SECTION // {sectionNumber}
                </span>
                <span className="text-neutral-400 font-bold hidden sm:inline-block">/</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-extrabold tracking-wider">{sectionTitle}</span>
              </div>

              {/* Right Side: Section Badge */}
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest bg-neutral-900/5 dark:bg-white/5 px-3 py-1 rounded-lg border border-neutral-300/40 dark:border-white/10 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                <span>SPECIFICATION</span>
              </div>

            </div>

            {/* Expanding Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-4 h-[1.5px] bg-gradient-to-r from-orange/60 via-purple/30 to-transparent origin-left"
            />
          </div>
        )}

        {/* Main Section Content */}
        <div className="relative z-20">
          {children}
        </div>
      </motion.section>
    </div>
  );
}

export default SmoothSectionTransition;
