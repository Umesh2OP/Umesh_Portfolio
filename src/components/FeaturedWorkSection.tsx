import { useEffect, useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { TextAnimate } from './ui/text-animate';
import realestateImg from '../assets/realestate_opt.webp';
import jewelsImg from '../assets/luxuryjewels.webp';
import gavenueImg from '../assets/gavenue.webp';
import flavorImg from '../assets/blogverse.webp';
import quotaImg from '../assets/quotaguard.webp';
import toletImg from '../assets/slotswapper.webp';

const images: Record<string, string> = { 'whatsapp-content-automation': '/whatsapp-automation.svg', 'realestate-opt': realestateImg, luxuryjewels: jewelsImg, gavenue: gavenueImg, flavorcatalystz: flavorImg, quotaguard: quotaImg, toletglobe: toletImg };

function ProjectOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeProject = PROJECTS_DATA[activeIndex];

  useEffect(() => {
    if (paused || reduceMotion) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PROJECTS_DATA.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [paused, reduceMotion]);

  const step = (direction: number) => {
    setActiveIndex((current) => (current + direction + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  return <div
    className="project-orbit"
    aria-label="Selected project showcase"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
    }}
  >
    <div className="project-orbit-stage" aria-live="off">
      {PROJECTS_DATA.map((project, index) => {
        const offset = (index - activeIndex + PROJECTS_DATA.length) % PROJECTS_DATA.length;
        const position = offset === 0 ? 0 : offset === 1 ? 1 : offset === PROJECTS_DATA.length - 1 ? -1 : 2;
        const visible = Math.abs(position) <= 1;

        return <motion.article
          className={`orbit-card ${position === 0 ? 'orbit-card-active' : ''}`}
          key={project.id}
          aria-hidden={!visible}
          style={{ zIndex: position === 0 ? 3 : 2 }}
          animate={{
            x: position === 0 ? '-50%' : position > 0 ? '38%' : '-138%',
            rotateY: position === 0 ? 0 : position > 0 ? -18 : 18,
            scale: position === 0 ? 1 : 0.82,
            opacity: visible ? position === 0 ? 1 : 0.52 : 0,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={images[project.id]} alt="" loading="lazy" decoding="async" />
          <div className="orbit-card-shade" />
          <span className="orbit-card-number">0{index + 1} / 0{PROJECTS_DATA.length}</span>
          <div className="orbit-card-copy">
            <span>{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.metricsResult || project.subtitle}</p>
          </div>
        </motion.article>;
      })}
    </div>
    <div className="project-orbit-controls">
      <button type="button" aria-label="Previous project" onClick={() => step(-1)}><ArrowLeft size={16} aria-hidden="true" /></button>
      <span className="orbit-current"><strong>0{activeIndex + 1}</strong><span> / 0{PROJECTS_DATA.length}</span></span>
      <button type="button" aria-label="Next project" onClick={() => step(1)}><ArrowRight size={16} aria-hidden="true" /></button>
      <a href="#project-detail" className="orbit-view-link">Project details <ArrowUpRight size={14} aria-hidden="true" /></a>
    </div>
    <motion.article
      id="project-detail"
      className="orbit-project-detail"
      key={activeProject.id}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="orbit-detail-heading">
        <div>
          <p className="eyebrow">{activeProject.category}</p>
          <h3>{activeProject.title}</h3>
        </div>
        <p className="orbit-detail-result">{activeProject.metricsResult || activeProject.subtitle}</p>
      </div>
      <div className="orbit-detail-body">
        <div>
          <h4>The challenge</h4>
          <p>{activeProject.problem}</p>
        </div>
        <div>
          <h4>The approach</h4>
          <p>{activeProject.solution}</p>
        </div>
      </div>
      <div className="orbit-detail-footer">
        <div className="orbit-detail-tags" aria-label="Technologies used">
          {activeProject.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-links">
          {activeProject.liveUrl && <a href={activeProject.liveUrl} target="_blank" rel="noreferrer">{activeProject.liveUrl.includes('github.com') ? 'View frontend repository' : 'Visit live site'} <ArrowUpRight size={14} aria-hidden="true" /></a>}
          {activeProject.githubUrl && <a href={activeProject.githubUrl} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={14} aria-hidden="true" /></a>}
          {!activeProject.liveUrl && !activeProject.githubUrl && <span>Client project · Further details available on request</span>}
        </div>
      </div>
    </motion.article>
    <p className="sr-only" aria-live="polite">{activeProject.title} — {activeProject.metricsResult || activeProject.subtitle}</p>
  </div>;
}

export function FeaturedWorkSection() {
  return <section id="work" className="work section-pad" aria-labelledby="work-heading"><div className="container-wide">
    <div className="section-heading-row work-heading"><div><p className="eyebrow">Selected work · 2025—26</p><h2 id="work-heading" className="section-title"><TextAnimate animation="springCharacter" by="character">Built for people.</TextAnimate><br /><em><TextAnimate animation="springCharacter" by="character">Measured in outcomes.</TextAnimate></em></h2></div><p className="section-intro">Client partnerships, production platforms, and engineering work grounded in real constraints.</p></div>
    <ProjectOrbit />
  </div></section>;
}
export default FeaturedWorkSection;
