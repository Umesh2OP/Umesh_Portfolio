import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PILLARS = [
  {
    title:       'White-Label Execution',
    description: "We build client web apps and websites under your agency's brand with strict confidentiality, clean Git repos, and seamless handoffs.",
    tag:         'Confidential delivery',
  },
  {
    title:       'Figma-to-Code Precision',
    description: '100% pixel-perfect conversion of Figma designs into responsive Next.js, React, and Tailwind CSS code with smooth micro-animations.',
    tag:         'Pixel-perfect builds',
  },
  {
    title:       'Overflow Capacity',
    description: 'Hit tight client launch deadlines without taking on full-time engineering payroll or managing contractor overhead.',
    tag:         'Rapid turnaround',
  },
  {
    title:       'Headless CMS & Speed',
    description: 'Headless WordPress, custom REST APIs, and Core Web Vitals optimization delivering sub-second load times and top SEO scores.',
    tag:         'Core Web Vitals',
  },
];

export const AgencyPartnershipSection: React.FC = () => {
  return (
    <section id="agencies" className="py-20 md:py-28 bg-bg-dim border-t border-line">
      <div className="container-editorial">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16"
        >
          <div>
            <p className="text-label mb-3">Agency partner</p>
            <h2 className="text-heading max-w-md">
              Reliable technical partnership for digital agencies.
            </h2>
          </div>

          <a href="#contact" className="btn-primary shrink-0 self-start md:self-auto">
            Partner with me
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* ── Pillars grid ───────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-px bg-line border border-line overflow-hidden rounded-xl">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
              className="bg-bg p-7 md:p-8 hover:bg-bg-dim transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-semibold text-ink tracking-tight">{pillar.title}</h3>
                <span className="text-2xs text-ink-4 font-medium mt-0.5 ml-4 shrink-0">{pillar.tag}</span>
              </div>
              <p className="text-body text-sm">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA banner ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-8 p-7 md:p-8 rounded-xl bg-ink text-bg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="text-2xs text-bg/50 uppercase tracking-widest mb-2">Agency overflow &amp; retainer contracts</p>
            <h3 className="text-lg font-semibold leading-snug">
              Have an upcoming client project or tight deadline?
            </h3>
            <p className="text-sm text-bg/60 mt-1.5 max-w-md">
              I integrate directly into your Slack, Notion, or Figma workflows to ship frontends and backends seamlessly.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg text-ink text-sm font-medium hover:bg-accent-3 transition-colors duration-200"
          >
            Schedule intro call
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default AgencyPartnershipSection;
