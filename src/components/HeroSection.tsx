import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TextAnimate } from './ui/text-animate';
import { useIsCompactViewport } from '../hooks/useIsCompactViewport';

const heroCopyVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
} satisfies Variants;

const heroItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
} satisfies Variants;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isCompact = useIsCompactViewport();
  const [typedText, setTypedText] = useState('');
  const phrases = ['digital experiences', 'high-performance platforms', 'interfaces that feel effortless'];
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const sculptureY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion || isCompact ? 0 : 90]);
  const sculptureRotate = useTransform(scrollYProgress, [0, 1], [-9, reduceMotion || isCompact ? -9 : 12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion || isCompact ? 0 : -24]);

  useEffect(() => {
    const art = artRef.current;
    const sculpture = art?.querySelector<HTMLElement>('.sculpture-wrap');
    if (!art || !sculpture || reduceMotion || isCompact || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        sculpture,
        { opacity: 0, '--pointer-y': '18px' },
        {
          opacity: 1,
          '--pointer-y': '0px',
          clearProps: 'opacity',
          duration: 1.15,
          ease: 'power3.out',
        },
      );
    }, art);

    const moveX = gsap.quickTo(sculpture, '--pointer-x', { duration: 0.8, ease: 'power3.out' });
    const moveY = gsap.quickTo(sculpture, '--pointer-y', { duration: 0.8, ease: 'power3.out' });
    const rotateY = gsap.quickTo(sculpture, '--pointer-rotate', { duration: 0.8, ease: 'power3.out' });
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      const bounds = art.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      moveX(x * 22);
      moveY(y * 16);
      rotateY(x * 7);
    };
    const resetPointer = () => {
      moveX(0);
      moveY(0);
      rotateY(0);
    };

    art.addEventListener('pointermove', handlePointerMove);
    art.addEventListener('pointerleave', resetPointer);

    return () => {
      art.removeEventListener('pointermove', handlePointerMove);
      art.removeEventListener('pointerleave', resetPointer);
      gsap.killTweensOf(sculpture, '--pointer-x');
      gsap.killTweensOf(sculpture, '--pointer-y');
      gsap.killTweensOf(sculpture, '--pointer-rotate');
      context.revert();
    };
  }, [isCompact, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || isCompact) return;

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer: number;

    const type = () => {
      const phrase = phrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      setTypedText(phrase.slice(0, characterIndex));

      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        timer = window.setTimeout(type, 1500);
        return;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(type, 350);
        return;
      }

      timer = window.setTimeout(type, deleting ? 34 : 62);
    };

    timer = window.setTimeout(type, 450);
    return () => window.clearTimeout(timer);
  }, [isCompact, reduceMotion]);

  return <section id="home" ref={sectionRef} className="hero">
    <div className="hero-grain" aria-hidden="true" />
    <div className="container-wide hero-inner">
      <motion.div
        className="hero-copy"
        variants={heroCopyVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        style={reduceMotion || isCompact ? undefined : { y: contentY }}
      >
        <motion.p className="eyebrow hero-kicker" variants={heroItemVariants}>Independent developer · Digital craft &amp; engineering</motion.p>
        <h1>
          <span className="hero-heading-line"><TextAnimate animation="springCharacter" by="character" delay={0.12} staggerDelay={0.04}>Interfaces with</TextAnimate></span>
          <br />
          <span className="hero-heading-line"><TextAnimate animation="springCharacter" by="character" delay={0.3} staggerDelay={0.04}>purpose. Systems</TextAnimate></span>
          <br />
          <em className="hero-heading-line"><TextAnimate animation="springCharacter" by="character" delay={0.48} staggerDelay={0.04}>built to last.</TextAnimate></em>
        </h1>
        <motion.p className="hero-typewriter" variants={heroItemVariants}><span className="typewriter-prefix">I craft </span><span className="typewriter-phrase" aria-hidden="true">{reduceMotion ? phrases[0] : typedText}</span><span className="typewriter-caret" aria-hidden="true" /><span className="sr-only">I craft digital experiences.</span></motion.p>
        <motion.p className="hero-description" variants={heroItemVariants}>I’m Umesh, a frontend-focused full-stack developer. I turn ambitious ideas into considered digital experiences, then engineer the systems that bring them to life.</motion.p>
        <motion.div className="hero-actions" variants={heroItemVariants}><a className="button button-dark" href="#work">Explore selected work <ArrowUpRight size={16} aria-hidden="true" /></a><a className="text-link" href={`mailto:${PERSONAL_INFO.email}`}>Start a conversation <ArrowUpRight size={15} aria-hidden="true" /></a></motion.div>
        <motion.div className="hero-caption" variants={heroItemVariants}><span>React · TypeScript · Node.js</span><span>Based in India · Working worldwide</span></motion.div>
      </motion.div>
      <div ref={artRef} className="hero-art" aria-hidden="true">
        <motion.div className="sculpture-wrap developer-art" style={reduceMotion || isCompact ? undefined : { y: sculptureY, rotate: sculptureRotate }}>
          <div className="developer-orbit developer-orbit-one" />
          <div className="developer-orbit developer-orbit-two" />
          <div className="developer-status">
            <span className="developer-status-dot" />
            <span>Independent · Available for select projects</span>
          </div>
          <div className="developer-editor">
            <div className="developer-editor-topbar">
              <span className="developer-window-dots"><i /><i /><i /></span>
              <span className="developer-editor-brand">&lt;/&gt;</span>
              <span className="developer-editor-title">umesh.dev</span>
              <span className="developer-editor-branch">main</span>
            </div>
            <div className="developer-editor-file">
              <span>src</span><span className="developer-file-separator">/</span><strong>portfolio.tsx</strong>
              <span className="developer-file-type">TypeScript · React</span>
            </div>
            <div className="developer-code">
              <div><span className="developer-line-number">01</span><span><b className="developer-token-keyword">const</b> <b className="developer-token-name">developer</b> = {'{'}</span></div>
              <div><span className="developer-line-number">02</span><span><b className="developer-token-property">focus</b>: <em>"thoughtful software"</em>,</span></div>
              <div><span className="developer-line-number">03</span><span><b className="developer-token-property">stack</b>: [<em>"React"</em>, <em>"TypeScript"</em>],</span></div>
              <div><span className="developer-line-number">04</span><span><b className="developer-token-property">systems</b>: <em>"built to last"</em>,</span></div>
              <div><span className="developer-line-number">05</span><span><b className="developer-token-property">ship</b>: <b className="developer-token-keyword">async</b> (idea) <b className="developer-token-keyword">=&gt;</b> product,</span></div>
              <div><span className="developer-line-number">06</span><span>{'}'}</span></div>
            </div>
            <div className="developer-editor-footer">
              <span><i /> All systems operational</span>
              <span>Production ready</span>
            </div>
          </div>
          <div className="developer-architecture-card">
            <span className="developer-card-index">01 / ARCHITECTURE</span>
            <div className="developer-system-flow">
              <span>UI</span><i /><span>API</span><i /><span>DATA</span>
            </div>
            <span className="developer-card-caption">Designed as one system.</span>
          </div>
        </motion.div>
      </div>
    </div>
    <a className="scroll-cue" href="#impact"><span>Scroll to explore</span><ArrowDown size={14} aria-hidden="true" /></a>
  </section>;
}
export default HeroSection;
