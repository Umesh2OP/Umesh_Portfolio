import React, { useRef } from 'react';
import { METRICS_DATA } from '../data/portfolioData';
import { motion, useScroll, useTransform } from 'framer-motion';

const STACK_GROUPS = [
  { label: 'Frontend',     items: ['React 18', 'Next.js', 'TypeScript', 'Vite', 'Framer Motion'] },
  { label: 'Backend',      items: ['Node.js', 'Express', 'REST APIs', 'Redis', 'JWT Auth'] },
  { label: 'Data & Infra', items: ['MongoDB Atlas', 'MySQL', 'Vercel Edge', 'Hostinger'] },
  { label: 'CMS & Tools',  items: ['Headless WordPress', 'Appwrite', 'Git', 'Figma'] },
];

/* ── Staggered line reveal for a stat item ──────────────────── */
const StatItem: React.FC<{
  value: string;
  label: string;
  description: string;
  index: number;
}> = ({ value, label, description, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07,
      }}
      className="border-b border-r border-line p-6 lg:p-8 group hover:bg-bg-dim transition-colors duration-200 cursor-default"
    >
      {/* Value with overflow-hidden clip reveal */}
      <div className="overflow-hidden mb-2">
        <motion.div
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1 + index * 0.07,
          }}
          className="stat-value group-hover:text-accent transition-colors duration-300"
        >
          {value}
        </motion.div>
      </div>

      {/* Label */}
      <div className="overflow-hidden mb-1">
        <motion.p
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.18 + index * 0.07,
          }}
          className="text-sm font-medium text-ink"
        >
          {label}
        </motion.p>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.07 }}
        className="text-2xs text-ink-4 leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

/* ── Scrolling marquee of stack tags ─────────────────────────── */
const StackMarquee: React.FC = () => {
  const allItems = STACK_GROUPS.flatMap((g) => g.items.map((item) => ({ item, group: g.label })));
  const doubled  = [...allItems, ...allItems]; // seamless loop

  return (
    <div className="overflow-hidden border-t border-line py-5 select-none">
      <div className="animate-marquee">
        {doubled.map((entry, i) => (
          <span key={i} className="inline-flex items-center gap-2 mr-6 text-sm text-ink-3 shrink-0">
            <span className="w-1 h-1 rounded-full bg-accent-3 shrink-0" />
            {entry.item}
            <span className="text-ink-4 text-2xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const CredibilityPanel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax: section content lifts slightly as it scrolls into view */
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ['start end', 'start start'],
  });
  const introY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={sectionRef} className="bg-bg border-t border-line">

      {/* ── Section label ──────────────────────────────────── */}
      <motion.div
        style={{ y: introY }}
        className="container-editorial pt-20 md:pt-28 pb-12 md:pb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-label"
        >
          Performance &amp; impact
        </motion.p>
      </motion.div>

      {/* ── Metrics grid ─────────────────────────────────────── */}
      <div className="container-editorial">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line mb-0">
          {METRICS_DATA.map((metric, idx) => (
            <StatItem
              key={metric.id}
              value={metric.value}
              label={metric.label}
              description={metric.description}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* ── Scrolling marquee ────────────────────────────────── */}
      <StackMarquee />

      {/* ── Technical stack (below marquee) ─────────────────── */}
      <div className="container-editorial pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-label mb-8">Technical stack</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
            {STACK_GROUPS.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: gi * 0.06 }}
              >
                <p className="text-2xs font-medium text-ink-4 mb-3 uppercase tracking-wider">
                  {group.label}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item, ii) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                        delay: gi * 0.06 + ii * 0.04,
                      }}
                      className="text-sm text-ink-3 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-3 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default CredibilityPanel;
