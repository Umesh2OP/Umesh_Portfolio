import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { X, ArrowUpRight, Zap, Code2, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

// Mockup Images
import quotaguardImg from '../assets/quotaguard.png';
import blogverseImg from '../assets/blogverse.png';
import gavenueImg from '../assets/gavenue.png';
import slotswapperImg from '../assets/slotswapper.png';
import luxuryjewelsImg from '../assets/luxuryjewels.png';
import realestateOptImg from '../assets/realestate_opt.png';

const projectImages: Record<string, string> = {
  'realestate-opt': realestateOptImg,
  quotaguard: quotaguardImg,
  blogverse: blogverseImg,
  gavenue: gavenueImg,
  slotswapper: slotswapperImg,
  luxuryjewels: luxuryjewelsImg,
};

export const FeaturedWorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Disable body scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Triple projects data to guarantee infinite scroll seamless loop without gaps
  const marqueeProjects = [...PROJECTS_DATA, ...PROJECTS_DATA, ...PROJECTS_DATA];

  return (
    <section id="work" className="py-20 bg-cream relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 select-none">
          <div>
            <span className="eyebrow text-purple">Case Studies</span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2">
              Systems & Production Applications
            </h2>

            <p className="text-base text-ink-soft mt-3 max-w-2xl font-sans">
              A continuous flow of case studies. Hover to pause the stream, and click any card to inspect system solution blueprints, codebase metrics, and live repo links.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-line-strong rounded-full text-xs font-semibold text-ink-soft shrink-0 select-none shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
            </span>
            <span>Live System Feed</span>
          </div>
        </div>

      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 border-y border-line-strong bg-cream-dim/10">
        <div className="animate-marquee gap-6 flex">
          {marqueeProjects.map((project, index) => {
            // Distinct accent colors for each project id
            let accentColorClass = 'border-t-orange';
            let bgSoftClass = 'bg-orange-soft/40';
            let textAccentClass = 'text-orange';

            if (project.id === 'realestate-opt') {
              accentColorClass = 'border-t-green-500';
              bgSoftClass = 'bg-green-100';
              textAccentClass = 'text-green-600';
            } else if (project.id === 'blogverse') {
              accentColorClass = 'border-t-purple';
              bgSoftClass = 'bg-purple-soft/40';
              textAccentClass = 'text-purple';
            } else if (project.id === 'gavenue') {
              accentColorClass = 'border-t-green';
              bgSoftClass = 'bg-green-soft/40';
              textAccentClass = 'text-green';
            } else if (project.id === 'slotswapper') {
              accentColorClass = 'border-t-amber-500';
              bgSoftClass = 'bg-amber-100';
              textAccentClass = 'text-amber-600';
            }

            return (
              <div
                key={`${project.id}-${index}`}
                onClick={() => setSelectedProject(project)}
                className="w-[300px] sm:w-[350px] shrink-0 bg-[#09090b] text-neutral-200 border border-white/[0.08] rounded-[28px] overflow-hidden hover:border-orange/60 hover:shadow-2xl transition-all duration-300 cursor-pointer group shadow-lg flex flex-col"
              >
                {/* Top Image Container with bottom fade gradient */}
                <div className="relative h-[180px] w-full overflow-hidden">
                  <img
                    src={projectImages[project.id]}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale contrast-[1.15] brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Header: Title & Checkmark */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h3 className="text-base font-bold text-white tracking-tight truncate group-hover:text-orange transition-colors duration-200">
                          {project.title}
                        </h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      </div>
                      <span className="text-[8px] font-bold text-orange-soft/80 border border-orange-soft/20 px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0">
                        {project.category.split(' ')[0]}
                      </span>
                    </div>

                    {/* Subtitle / Description */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-orange uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-medium line-clamp-3">
                        {project.problem}
                      </p>
                    </div>
                  </div>

                  {/* Footer stats and white pill action button */}
                  <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                    
                    {/* Stats Icons */}
                    <div className="flex items-center gap-3 text-neutral-400 font-mono text-[9px]">
                      <div className="flex items-center gap-1" title="Technologies count">
                        <Code2 className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="font-bold">{project.technologies.length}</span>
                      </div>
                      {project.metricsResult && (
                        <div className="flex items-center gap-1" title={project.metricsResult}>
                          <Zap className="w-3.5 h-3.5 text-orange/80 animate-pulse" />
                          <span className="font-bold truncate max-w-[80px] sm:max-w-[100px]">
                            {project.id === 'realestate-opt' ? 'LCP 1.1s' : project.id === 'quotaguard' ? '< 5ms' : project.id === 'blogverse' ? '~30%' : project.id === 'gavenue' ? '48h' : project.id === 'luxuryjewels' ? 'Cayman' : '0 overlap'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* White Pill Button */}
                    <button className="bg-white hover:bg-neutral-200 text-neutral-950 font-extrabold px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest transition-colors flex items-center gap-1 shrink-0">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Full-Screen Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm select-text"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-cream rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-line-strong shadow-2xl relative"
            >
              
              {/* Modal Exit Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white border border-line-strong text-ink hover:text-orange hover:border-orange transition-all duration-200 shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Injected Detailed Case Study Component */}
              <div className="p-2 sm:p-4 select-text">
                <ProjectCard
                  project={selectedProject}
                  index={PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id)}
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
