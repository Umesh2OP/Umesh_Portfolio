import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import { motion } from 'framer-motion';
import { Project3DVideoModal } from './3d/Project3DVideoModal';
import { ZoomClickModal, ZoomItemData } from './ui/ZoomClickModal';
import { LusionTextSkew } from './ui/LusionTextSkew';
import { ArrowUpRight, Play, ZoomIn } from 'lucide-react';

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

// Project bullet tags matching Lusion style (CONCEPT · WEB · DESIGN · DEVELOPMENT · 3D · ANIMATION)
const projectBulletTags: Record<string, string> = {
  'realestate-opt': 'SYSTEM PERFORMANCE · CORE WEB VITALS · SERVER TUNING · CACHE WARMUP',
  quotaguard: 'INFRASTRUCTURE · API SECURITY · REDIS · JWT · DASHBOARD',
  blogverse: 'AI PLATFORM · FASTAPI · GROQ LLM · REDUX · STREAMING',
  gavenue: 'AGENCY PLATFORM · VITE · FRAMER MOTION · VERCEL EDGE',
  slotswapper: 'P2P CALENDAR · SCHEDULING ENGINE · MONGODB · REACT',
  luxuryjewels: 'LUXURY SHOWROOM · E-COMMERCE · BAZAR · VITE · REACT',
};

export const FeaturedWorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [zoomItem, setZoomItem] = useState<ZoomItemData | null>(null);

  const handleOpenZoom = (project: ProjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomItem({
      id: project.id,
      title: project.title,
      category: project.category,
      description: `${project.subtitle} — ${project.solution}`,
      image: projectImages[project.id],
      videoUrl: project.videoUrl,
      demoUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      techStack: project.technologies,
      metrics: project.metricsResult
        ? [{ label: 'Metric Impact', value: project.metricsResult }]
        : undefined,
    });
  };

  return (
    <section id="work" className="py-20 sm:py-28 bg-cream relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Lusion Signature Header Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
          
          {/* Left Column: Giant Headline */}
          <div>
            <span className="eyebrow text-purple mb-2 block">SELECTED CASE STUDIES</span>
            <LusionTextSkew
              as="h2"
              text="Featured Work"
              accentWords={['Work']}
              className="text-5xl sm:text-6xl md:text-7xl font-normal text-ink tracking-tight font-sans leading-[0.95]"
            />
          </div>

          {/* Right Column: Lusion Header Metadata & CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:max-w-md">
            <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink-soft leading-relaxed font-sans">
              CLICK ANY CARD FOR 3D CINEMATIC ZOOM-IN FOCUS & LIVE SPECIFICATIONS.
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                data-magnetic="true"
                className="px-4 py-2 rounded-full bg-ink text-cream text-[10px] font-extrabold uppercase tracking-widest hover:bg-orange transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span>LET'S TALK</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              </a>
            </div>
          </div>

        </div>

        {/* Lusion 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-14">
          {PROJECTS_DATA.map((project, idx) => {
            const bulletTag =
              projectBulletTags[project.id] ||
              'CONCEPT · WEB · DESIGN · DEVELOPMENT · 3D · ANIMATION';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={(e) => handleOpenZoom(project, e)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Rounded Media Card Frame with Video Texture */}
                <div
                  data-cursor-text="ZOOM"
                  data-magnetic="true"
                  className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-900 border border-line-strong shadow-sm group-hover:shadow-2xl transition-all duration-300 transform-gpu"
                >
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      poster={projectImages[project.id]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.96] group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={projectImages[project.id]}
                      alt={project.title}
                      className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.96] group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  )}

                  {/* Gradient Overlay & Hover Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-orange text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>3D Zoom Focus</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider hover:bg-black pointer-events-auto"
                    >
                      3D Shader Mode
                    </button>
                  </div>

                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2 rounded-full bg-cream/20 backdrop-blur-md text-white group-hover:bg-orange transition-colors pointer-events-none">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Sub-label Category Bullets */}
                <div className="mt-4 sm:mt-5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-soft/80 font-mono">
                  {bulletTag}
                </div>

                {/* Minimalist Large Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink tracking-tight font-sans mt-1.5 group-hover:text-orange transition-colors duration-300">
                  {project.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 3D WebGL Video Canvas Modal */}
      <Project3DVideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 3D Cinematic Zoom-In / Zoom-Out Click Modal */}
      <ZoomClickModal
        isOpen={zoomItem !== null}
        onClose={() => setZoomItem(null)}
        data={zoomItem}
      />
    </section>
  );
};

export default FeaturedWorkSection;
