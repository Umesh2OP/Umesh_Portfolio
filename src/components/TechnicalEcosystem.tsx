import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: string;
  projects: string[];
}

interface TechCategory {
  id: string;
  name: string;
  skills: Skill[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    skills: [
      { name: 'React 18',      level: 'Core',        projects: ['quotaguard', 'flavorcatalystz', 'gavenue', 'toletglobe', 'luxuryjewels'] },
      { name: 'TypeScript',    level: 'Advanced',    projects: ['quotaguard', 'gavenue', 'toletglobe', 'luxuryjewels'] },
      { name: 'Next.js',       level: 'Full-Stack',  projects: ['gavenue'] },
      { name: 'Tailwind CSS',  level: 'Expert',      projects: ['quotaguard', 'flavorcatalystz', 'gavenue', 'toletglobe', 'luxuryjewels'] },
      { name: 'Framer Motion', level: 'Interactive', projects: ['flavorcatalystz', 'gavenue', 'luxuryjewels'] },
      { name: 'Vite',          level: 'Bundler',     projects: ['gavenue', 'luxuryjewels'] },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    skills: [
      { name: 'Node.js',         level: 'Core',          projects: ['quotaguard', 'toletglobe'] },
      { name: 'Express',         level: 'API Framework',  projects: ['quotaguard', 'toletglobe'] },
      { name: 'REST API Design', level: 'Architecture',   projects: ['quotaguard', 'flavorcatalystz', 'toletglobe'] },
      { name: 'JWT Security',    level: 'Middleware',     projects: ['quotaguard', 'toletglobe'] },
      { name: 'Axios',           level: 'Integration',    projects: ['quotaguard'] },
    ],
  },
  {
    id: 'data',
    name: 'Data & Infrastructure',
    skills: [
      { name: 'Redis',         level: 'In-Memory Cache', projects: ['quotaguard'] },
      { name: 'MongoDB',       level: 'NoSQL Store',     projects: ['quotaguard', 'toletglobe'] },
      { name: 'MySQL',         level: 'Relational DB',   projects: ['realestate-opt'] },
      { name: 'Redux Toolkit', level: 'Client State',    projects: ['flavorcatalystz'] },
    ],
  },
  {
    id: 'performance',
    name: 'Performance & Infra',
    skills: [
      { name: 'Core Web Vitals',    level: 'LCP 1.1s',       projects: ['realestate-opt', 'gavenue'] },
      { name: 'Cache Warmup',       level: '30-Day TTL',      projects: ['realestate-opt'] },
      { name: 'Deferred JS',        level: 'TBT −98%',        projects: ['realestate-opt'] },
      { name: 'WordPress Tuning',   level: 'Server Config',   projects: ['realestate-opt'] },
      { name: 'Vercel Edge CDN',    level: 'Global Deploy',   projects: ['gavenue', 'luxuryjewels'] },
      { name: 'Headless WordPress', level: 'CMS API',         projects: ['flavorcatalystz'] },
    ],
  },
];

export function TechnicalEcosystem() {
  const [selectedSkill, setSelectedSkill] = useState<string>('React 18');

  const activeCategory = TECH_CATEGORIES.find((cat) =>
    cat.skills.some((s) => s.name === selectedSkill)
  ) ?? TECH_CATEGORIES[0];

  const activeSkillObj =
    activeCategory.skills.find((s) => s.name === selectedSkill) ?? activeCategory.skills[0];

  const relatedProjects = PROJECTS_DATA.filter((p) =>
    activeSkillObj.projects.includes(p.id)
  );

  return (
    <section id="capabilities" className="py-20 md:py-28 bg-bg-dim border-t border-line">
      <div className="container-editorial">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-label mb-3">Technical ecosystem</p>
          <h2 className="text-heading">Skills mapped to production systems.</h2>
          <p className="text-body mt-4 max-w-lg">
            Select any technology to see which production projects it powers — no generic progress bars.
          </p>
        </motion.div>

        {/* ── Two-column layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Category + skill grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="lg:col-span-7 space-y-6"
          >
            {TECH_CATEGORIES.map((category) => (
              <div key={category.id}>
                <p className="text-2xs text-ink-4 uppercase tracking-wider mb-3">{category.name}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill.name)}
                        className={`px-3 py-1.5 rounded-lg border text-sm transition-all duration-150 ${
                          isSelected
                            ? 'bg-ink text-bg border-ink'
                            : 'bg-bg border-line text-ink-3 hover:border-ink-4 hover:text-ink hover:bg-bg-card'
                        }`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Project inspector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-line bg-bg-card p-6 sticky top-20">
              <div className="pb-4 border-b border-line mb-5">
                <p className="text-2xs text-ink-4 uppercase tracking-wider mb-1">
                  {activeCategory.name} · {activeSkillObj.level}
                </p>
                <h3 className="text-base font-semibold text-ink">{selectedSkill}</h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  <p className="text-2xs text-ink-4 uppercase tracking-wider">
                    Production projects
                  </p>

                  {relatedProjects.length > 0 ? (
                    relatedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-lg border border-line bg-bg-dim hover:border-line-2 transition-colors duration-150"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-medium text-ink">{p.title}</p>
                          {p.metricsResult && (
                            <span className="text-2xs text-accent font-mono shrink-0">
                              {p.metricsResult.split(' ').slice(0, 3).join(' ')}
                            </span>
                          )}
                        </div>
                        <p className="text-2xs text-ink-4 leading-relaxed line-clamp-2">
                          {p.subtitle}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-ink-4 italic">
                      Applied across core architecture and workflows.
                    </p>
                  )}

                  <a
                    href="#work"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:text-ink-2 transition-colors duration-150 mt-2"
                  >
                    View case studies →
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default TechnicalEcosystem;
