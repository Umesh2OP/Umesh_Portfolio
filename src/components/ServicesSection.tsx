import { SERVICES_DATA } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { TextAnimate } from './ui/text-animate';

const serviceNotes = [
  'Interfaces shaped around real users, delivered with careful responsive implementation and clean handoff.',
  'Flexible content systems, commerce experiences, and API integrations built around your existing workflow.',
  'Practical investigations into loading, rendering, server, and data bottlenecks, followed by measured fixes.',
];

export function ServicesSection() {
  return <section id="services" className="services section-pad" aria-labelledby="services-heading"><div className="container-wide">
    <div className="section-heading-row"><div><p className="eyebrow">How I can help</p><h2 id="services-heading" className="section-title"><TextAnimate animation="springCharacter" by="character">Thoughtful engineering,</TextAnimate><br /><em><TextAnimate animation="springCharacter" by="character">from screen to server.</TextAnimate></em></h2></div><p className="section-intro">Frontend is where the experience begins. Full-stack thinking makes sure it works all the way through.</p></div>
    <div className="service-list">{SERVICES_DATA.map((service, index) => <article className="service-row" key={service.id}><span className="service-number">0{index + 1}</span><div><p className="eyebrow">{service.category}</p><h3>{service.title}</h3></div><div><p className="service-description">{serviceNotes[index]}</p><div className="service-tags">{service.capabilities.filter((_, i) => !(index === 2 && i === 0)).slice(0, 3).map((cap) => <span key={cap}>{cap.replace('Pixel-Perfect', 'Design-accurate').replace('90%+ Google Lighthouse & Core Web Vitals Fixes', 'Core Web Vitals review')}</span>)}</div></div><a href="#contact" aria-label={`Discuss ${service.title}`}><ArrowUpRight size={18} aria-hidden="true" /></a></article>)}</div>
  </div></section>;
}
export default ServicesSection;
