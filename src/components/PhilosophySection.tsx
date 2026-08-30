import React, { useState } from 'react';
import { PHILOSOPHY_STAGES } from '../data/portfolioData';
import { Terminal, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhilosophySection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
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
    <section id="philosophy" className="py-20 bg-cream relative overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-14"
        >
          <span className="eyebrow text-purple">Methodology & Strategy</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2">
            Engineering beyond the interface.
          </h2>
          <p className="text-base text-ink-soft mt-3 leading-relaxed font-sans select-text font-medium">
            Building scalable software requires looking beyond visual components to the underlying architecture, network flows, state synchronization, and low-latency database queries.
          </p>
        </motion.div>

        {/* 4-Stage Interactive Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stage Selector Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-3"
          >
            {PHILOSOPHY_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <motion.button
                  key={stage.step}
                  variants={itemVariants}
                  onClick={() => setActiveStage(idx)}
                  className="relative w-full text-left p-4 rounded-2xl border border-line-strong transition-all duration-300 overflow-hidden shadow-sm"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePhilosophyOutline"
                      className="absolute inset-0 bg-white border border-orange rounded-2xl shadow-[0_8px_30px_rgba(156,122,46,0.06)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-between select-none">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isActive
                            ? 'bg-orange-soft/40 text-orange border-orange-soft/75'
                            : 'bg-cream-dim/30 text-ink-soft border-line-strong'
                        }`}
                      >
                        PHASE {stage.step}
                      </span>
                      <h3
                        className={`font-bold font-sans text-sm ${
                          isActive ? 'text-ink' : 'text-ink-soft'
                        }`}
                      >
                        {stage.title}
                      </h3>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-orange translate-x-1' : 'text-ink-soft'
                      }`}
                    />
                  </div>

                  <p className="relative z-10 text-xs text-ink-soft mt-2 font-sans font-medium select-none">
                    {stage.sub}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right Column: Active Stage Inspector Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line-strong bg-white overflow-hidden shadow-lg">
              
              {/* Terminal Header */}
              <div className="h-10 bg-cream-dim/30 border-b border-line px-4 flex items-center justify-between font-sans text-xs text-ink-soft">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green inline-block"></span>
                  </div>
                  <span className="ml-2 text-purple font-semibold text-[11px]">
                    pipeline_stage_{PHILOSOPHY_STAGES[activeStage].step.toLowerCase()}.ts
                  </span>
                </div>
                <span className="text-[10px] text-green font-bold">
                  STATUS: COMPILATION OK
                </span>
              </div>

              {/* Terminal Content Body */}
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="p-6 space-y-6 select-text"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-orange select-none">
                          {PHILOSOPHY_STAGES[activeStage].step}
                        </span>
                        <h3 className="text-lg font-bold text-ink">
                          {PHILOSOPHY_STAGES[activeStage].title} — {PHILOSOPHY_STAGES[activeStage].sub}
                        </h3>
                      </div>

                      <p className="text-sm text-ink-soft mt-3 leading-relaxed font-sans font-medium">
                        {PHILOSOPHY_STAGES[activeStage].desc}
                      </p>
                    </div>

                    {/* Code & Architectural Preview Box */}
                    <div className="rounded-xl bg-ink border border-line-strong p-4 font-mono text-xs overflow-x-auto select-all">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-line-strong text-[10px] text-ink-soft font-bold tracking-wider select-none">
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3.5 h-3.5 text-orange" />
                          EXEMPLARY CODE CONCEPT
                        </span>
                        <span className="text-orange-soft">TypeScript</span>
                      </div>
                      <pre className="text-orange-soft leading-relaxed whitespace-pre-wrap">
                        <code>{PHILOSOPHY_STAGES[activeStage].codeSnippet}</code>
                      </pre>
                    </div>

                    {/* Stage Deliverables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 select-none">
                      <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft bg-cream-dim/10 p-2.5 rounded-xl border border-line-strong">
                        <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
                        <span>Clear Data Flow Architecture</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft bg-cream-dim/10 p-2.5 rounded-xl border border-line-strong">
                        <CheckCircle2 className="w-4 h-4 text-green shrink-0" />
                        <span>Low Overheads & Scalability SLA</span>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
