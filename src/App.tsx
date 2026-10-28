import { motion, useScroll } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedWorkSection } from './components/FeaturedWorkSection';
import { ClientTestimonialSection } from './components/ClientTestimonialSection';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AgencyPartnershipSection } from './components/AgencyPartnershipSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SectionReveal } from './components/ui/SectionReveal';
import { METRICS_DATA } from './data/portfolioData';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { TextAnimate } from './components/ui/text-animate';

function CraftStrip() {
  const message = 'Design-led interfaces · Built for real users · Engineered to perform ·';
  return <p className="craft-strip" aria-label={message} role="img">
    <span className="craft-strip-track" aria-hidden="true">
      {[0, 1].map((copy) => <span className="craft-strip-group" key={copy}>
        <span>Design-led interfaces</span><Sparkles /><span>Built for real users</span><Sparkles /><span>Engineered to perform</span><Sparkles />
      </span>)}
    </span>
  </p>;
}

function ImpactSection() {
  return <section className="impact section-pad" aria-labelledby="impact-heading">
    <div className="container-wide">
      <div className="section-heading-row">
        <div><p className="eyebrow">Measured in the work</p><h2 id="impact-heading" className="section-title"><TextAnimate animation="springCharacter" by="character">Good craft.</TextAnimate>{' '}<em><TextAnimate animation="springCharacter" by="character">Real impact.</TextAnimate></em></h2></div>
        <p className="section-intro">A few outcomes from client work and production systems. Each result is tied to a specific project below.</p>
      </div>
      <div className="impact-grid">{METRICS_DATA.map((item, index) => <article className="impact-item" key={item.id}>
        <span className="impact-index">0{index + 1}</span><p className="impact-value">{item.value}</p><h3>{item.label}</h3><p className="impact-description">{item.description}</p>
      </article>)}</div>
      <div className="stack-strip"><span>Working across</span><p>React · TypeScript · Node.js · REST APIs · Redis · WordPress · Core Web Vitals</p></div>
    </div>
  </section>;
}

function ProcessSection() {
  const steps = [
    ['01', 'Understand', 'Align on the audience, constraints, existing systems, and what a successful launch needs to do.'],
    ['02', 'Shape the solution', 'Map the interface and technical approach around the real requirements, then agree on scope and milestones.'],
    ['03', 'Build in the open', 'Ship in clear, reviewable steps with responsive implementation, thoughtful performance, and regular updates.'],
    ['04', 'Launch & hand over', 'Check the finished work, deploy with care, and leave behind a maintainable codebase and useful documentation.'],
  ];
  return <section id="process" className="process section-pad" aria-labelledby="process-heading"><div className="container-wide">
    <div className="section-heading-row"><div><p className="eyebrow">A considered process</p><h2 id="process-heading" className="section-title"><TextAnimate animation="springCharacter" by="character">From first brief</TextAnimate><br /><TextAnimate animation="springCharacter" by="character">to</TextAnimate>{' '}<em><TextAnimate animation="springCharacter" by="character">live product.</TextAnimate></em></h2></div><p className="section-intro">Straightforward collaboration, with the details handled from the first conversation through production.</p></div>
    <ol className="process-list">{steps.map(([num, title, body]) => <li key={num}><span className="process-number">{num}</span><h3><TextAnimate animation="springCharacter" by="character" staggerDelay={0.02}>{title}</TextAnimate></h3><p>{body}</p><ArrowDownRight aria-hidden="true" /></li>)}</ol>
  </div></section>;
}

export function App() {
  const { scrollYProgress } = useScroll();
  return <div className="site-shell">
    <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main">
      <SectionReveal><HeroSection /></SectionReveal>
      <SectionReveal><CraftStrip /></SectionReveal>
      <SectionReveal><ImpactSection /></SectionReveal>
      <SectionReveal><FeaturedWorkSection /></SectionReveal>
      <SectionReveal><ClientTestimonialSection /></SectionReveal>
      <SectionReveal><ServicesSection /></SectionReveal>
      <SectionReveal><ProcessSection /></SectionReveal>
      <SectionReveal><ExperienceSection /></SectionReveal>
      <SectionReveal><AgencyPartnershipSection /></SectionReveal>
      <SectionReveal><ContactSection /></SectionReveal>
    </main>
    <Footer />
  </div>;
}
export default App;
