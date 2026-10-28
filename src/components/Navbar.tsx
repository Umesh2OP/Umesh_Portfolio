import { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { TextAnimate } from './ui/text-animate';

const links = [{ name: 'Work', href: '#work' }, { name: 'Services', href: '#services' }, { name: 'Process', href: '#process' }, { name: 'Experience', href: '#experience' }];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-nav">
    <div className="nav-inner">
      <a href="#home" className="wordmark" aria-label="Umesh, home">
        <span className="wordmark-monogram">U</span><span className="wordmark-name"><TextAnimate animation="springCharacter" by="character" staggerDelay={0.04}>UMESH</TextAnimate></span>
      </a>
      <nav id="main-navigation" className={`nav-links ${open ? 'nav-links-open' : ''}`} aria-label="Main navigation">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><TextAnimate animation="springCharacter" by="character" staggerDelay={0.035}>{link.name}</TextAnimate></a>)}
        <a className="nav-mobile-contact" href={`mailto:${PERSONAL_INFO.email}`} onClick={() => setOpen(false)}><TextAnimate animation="springCharacter" by="character" staggerDelay={0.035}>Start a project</TextAnimate><ArrowUpRight size={14} aria-hidden="true" /></a>
      </nav>
      <a className="nav-contact" href={`mailto:${PERSONAL_INFO.email}`}><TextAnimate animation="springCharacter" by="character" staggerDelay={0.035}>Let’s talk</TextAnimate><ArrowUpRight size={14} aria-hidden="true" /></a>
      <button className="nav-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">{open ? 'Close navigation' : 'Open navigation'}</span>
        <span className="nav-toggle-icon" key={open ? 'close' : 'open'} aria-hidden="true">{open ? <X size={18} /> : <Menu size={18} />}</span>
      </button>
    </div>
  </header>;
}
export default Navbar;
