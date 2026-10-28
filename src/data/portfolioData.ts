import { MetricItem, ProjectItem, ExperienceItem, ServiceItem, ArchitectureNode } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Umesh",
  title: "Independent Full-Stack Developer · Agency Technical Partner",
  tagline: "I build high-converting web applications, custom platforms, and production systems for agencies and growing businesses.",
  bio: "Independent Full-Stack Engineer specializing in high-performance web platforms, headless CMS, and API architecture for agencies, startups, and direct clients. Delivering pixel-perfect Figma builds, Core Web Vitals optimization, and robust backend systems with speed and reliability.",
  status: "Available for Freelance Projects & Agency Partnerships",
  github: "https://github.com/Umesh2OP",
  linkedin: "https://linkedin.com/in/umesh-maniyar",
  email: "maniyarumesh9@gmail.com",
};

export const METRICS_DATA: MetricItem[] = [
  {
    id: "m1",
    value: "30.6s ➔ 1.1s",
    label: "LCP Speed Boost (96% Faster)",
    description: "Hostinger cold-start load optimization & 10,800ms TBT elimination for US Real Estate platform.",
    badge: "Client ROI & Performance",
    iconName: "Zap"
  },
  {
    id: "m2",
    value: "48 Hours",
    label: "Agency Site Delivery",
    description: "Turnaround time for production-ready, animation-rich GaVenue agency platform redesign.",
    badge: "Velocity & Delivery",
    iconName: "Clock"
  },
  {
    id: "m3",
    value: "Cayman Islands",
    label: "Global Client Launch",
    description: "Bespoke luxury jewelry showroom & e-commerce platform for international retail brand.",
    badge: "E-Commerce & Retail",
    iconName: "TrendingUp"
  },
  {
    id: "m4",
    value: "< 5ms",
    label: "Rate-Limiter Overhead",
    description: "Redis sliding-window rate limiting execution overhead in QuotaGuard middleware.",
    badge: "API System Performance",
    iconName: "Cpu"
  },
  {
    id: "m5",
    value: "15–20%",
    label: "Load-Time Reduction",
    description: "MERN bundle size, image pipeline, and code-splitting optimization at TO-Let Globe.",
    badge: "Core Web Vitals",
    iconName: "ShieldCheck"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "whatsapp-content-automation",
    title: "WhatsApp Content Distribution Automation",
    subtitle: "Reliable daily routing for nearly 100 learning groups",
    category: "EdTech Workflow Automation",
    problem: "Daily educational content had to be manually routed to nearly 100 WhatsApp groups across different learning levels. The process was repetitive and vulnerable to sending the wrong image, missing a group, or losing track of deliveries after an interruption.",
    solution: "Built a Python and Playwright workflow that can be initiated with a single reviewed command. Spreadsheet-based rules route learning levels to the right groups; exact-name matching and chat verification check recipients; content validation stops runs when the expected image is missing or stale; transient failures are retried; and delivery tracking and run reports make partial completion visible. The public demo uses dummy content to protect organizational information and student privacy; it does not reproduce the production environment.",
    technologies: ["Python", "Playwright", "WhatsApp Web", "Spreadsheet-Based Routing", "Delivery Reporting"],
    engineeringHighlights: [
      "Automated reviewed daily content distribution across nearly 100 WhatsApp learning groups.",
      "Verified exact group names and the opened chat before attempting delivery.",
      "Validated the expected daily image and stopped the run when content was missing or out of date.",
      "Added transient-failure retries, completed-delivery tracking, and success/failure reporting to support recovery and reduce duplicate sends.",
      "Prepared a privacy-safe demo with dummy content instead of organizational or student data."
    ],
    metricsResult: "Nearly 100 Groups · Single Reviewed Command",
    githubUrl: "",
    liveUrl: "",
    architectureDiagramType: "workflow-automation"
  },
  {
    id: "realestate-opt",
    title: "US Real Estate Platform",
    subtitle: "96% Speed Boost & Cold-Load Optimization (30.6s ➔ 1.1s LCP)",
    category: "Client Performance Case Study",
    problem: "A WordPress real estate platform taking over 19 seconds to load on cold visits (Grade F performance score) with 10,800ms of Total Blocking Time (TBT) due to background plugin loops, aggressive cache purges, and 3,100+ database queries per page build — causing massive drop-offs in property lead conversions.",
    solution: "Diagnosed and engineered optimization fixes: configured a 30-day persistence TTL cache, adjusted PHP execution limits for warmup, silenced background plugin loops, isolated database routines, deferred non-critical JS, and optimized above-the-fold hero rendering without downtime.",
    technologies: ["WordPress", "Hostinger", "Cache Warmup", "Server-Side TTL", "Database Optimization", "Core Web Vitals", "JS Deferred Loading", "PHP Server Tuning"],
    engineeringHighlights: [
      "Adjusted Hostinger/PHP server execution limits to prevent timeouts during cache warmup operations",
      "Configured 30-day persistence TTL and disabled aggressive blanket asset purge triggers",
      "Silenced redundant background loops running on every request and isolated unoptimized SQL routines",
      "Deferred non-critical JS assets and prioritized above-the-fold hero rendering to slash TBT by 98%"
    ],
    metricsResult: "LCP: 30.6s ➔ 1.1s (96% Faster)",
    githubUrl: "",
    liveUrl: "",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41551-large.mp4",
    architectureDiagramType: "performance-opt"
  },
  {
    id: "luxuryjewels",
    title: "Luxury Jewels (Cayman Islands)",
    subtitle: "Bespoke Jewelry E-Commerce & Showroom Platform",
    category: "International Client E-Commerce",
    problem: "International luxury jewelry brand in the Cayman Islands required a high-performance digital presence that mirrors physical showroom exclusivity, loads instantly across global regions, and routes high-value client inquiries securely.",
    solution: "Engineered a custom React showcase and e-commerce showroom for high-end clientele in the Cayman Islands with fluid visual galleries, direct client inquiry routing, headless CMS integration, and optimized global CDN asset delivery.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Headless CMS", "SEO Optimization", "Vercel Edge"],
    engineeringHighlights: [
      "Built for international retail client in the Cayman Islands (luxuryjewels.ky), optimized for global page loading speed",
      "Designed dynamic jewelry collections viewer with fluid transitions and custom catalog grid sorting",
      "Created direct customer inquiry routing channels for high-ticket custom product requests",
      "Configured custom domain DNS records, OpenGraph cards, and target region SEO index tags"
    ],
    metricsResult: "Cayman Islands Live Production Launch",
    githubUrl: "",
    liveUrl: "https://www.luxuryjewels.ky/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-a-project-41329-large.mp4",
    architectureDiagramType: "vite-agency"
  },
  {
    id: "gavenue",
    title: "GaVenue Agency Platform",
    subtitle: "48-Hour Rapid Agency Production Turnaround",
    category: "Agency Overflow & White-Label Delivery",
    problem: "Agency required a modernized digital presence built and deployed within a strict 48-hour deadline without compromising Lighthouse performance scores or responsive fidelity.",
    solution: "Built a sleek, component-driven web application using React, Vite, TypeScript, and Tailwind CSS with custom smooth scroll triggers and Vercel edge deployment.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Vercel Edge"],
    engineeringHighlights: [
      "Engineered full agency redesign from concept to live production deployment within 48 hours",
      "Achieved top Core Web Vitals score through asset lazy-loading & zero cumulative layout shift",
      "Created modular layout components ensuring clean code separation and future agency scalability"
    ],
    metricsResult: "Shipped to Production in 48 Hours",
    githubUrl: "https://github.com/Umesh2OP/gavenue-redesign-",
    liveUrl: "",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-person-working-on-a-laptop-in-a-modern-office-41331-large.mp4",
    architectureDiagramType: "vite-agency"
  },
  {
    id: "flavorcatalystz",
    title: "Flavor Catalystz",
    subtitle: "Headless WordPress, CRM Integration & SEO Engine",
    category: "Production Brand Platform",
    problem: "Growing brand needed a custom production web platform integrated with headless WordPress for content management and custom CRM APIs for lead acquisition.",
    solution: "Built and deployed a production web platform from scratch using React, headless WordPress REST API infrastructure, custom CRM API endpoints, and Core Web Vitals SEO optimization.",
    technologies: ["React", "Headless WordPress", "REST APIs", "CRM Integration", "Core Web Vitals", "SEO Optimization", "Hostinger", "Vercel"],
    engineeringHighlights: [
      "Engineered headless WordPress backend integration providing content team full CMS control without bloat",
      "Connected custom CRM APIs for automated lead routing and real-time form processing",
      "Structured technical SEO schema markup, metadata tags, and Core Web Vitals auditing",
      "Managed production hosting pipelines on Hostinger and Vercel"
    ],
    metricsResult: "Production Launch & SEO Growth",
    githubUrl: "",
    liveUrl: "",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41334-large.mp4",
    architectureDiagramType: "ai-pipeline"
  },
  {
    id: "quotaguard",
    title: "QuotaGuard",
    subtitle: "API Rate Limiter & Security Dashboard",
    category: "Infrastructure Security",
    problem: "Production APIs face DDoS threats, bot abuse, and unmonitored rate consumption without robust control layers.",
    solution: "Engineered a low-latency API rate-limiting system with Redis sliding-window algorithm, JWT security layer, real-time request logging, and interactive React monitoring dashboard.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Redis", "MongoDB", "Tailwind CSS", "Axios"],
    engineeringHighlights: [
      "Designed sliding-window counter algorithm with Redis achieving <5ms overhead per request",
      "Implemented JWT authentication with Axios response interceptors for automatic token refresh",
      "Constructed live metric analytics dashboard with real-time payload inspecting capabilities"
    ],
    metricsResult: "< 5ms Rate-Limiter Overhead",
    githubUrl: "https://github.com/Umesh2OP/rate-limiter-api",
    liveUrl: "https://github.com/Umesh2OP/rate-limiter-api-Frontend",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41328-large.mp4",
    architectureDiagramType: "rate-limiter"
  },
  {
    id: "toletglobe",
    title: "TO-Let Globe Platform",
    subtitle: "MERN Architecture Performance & Sub-Team Leadership",
    category: "Engineering & Team Leadership",
    problem: "Real estate platform experienced slow page load times and recurring frontend bugs across complex multi-step user flows.",
    solution: "Executed production MERN stack performance overhaul, reducing load times by 15–20% and production bugs by ~25% while leading a 6-person frontend sub-team.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Tailwind CSS", "Git"],
    engineeringHighlights: [
      "Executed production MERN stack performance optimization, driving a 15–20% reduction in page load times",
      "Led root-cause debugging initiatives, reducing recurring production frontend bugs by ~25%",
      "Served as Frontend Sub-Team Lead, coordinating sprint deliverables and code reviews for 6 developers"
    ],
    metricsResult: "15-20% Faster Load Times & -25% Bugs",
    githubUrl: "",
    liveUrl: "",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-working-on-a-code-in-a-computer-41549-large.mp4",
    architectureDiagramType: "vite-agency"
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-freelance-opt",
    role: "Freelance Performance & Systems Engineer",
    company: "US Real Estate Client",
    period: "Jun 2026 – Present",
    location: "Remote (US Client)",
    highlights: [
      "Diagnosed and resolved critical cold-load latency on Hostinger for a WordPress real estate platform, restoring Grade A performance (90%+).",
      "Re-engineered caching policies to use a 30-day persistence TTL and bypassed redundant background plugin loops running on every request.",
      "Optimized WordPress backend and PHP execution limits to handle heavy query warmup processes and isolated unoptimized database routines (reducing 3,100+ queries per build).",
      "Deferred non-critical JavaScript payloads and restructured DOM render priorities, slashing Total Blocking Time (TBT) from 10,810ms to 235ms (98% faster)."
    ],
    techStack: ["WordPress", "Hostinger", "PHP Server Tuning", "Cache Warmup", "MySQL", "Core Web Vitals", "Page Speed Optimization"]
  },
  {
    id: "exp-1",
    role: "Full Stack Web Developer Intern",
    company: "Flavor Catalystz",
    period: "Dec 2025 – May 2026",
    location: "Remote / Hybrid",
    highlights: [
      "Built and deployed a production company website from scratch using React and modern CSS architecture.",
      "Integrated custom CRM APIs and built a headless WordPress REST API infrastructure for dynamic content delivery.",
      "Optimized Core Web Vitals, site accessibility, and SEO structure, improving organic search visibility.",
      "Managed production hosting and CI/CD deployment pipelines on Hostinger and Vercel."
    ],
    techStack: ["React", "JavaScript", "REST APIs", "Headless WordPress", "SEO", "Hostinger", "Vercel"]
  },
  {
    id: "exp-2",
    role: "Full Stack Developer Intern (Frontend Lead)",
    company: "TO-Let Globe",
    period: "Aug – Nov 2025",
    location: "Remote",
    highlights: [
      "Executed production MERN stack performance optimization, driving a 15–20% reduction in page load times.",
      "Led root-cause debugging initiatives, reducing recurring production frontend bugs by ~25%.",
      "Served as Frontend Sub-Team Lead, coordinating sprint deliverables and code reviews for a 6-person developer team.",
      "Refactored legacy state management into predictable, type-safe reusable UI components."
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Redux", "Tailwind CSS", "Git"]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "srv-1",
    category: "For Agencies & Startups",
    title: "White-Label & Custom Web Development",
    description: "Pixel-perfect Figma-to-Code builds, custom Next.js/React applications, and white-label development for digital agencies and fast-scaling startups.",
    capabilities: [
      "Figma to Next.js / React Pixel-Perfect Builds",
      "White-Label Client Site Development & Git Handoffs",
      "Responsive & Micro-Animated Interfaces",
      "On-Time Delivery & Reliable Communication"
    ],
    iconName: "Layout"
  },
  {
    id: "srv-2",
    category: "For E-Commerce & Businesses",
    title: "Headless CMS, E-Commerce & SEO Systems",
    description: "High-converting web platforms built with Headless WordPress, Shopify, or custom APIs — structured for lightning speed and top Google search rankings.",
    capabilities: [
      "Headless WordPress & Custom CMS Architectures",
      "Luxury Showroom & E-Commerce Web Apps",
      "Technical SEO Audit & Schema Markup",
      "CRM & Third-Party API Integrations"
    ],
    iconName: "Server"
  },
  {
    id: "srv-3",
    category: "Performance & Engineering",
    title: "Core Web Vitals Audit & Speed Overhauls",
    description: "Rescuing slow websites and APIs. Fixing server bottlenecks, long LCP times, memory leaks, and inefficient database queries.",
    capabilities: [
      "90%+ Google Lighthouse & Core Web Vitals Fixes",
      "Hostinger, Vercel & Node.js Server Tuning",
      "Redis In-Memory Caching & Rate Limiting",
      "Database Query & Cache Warmup Optimization"
    ],
    iconName: "Cpu"
  }
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "client-layer",
    name: "Client SPA / Edge CDN",
    type: "client",
    status: "active",
    latency: "12ms",
    tech: "React 18 · Vite · Vercel Edge",
    details: "Handles UI hydration, client-side route caching, and optimistic state updates with zero layout shift."
  },
  {
    id: "gateway-layer",
    name: "API Gateway & Auth",
    type: "gateway",
    status: "active",
    latency: "<3ms",
    tech: "Node.js · Express · JWT Interceptor",
    details: "Evaluates incoming request headers, validates bearer tokens, and routes traffic safely to microservices."
  },
  {
    id: "ratelimit-layer",
    name: "Redis Rate Limiter",
    type: "cache",
    status: "optimized",
    latency: "<4ms",
    tech: "Redis In-Memory Key Store",
    details: "Sliding-window token bucket algorithm verifying request rates before hitting backend application logic."
  },
  {
    id: "service-layer",
    name: "Application Microservices",
    type: "service",
    status: "active",
    latency: "18ms",
    tech: "Node.js / FastAPI AI Worker",
    details: "Executes business logic, AI stream processing, and payload transformations with asynchronous workers."
  },
  {
    id: "db-layer",
    name: "MongoDB / Storage",
    type: "database",
    status: "synced",
    latency: "8ms",
    tech: "MongoDB Atlas · Indexed Collections",
    details: "Document store with optimized compound indexing ensuring fast query lookup times under heavy write load."
  }
];

export const PHILOSOPHY_STAGES = [
  {
    step: "01",
    title: "Understand",
    sub: "Business & Client Scope",
    desc: "Every project begins with absolute clarity on client goals, deadline boundaries, brand vision, and performance targets.",
    codeSnippet: `// Step 1: Requirements & Client SLA Matrix
const ProjectScope = {
  maxTargetLCP: '1.2s',
  designFidelity: '100% Figma Pixel-Perfect',
  deliveryBuffer: 'Zero-Delay Handoff'
};`
  },
  {
    step: "02",
    title: "Architect",
    sub: "Design-System & API Contract",
    desc: "Structuring clean component hierarchies, state flows, headless CMS connections, and API security before writing code.",
    codeSnippet: `// Step 2: Architecture & Contract Definition
interface AgencyDeliverable {
  framework: 'Next.js / React',
  styling: 'Tailwind CSS + CSS Modules',
  cmsIntegration: 'Headless WP / REST'
};`
  },
  {
    step: "03",
    title: "Engineer",
    sub: "Full-Stack Development",
    desc: "Building clean, maintainable React interfaces, robust Node.js backends, smooth micro-animations, and responsive layouts.",
    codeSnippet: `// Step 3: Production Build & Component Engineering
async function renderClientApp(props) {
  const data = await fetchHeadlessData();
  return <ClientShowroom data={data} />;
}`
  },
  {
    step: "04",
    title: "Deliver & Optimize",
    sub: "Core Web Vitals & Launch",
    desc: "Audit Core Web Vitals, optimize image pipelines, verify SEO schema markup, and hand off production code smoothly.",
    codeSnippet: `// Step 4: Core Web Vitals Verification
const performanceMetrics = {
  LCP: '1.1s', // Largest Contentful Paint
  FID: '12ms', // First Input Delay
  CLS: '0.00'  // Cumulative Layout Shift
};`
  }
];
