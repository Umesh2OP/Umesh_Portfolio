import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-bg border-t border-line">
      <div className="container-editorial">

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">

          {/* ── Left: Header ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <p className="text-label mb-3">About</p>
            <h2 className="text-heading">Engineering mindset.</h2>

            <div className="mt-8 space-y-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ink-3 link-underline hover:text-ink transition-colors duration-150 w-fit"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ink-3 hover:text-ink transition-colors duration-150 w-fit link-underline"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-sm text-ink-3 hover:text-ink transition-colors duration-150 w-fit link-underline"
              >
                <span>{PERSONAL_INFO.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* ── Right: Bio ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="md:col-span-8"
          >
            <div className="space-y-5 text-body" style={{ fontSize: '1rem' }}>
              <p>
                My engineering journey began with crafting responsive frontend interfaces using React, TypeScript, and modern CSS architecture. As I built production web applications, my focus expanded beyond the UI to the system infrastructure beneath it — REST API design, Redis caching, JWT security, and database query optimization.
              </p>
              <p>
                A responsive interface is only as effective as the backend powering it. I care about the full stack: from the frame rate of a UI animation to the latency of the API call that feeds it.
              </p>
              <p className="text-ink font-medium">
                Today I build production-grade software solving real business problems — whether reducing cold-start load times by 96% for thousands of users or architecting low-overhead rate-limiting microservices for live APIs.
              </p>
            </div>

            {/* ── Evolution timeline ─────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-line">
              {[
                { num: '01', phase: 'Origin',       focus: 'UI craft & React' },
                { num: '02', phase: 'Expansion',    focus: 'MERN & REST APIs' },
                { num: '03', phase: 'Optimization', focus: 'Latency & caching' },
                { num: '04', phase: 'Current',      focus: 'End-to-end systems', active: true },
              ].map((step) => (
                <div
                  key={step.num}
                  className={`space-y-1 ${step.active ? 'text-ink' : 'text-ink-3'}`}
                >
                  <p className="mono text-2xs text-ink-4">{step.num}</p>
                  <p className="text-sm font-medium">{step.phase}</p>
                  <p className="text-2xs text-ink-4">{step.focus}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
