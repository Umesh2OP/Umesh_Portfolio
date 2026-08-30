import React from 'react';
import { HeroSystemDashboard } from './HeroSystemDashboard';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cream select-none border-b border-line-strong">
      {/* Background blobs for organic, retro-premium look */}
      <div className="absolute top-[-10%] right-[-10%] w-[420px] h-[420px] bg-orange-soft/30 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[320px] h-[320px] bg-purple-soft/20 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 flex flex-col justify-center"
          >
            
            {/* Eyebrow & Status Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] tracking-[0.15em] font-extrabold uppercase text-purple">
                SOFTWARE ENGINEER · FULL-STACK DEVELOPER
              </span>
              <span className="text-[8px] tracking-[0.1em] font-extrabold uppercase px-2.5 py-0.5 rounded bg-green-soft/50 text-green border border-green-soft/75 inline-flex items-center gap-1.5 shrink-0 select-none">
                <span className="w-1 h-1 rounded-full bg-green animate-pulse"></span>
                <span>AVAILABLE FOR PROJECTS</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight leading-[1.05] font-sans"
            >
              I build software<br />
              that works <span className="accent">beyond the interface.</span>
            </motion.h1>

            {/* Category Chips / Metadata */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-0.5">
              <span className="px-3 py-1 text-[9px] font-extrabold tracking-wider uppercase rounded-full bg-cream-dim/35 text-ink-soft border border-line-strong">
                PRODUCT ENGINEERING
              </span>
              <span className="px-3 py-1 text-[9px] font-extrabold tracking-wider uppercase rounded-full bg-cream-dim/35 text-ink-soft border border-line-strong">
                FULL-STACK SYSTEMS
              </span>
              <span className="px-3 py-1 text-[9px] font-extrabold tracking-wider uppercase rounded-full bg-cream-dim/35 text-ink-soft border border-line-strong">
                BUSINESS AUTOMATION
              </span>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p variants={itemVariants} className="text-base text-ink-soft leading-relaxed max-w-xl font-sans select-text font-medium">
              I build production-ready web applications, APIs, and business systems — from customer-facing products to internal platforms and automation. Designed with modular architecture, reliable integrations, search engine optimization (SEO), and blazing-fast performance in mind.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-1">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white bg-orange hover:bg-orange/95 rounded-full transition-transform shadow-md shadow-orange/20 group"
              >
                <span>View Selected Work</span>
                <span className="text-[14px] font-light transform group-hover:translate-x-0.5 transition-transform">→</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-ink bg-white border border-line-strong hover:bg-cream-dim/30 rounded-full transition-transform"
              >
                <span>Start a Project</span>
                <span className="text-orange text-xs">✦</span>
              </motion.a>
            </motion.div>

            {/* Mobile-only System Visualization placement */}
            <motion.div
              variants={itemVariants}
              className="block lg:hidden w-full my-4"
            >
              <HeroSystemDashboard isMobile={true} />
            </motion.div>

            {/* Core Stack Metadata Row */}
            <motion.div
              variants={itemVariants}
              className="pt-5 border-t border-line/75 flex flex-col sm:flex-row sm:items-center gap-2 select-text font-sans"
            >
              <span className="text-[9px] font-extrabold text-ink-soft/75 uppercase tracking-widest block sm:w-24 shrink-0">
                CORE STACK
              </span>
              <span className="text-xs font-bold font-mono text-ink-soft leading-none">
                React · Next.js · Node.js · PostgreSQL · Redis
              </span>
            </motion.div>

            {/* Availability Status Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-line/40 flex items-center gap-2.5 text-[9px] text-ink-soft font-mono select-text"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green"></span>
              </span>
              <span className="font-bold text-green uppercase tracking-wider">OPEN FOR PROJECTS</span>
              <span className="text-ink-soft/30">|</span>
              <span className="uppercase tracking-wider font-bold">IST (UTC+5:30) · GLOBAL CLIENTS · ~24H RESPONSE</span>
            </motion.div>

          </motion.div>

          {/* Right Column — Desktop-only 3D System Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.55 }}
            className="hidden lg:block lg:col-span-5"
          >
            <HeroSystemDashboard isMobile={false} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
