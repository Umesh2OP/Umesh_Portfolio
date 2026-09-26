import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Zap, Cpu, ExternalLink, ArrowRight } from 'lucide-react';

interface TechCategory {
  id: string;
  name: string;
  icon: typeof Code2;
  description: string;
  skills: {
    name: string;
    level: string;
    projects: string[]; // project IDs
  }[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    icon: Code2,
    description: 'Component architecture, responsive layouts, Core Web Vitals optimization, and 60 FPS UI transitions.',
    skills: [
      { name: 'React 18', level: 'Core', projects: ['quotaguard', 'blogverse', 'gavenue', 'slotswapper', 'luxuryjewels'] },
      { name: 'TypeScript', level: 'Advanced', projects: ['quotaguard', 'gavenue', 'slotswapper', 'luxuryjewels'] },
      { name: 'Next.js', level: 'Full-Stack', projects: ['gavenue'] },
      { name: 'Tailwind CSS', level: 'Expert', projects: ['quotaguard', 'blogverse', 'gavenue', 'slotswapper', 'luxuryjewels'] },
      { name: 'Framer Motion', level: 'Interactive', projects: ['blogverse', 'gavenue', 'luxuryjewels'] },
      { name: 'Vite', level: 'Bundler', projects: ['gavenue', 'luxuryjewels'] },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Systems',
    icon: Server,
    description: 'RESTful API contracts, asynchronous workers, sliding-window rate control, and JWT auth middleware.',
    skills: [
      { name: 'Node.js', level: 'Core', projects: ['quotaguard', 'slotswapper'] },
      { name: 'Express', level: 'API Framework', projects: ['quotaguard', 'slotswapper'] },
      { name: 'FastAPI (Python)', level: 'Async AI Worker', projects: ['blogverse'] },
      { name: 'REST API Design', level: 'Architecture', projects: ['quotaguard', 'blogverse', 'slotswapper'] },
      { name: 'JWT Security', level: 'Middleware', projects: ['quotaguard', 'slotswapper'] },
      { name: 'Axios Interceptors', level: 'Integration', projects: ['quotaguard'] },
    ],
  },
  {
    id: 'database',
    name: 'Data & Persistence',
    icon: Database,
    description: 'In-memory caching algorithms, document stores, compound indexing, and server-side persistence.',
    skills: [
      { name: 'Redis', level: 'In-Memory Cache', projects: ['quotaguard'] },
      { name: 'MongoDB Atlas', level: 'NoSQL Store', projects: ['quotaguard', 'slotswapper'] },
      { name: 'MySQL', level: 'Relational DB', projects: ['realestate-opt'] },
      { name: 'Redux Toolkit', level: 'Client State Memo', projects: ['blogverse'] },
    ],
  },
  {
    id: 'performance',
    name: 'Performance & Infra',
    icon: Zap,
    description: 'Slashing cold-start latency, cache warmup strategy, deferred JS loading, and 98% TBT reduction.',
    skills: [
      { name: 'Core Web Vitals', level: 'LCP 1.1s', projects: ['realestate-opt', 'gavenue'] },
      { name: 'Cache Warmup', level: '30-Day TTL', projects: ['realestate-opt'] },
      { name: 'Deferred JS Loading', level: 'TBT -98%', projects: ['realestate-opt'] },
      { name: 'WordPress Optimization', level: 'Server Tuning', projects: ['realestate-opt'] },
      { name: 'Hostinger Server Tuning', level: 'PHP Limits', projects: ['realestate-opt'] },
      { name: 'Vercel Edge', level: 'Global CDN', projects: ['gavenue', 'luxuryjewels'] },
    ],
  },
];

export function TechnicalEcosystem() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>('React 18');

  const activeCategory = TECH_CATEGORIES.find((cat) =>
    cat.skills.some((s) => s.name === selectedSkill)
  ) || TECH_CATEGORIES[0];

  const activeSkillObj = activeCategory.skills.find((s) => s.name === selectedSkill) || activeCategory.skills[0];

  const relatedProjects = PROJECTS_DATA.filter((p) =>
    activeSkillObj.projects.includes(p.id)
  );

  const handleSelectSkill = (skillName: string) => {
    setSelectedSkill(skillName);
  };

  return (
    <section id="capabilities" className="py-20 sm:py-28 bg-cream relative overflow-hidden select-none border-b border-line-strong">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="eyebrow text-purple mb-2 block">ENGINEERING ECOSYSTEM</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight font-sans">
            Technical Stack & Applied Capabilities
          </h2>
          <p className="text-base text-ink-soft mt-3 leading-relaxed font-sans font-medium">
            Rather than generic progress bars, every skill is mapped directly to production applications, performance benchmarks, and software systems I have built. Select any technology to inspect its connected project architecture.
          </p>
        </div>

        {/* 2-Column Ecosystem Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Skill Matrix Categories */}
          <div className="lg:col-span-7 space-y-6">
            {TECH_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="p-6 rounded-3xl bg-white border border-line-strong shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-cream-dim/30 text-orange">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{category.name}</h3>
                      <p className="text-xs text-ink-soft font-sans font-medium">{category.description}</p>
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.skills.map((skill) => {
                      const isSelected = selectedSkill === skill.name;
                      return (
                        <button
                          key={skill.name}
                          onClick={() => handleSelectSkill(skill.name)}
                          data-magnetic="true"
                          className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono transition-all duration-200 flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-ink text-white shadow-md scale-105 border border-orange'
                              : 'bg-cream-dim/20 text-ink-soft border border-line hover:border-orange/50 hover:text-ink'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange animate-pulse' : 'bg-ink-soft/40'}`} />
                          <span>{skill.name}</span>
                          <span className="text-[9px] opacity-70">({skill.level})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Connected Real Projects Inspector */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl bg-[#09090b] text-cream border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange font-mono">
                  [Technology Connected]
                </span>
                <span className="text-xs font-mono text-neutral-400 font-bold">
                  {selectedSkill}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">
                      {selectedSkill}
                    </h4>
                    <span className="text-xs text-orange font-mono font-bold mt-1 block">
                      Category: {activeCategory.name} · Role: {activeSkillObj.level}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono block">
                      Production Projects Powered by {selectedSkill}:
                    </span>

                    {relatedProjects.length > 0 ? (
                      <div className="space-y-2.5">
                        {relatedProjects.map((p) => (
                          <div
                            key={p.id}
                            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange/50 transition-colors space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm font-bold text-white tracking-tight">
                                {p.title}
                              </h5>
                              {p.metricsResult && (
                                <span className="text-[9px] font-mono font-bold text-green px-2 py-0.5 rounded bg-green/10 border border-green/20">
                                  {p.metricsResult}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-300 font-medium line-clamp-2">
                              {p.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-400 font-mono">
                        Applied across modular architecture & core full-stack workflows.
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>Engineering Rigor: Verified</span>
                    <a href="#work" className="text-orange hover:underline font-bold flex items-center gap-1">
                      <span>View Case Studies</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TechnicalEcosystem;
