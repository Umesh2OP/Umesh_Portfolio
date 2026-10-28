import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  return <footer className="site-footer"><div className="container-wide footer-inner"><div><a className="footer-name" href="#home">UMESH</a><p>Frontend-focused full-stack developer</p></div><span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span><a className="back-top" href="#home">Back to top <ArrowUp size={14} aria-hidden="true" /></a></div></footer>;
}
export default Footer;
