import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { motion } from 'framer-motion';

export const ExperienceSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="experience" className="py-20 bg-cream relative select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow text-purple">Career Timeline</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2">
            Production Engineering Experience
          </h2>

          <p className="text-base text-ink-soft mt-3 leading-relaxed font-sans select-text font-medium">
            Real-world experience shipping production platforms, leading sub-teams, optimizing backend/frontend bundles, and integrating REST API infrastructures.
          </p>
        </motion.div>

        {/* Timeline Rows Table-Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col border-t border-line-strong"
        >
          {EXPERIENCE_DATA.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-line-strong items-baseline font-sans select-text"
            >
              
              {/* Date/Location Column */}
              <div className="md:col-span-3 text-sm font-bold tracking-wide text-ink-soft">
                <span>{exp.period}</span>
                {exp.location && (
                  <span className="block text-xs font-medium text-ink-soft/75 mt-1 select-none">
                    {exp.location}
                  </span>
                )}
              </div>

              {/* Role, Description and Stack Column */}
              <div className="md:col-span-9 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-ink flex flex-wrap items-baseline gap-1.5">
                    <span>{exp.role}</span>
                    <span className="text-orange text-sm font-semibold select-none">@ {exp.company}</span>
                  </h3>
                </div>

                {/* Highlights list */}
                <ul className="space-y-2 font-medium">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed"
                    >
                      <span className="text-orange font-bold shrink-0 mt-0.5 select-none">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="pt-2 flex flex-wrap gap-2 items-center select-none">
                  <span className="text-[9px] font-bold text-ink-soft uppercase tracking-wider mr-1">
                    [Tech stack]:
                  </span>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cream-dim/30 border border-line-strong text-ink-soft"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
