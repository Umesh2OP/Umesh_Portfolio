import { EXPERIENCE_DATA } from '../data/portfolioData';
import { TextAnimate } from './ui/text-animate';

export function ExperienceSection() {
  return <section id="experience" className="experience section-pad" aria-labelledby="experience-heading"><div className="container-wide">
    <div className="section-heading-row"><div><p className="eyebrow">Experience</p><h2 id="experience-heading" className="section-title"><TextAnimate animation="springCharacter" by="character">Built in</TextAnimate>{' '}<em><TextAnimate animation="springCharacter" by="character">production.</TextAnimate></em></h2></div><p className="section-intro">A frontend-first perspective, shaped by hands-on work across client platforms, APIs, and engineering teams.</p></div>
    <div className="experience-list">{EXPERIENCE_DATA.map((item) => <article className="experience-row" key={item.id}><div><span className="experience-period">{item.period}</span><p>{item.location}</p></div><div><h3>{item.role}</h3><p className="experience-company">{item.company}</p><ul>{item.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="experience-tags">{item.techStack.slice(0, 6).map((tech) => <span key={tech}>{tech}</span>)}</div></div></article>)}</div>
  </div></section>;
}
export default ExperienceSection;
