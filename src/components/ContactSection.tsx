import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Mail } from 'lucide-react';
import { TextAnimate } from './ui/text-animate';

export function ContactSection() {
  return <section id="contact" className="contact section-pad" aria-labelledby="contact-heading"><div className="container-wide contact-inner">
    <div><p className="eyebrow">Have something in mind?</p><h2 id="contact-heading"><TextAnimate animation="springCharacter" by="character">Let’s make</TextAnimate><br /><em><TextAnimate animation="springCharacter" by="character">it work beautifully.</TextAnimate></em></h2><p className="contact-copy">Tell me what you’re building, where you’re stuck, or what needs to be better. I’ll get back to you by email.</p></div>
    <div className="contact-actions"><a className="button button-ivory" href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent('Project enquiry')}`}><Mail size={17} aria-hidden="true" /> Email Umesh <ArrowUpRight size={16} aria-hidden="true" /></a><a className="contact-email" href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a><div className="social-links"><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a></div></div>
  </div></section>;
}
export default ContactSection;
