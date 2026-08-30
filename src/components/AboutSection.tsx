import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Code2, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-cream border-t border-line-strong relative overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Technical Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="eyebrow text-purple">Engineering Perspective</span>

            <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2">
              Behind the UI, systems drive outcomes.
            </h2>

            <div className="space-y-4 text-base text-ink-soft leading-relaxed font-sans select-text font-medium">
              <p>
                My journey began with crafting intuitive frontend user interfaces using React and modern CSS. However, as I built more complex web applications, my focus naturally expanded to what happens behind the screen — API payload design, database query indexing, memory caching with Redis, and JWT authentication flows.
              </p>

              <p>
                I view software development as an integrated discipline. A responsive interface is only as effective as the latency of its endpoints, the reliability of its state management, and the scalability of its infrastructure.
              </p>

              <p className="text-ink font-semibold">
                Today, I focus on engineering full-stack software that solves tangible business and technical challenges — whether optimizing load times for thousands of users or building low-overhead rate limiting infrastructure.
              </p>
            </div>

            {/* Core Values / Focus Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-semibold select-none">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-xl bg-white border border-line-strong flex items-center gap-3 text-ink-soft hover:border-orange/30 transition-colors shadow-[0_4px_20px_rgba(28,26,34,0.01)]"
              >
                <ShieldCheck className="w-5 h-5 text-orange shrink-0" />
                <span>Low Latency & High Availability</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-xl bg-white border border-line-strong flex items-center gap-3 text-ink-soft hover:border-orange/30 transition-colors shadow-[0_4px_20px_rgba(28,26,34,0.01)]"
              >
                <Cpu className="w-5 h-5 text-green shrink-0" />
                <span>Clean Microservice Decoupling</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-xl bg-white border border-line-strong flex items-center gap-3 text-ink-soft hover:border-orange/30 transition-colors shadow-[0_4px_20px_rgba(28,26,34,0.01)]"
              >
                <Zap className="w-5 h-5 text-purple shrink-0" />
                <span>Performance & SEO Optimization</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Code & System Profile Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-line-strong bg-white p-6 lg:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-line text-xs font-semibold text-ink-soft select-none">
                <span className="text-purple font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-orange" />
                  system_profile.json
                </span>
                <span className="text-green font-bold uppercase text-[9px] tracking-wider bg-green-soft/40 px-2 py-0.5 rounded-full border border-green-soft/75">
                  Verified
                </span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs leading-relaxed select-text">
                <div className="text-ink-soft/75">// Engineer System Profile</div>
                <div className="text-purple font-bold">
                  const engineer = &#123;
                </div>
                <div className="pl-4 space-y-1 text-ink">
                  <div>name: <span className="text-green font-bold">"{PERSONAL_INFO.name}"</span>,</div>
                  <div>focus: <span className="text-green font-bold">"Full Stack & Systems"</span>,</div>
                  <div>primaryStack: [<span className="text-orange font-bold">"React"</span>, <span className="text-orange font-bold">"Next.js"</span>, <span className="text-orange font-bold">"Node.js"</span>, <span className="text-orange font-bold">"Redis"</span>],</div>
                  <div>mindset: <span className="text-green font-bold">"Architecture → Performance"</span>,</div>
                  <div>workMode: <span className="text-purple font-bold">"SDE Roles & Client Work"</span></div>
                </div>
                <div className="text-purple font-bold">&#125;;</div>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-ink-soft font-semibold select-none">
                <span>STATUS: ACTIVE & READY</span>
                <span className="text-orange font-bold">100% FACTUAL</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
