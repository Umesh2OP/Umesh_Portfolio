import React, { useRef, useState } from 'react';
import { PHILOSOPHY_STAGES } from '../data/portfolioData';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export const PhilosophySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

  // useMotionValueEvent is the correct API (fixes the .on() bug)
  useMotionValueEvent(smooth, 'change', (v) => {
    const idx = Math.min(
      PHILOSOPHY_STAGES.length - 1,
      Math.max(0, Math.round(v * (PHILOSOPHY_STAGES.length - 0.01)))
    );
    setActiveStage(idx);
  });

  const progressW = useTransform(smooth, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={containerRef}
      id="philosophy"
      style={{ height: `${PHILOSOPHY_STAGES.length * 100}vh`, position: 'relative' }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-2)' }}>
        {/* Progress bar */}
        <div className="relative shrink-0" style={{ height: '2px', background: 'var(--border)' }}>
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ width: progressW, background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
          />
        </div>

        <div className="container-editorial flex-1 flex flex-col justify-center py-12">

          {/* Label */}
          <p className="text-label mb-8">Methodology — scroll to advance</p>

          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">

            {/* Stage list */}
            <div className="md:col-span-4 space-y-1">
              {PHILOSOPHY_STAGES.map((stage, idx) => (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className="w-full text-left px-4 py-3.5 rounded-lg flex items-center gap-4 transition-all duration-300"
                  style={{
                    background: activeStage === idx ? 'var(--bg-3)' : 'transparent',
                    border: `1px solid ${activeStage === idx ? 'var(--accent)' : 'var(--border)'}`,
                  }}
                >
                  <span className="mono text-2xs shrink-0" style={{ color: activeStage === idx ? 'var(--accent)' : 'var(--text-4)' }}>
                    {stage.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: activeStage === idx ? 'var(--text-1)' : 'var(--text-3)' }}>
                      {stage.title}
                    </p>
                    <p className="text-2xs mt-0.5" style={{ color: 'var(--text-4)' }}>{stage.sub}</p>
                  </div>
                  {activeStage === idx && (
                    <motion.span
                      layoutId="stage-dot"
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}

              <AnimatePresence>
                {activeStage === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-2xs mt-4 px-4 flex items-center gap-2"
                    style={{ color: 'var(--text-4)' }}
                  >
                    <span>↓</span> Scroll to advance
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Active content */}
            <div className="md:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Big step number watermark */}
                  <div className="flex items-start gap-4 mb-6">
                    <span className="font-bold leading-none select-none" style={{ fontSize: '5rem', color: 'rgba(56,189,248,0.08)', fontFamily: 'var(--font-mono)' }}>
                      {PHILOSOPHY_STAGES[activeStage].step}
                    </span>
                    <div className="pt-2">
                      <h2 className="text-heading">{PHILOSOPHY_STAGES[activeStage].title}</h2>
                      <p className="mono text-2xs mt-1" style={{ color: 'var(--accent)' }}>
                        {PHILOSOPHY_STAGES[activeStage].sub}
                      </p>
                    </div>
                  </div>

                  <p className="text-body mb-7">{PHILOSOPHY_STAGES[activeStage].desc}</p>

                  {/* Code block */}
                  <div className="code-block">
                    <div className="code-block-header">
                      <span className="code-dot" style={{ background: '#ff5f57' }} />
                      <span className="code-dot" style={{ background: '#febc2e' }} />
                      <span className="code-dot" style={{ background: '#28c840' }} />
                      <span className="ml-3 mono text-2xs" style={{ color: 'var(--text-4)' }}>
                        stage_{PHILOSOPHY_STAGES[activeStage].step}.ts
                      </span>
                      {/* Stage dots */}
                      <div className="ml-auto flex items-center gap-1.5">
                        {PHILOSOPHY_STAGES.map((_, i) => (
                          <span
                            key={i}
                            className="h-1 rounded-full transition-all duration-300"
                            style={{
                              width: i === activeStage ? '12px' : '4px',
                              background: i === activeStage ? 'var(--accent)' : 'var(--border-2)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <motion.pre
                      key={`code-${activeStage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="px-5 py-5 text-sm mono overflow-x-auto leading-relaxed"
                      style={{ color: '#7dd3fc' }}
                    >
                      <code>{PHILOSOPHY_STAGES[activeStage].codeSnippet}</code>
                    </motion.pre>
                  </div>

                  {/* Step indicator */}
                  <div className="mt-5 flex items-center gap-2">
                    {PHILOSOPHY_STAGES.map((_, i) => (
                      <span
                        key={i}
                        className="h-0.5 rounded-full transition-all duration-500"
                        style={{
                          width: i === activeStage ? '24px' : '8px',
                          background: i === activeStage ? 'var(--accent)' : 'var(--border-2)',
                        }}
                      />
                    ))}
                    <span className="ml-2 mono text-2xs" style={{ color: 'var(--text-4)' }}>
                      {activeStage + 1} / {PHILOSOPHY_STAGES.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
