import { MetricItem, ProjectItem, ExperienceItem, ServiceItem, ArchitectureNode } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Umesh",
  title: "Software Engineer · Full Stack · Systems",
  tagline: "I build software that works beyond the interface.",
  bio: "Full Stack Developer with experience engineering production web applications, high-throughput APIs, and scalable web platforms using React, Next.js, Node.js, and Redis. Focused on clear system architecture, low latency overhead, Core Web Vitals optimization, and robust engineering.",
  status: "Available for SDE Roles & Client Engineering",
  github: "https://github.com/Umesh2OP",
  linkedin: "https://linkedin.com/in/umesh-maniyar", // Keep clean default or personal linkedin URL if available
  email: "maniyarumesh9@gmail.com",
};

export const METRICS_DATA: MetricItem[] = [
  {
    id: "m1",
    value: "< 5ms",
    label: "Rate-Limiter Overhead",
    description: "Redis sliding-window rate limiting execution overhead in QuotaGuard middleware.",
    badge: "API System Performance",
    iconName: "Zap"
  },
  {
    id: "m2",
    value: "15–20%",
    label: "Load-Time Reduction",
    description: "MERN bundle size, image pipeline, and code-splitting optimization at TO-Let Globe.",
    badge: "Core Web Vitals",
    iconName: "TrendingUp"
  },
  {
    id: "m3",
    value: "~25%",
    label: "Bug Count Reduction",
    description: "Reduction in recurring production frontend issues through type-safe modular refactoring.",
    badge: "System Stability",
    iconName: "ShieldCheck"
  },
  {
    id: "m4",
    value: "~30%",
    label: "Redundant Call Reduction",
    description: "Eliminated duplicated API calls via normalized Redux state management & request memoization.",
    badge: "State Optimization",
    iconName: "Cpu"
  },
  {
    id: "m5",
    value: "48 Hours",
    label: "Agency Site Delivery",
    description: "Turnaround time for production-ready, animation-rich GaVenue agency platform redesign.",
    badge: "Velocity & Shipping",
    iconName: "Clock"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "realestate-opt",
    title: "US Real Estate Platform",
    subtitle: "Production Speed & Warmup Architecture Optimization",
    category: "Performance & Systems Engineering",
    problem: "A WordPress real estate platform taking over 19 seconds to load on cold visits (Grade F / ~20% performance score) with 10,800ms of Total Blocking Time (TBT) due to background plugin installer loops, aggressive 30-minute cache purges, and 3,100+ database queries firing per cold page build, directly hurting lead conversions.",
    solution: "Diagnosed and engineered optimization fixes: configured a 30-day persistence TTL cache, adjusted server execution limits for warmup, silenced background plugin installer loops, isolated database queries, deferred non-critical JavaScript, and optimized above-the-fold hero rendering without risking live data or causing downtime on Hostinger.",
    technologies: ["WordPress", "Hostinger", "Cache Warmup", "Server-Side TTL", "Database Optimization", "Core Web Vitals", "JavaScript Deferred Loading", "PHP Server Tuning"],
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
    id: "quotaguard",
    title: "QuotaGuard",
    subtitle: "API Rate Limiter & Security Dashboard",
    category: "Infrastructure & Security",
    problem: "APIs face abuse, DDoS vulnerability, and unmonitored quota consumption without rate control.",
    solution: "Engineered a low-latency API rate-limiting system with Redis sliding-window algorithm, JWT security layer, real-time request logging, and interactive React monitoring dashboard.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Redis", "MongoDB", "Tailwind CSS", "Axios"],
    engineeringHighlights: [
      "Designed sliding-window counter algorithm with Redis achieving <5ms overhead per request",
      "Implemented JWT authentication with Axios response interceptors for automatic token refresh",
      "Constructed live metric analytics dashboard with real-time payload inspecting capabilities",
      "Structured decoupled Node.js microservice architecture with graceful fallback during cache missed"
    ],
    metricsResult: "< 5ms Rate-Limiter Overhead",
    githubUrl: "https://github.com/Umesh2OP/rate-limiter-api",
    liveUrl: "https://github.com/Umesh2OP/rate-limiter-api-Frontend",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41328-large.mp4",
    architectureDiagramType: "rate-limiter"
  },
  {
    id: "blogverse",
    title: "BlogVerse",
    subtitle: "AI-Powered High-Throughput Content Platform",
    category: "AI & Distributed Systems",
    problem: "Content generation platforms suffer from redundant LLM API calls, slow response times, and poor perceived performance.",
    solution: "Architected a full-stack platform integrating LLaMA3 / Groq LLMs via FastAPI backend, with client-side Redux Toolkit state caching and Appwrite authentication.",
    technologies: ["React", "FastAPI", "Appwrite", "Redux Toolkit", "Groq / LLaMA3", "Framer Motion", "Tailwind CSS"],
    engineeringHighlights: [
      "Integrated Groq / LLaMA3 inference endpoint for sub-second AI content generation",
      "Reduced redundant API fetch requests by ~30% through Redux Toolkit slice memoization",
      "Engineered optimistic UI updates with Framer Motion transitions for near-instant interaction response",
      "Designed clean REST contract between Python FastAPI AI workers and React SPA client"
    ],
    metricsResult: "~30% Reduction in Redundant API Requests",
    githubUrl: "https://github.com/Umesh2OP/Ai-Blogsite",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41334-large.mp4",
    architectureDiagramType: "ai-pipeline"
  },
  {
    id: "gavenue",
    title: "GaVenue",
    subtitle: "High-Performance Agency Digital Platform",
    category: "Web Engineering & Design",
    problem: "Agency required a modernized digital presence built and deployed within strict tight deadlines without compromising lighthouse speed.",
    solution: "Built a sleek, component-driven web application using React, Vite, TypeScript, and Tailwind CSS with custom smooth scroll triggers and Vercel edge deployment.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
    engineeringHighlights: [
      "Engineered full site redesign from concept to production deployment within 48 hours",
      "Achieved top Core Web Vitals score through asset lazy-loading & zero cumulative layout shift",
      "Created modular layout components ensuring clean code separation and future scalability"
    ],
    metricsResult: "Shipped to Production in 48 Hours",
    githubUrl: "https://github.com/Umesh2OP/gavenue-redesign-",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-person-working-on-a-laptop-in-a-modern-office-41331-large.mp4",
    architectureDiagramType: "vite-agency"
  },
  {
    id: "slotswapper",
    title: "SlotSwapper",
    subtitle: "Dynamic P2P Calendar Slot Exchange Engine",
    category: "System Integration & Scheduling",
    problem: "Traditional calendar calendars are rigid, preventing users from swapping time slots directly without double-booking or admin overhead.",
    solution: "Engineered a peer-to-peer appointment slot trading platform with MongoDB concurrency locks, a Node.js negotiation handler, and a clean TypeScript React calendar interface.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT Auth"],
    engineeringHighlights: [
      "Designed scheduling negotiation backend state-machine preventing double-booking slots",
      "Constructed custom calendar grid UI with responsive time-slot selection layouts",
      "Structured clean backend API boundaries with RESTful request/response validations"
    ],
    metricsResult: "Zero Scheduling Overlaps",
    githubUrl: "https://github.com/Umesh2OP/SlotSwapper-Backend.",
    liveUrl: "https://github.com/Umesh2OP/SlotSwapper-Frontend",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-working-on-a-code-in-a-computer-41549-large.mp4",
    architectureDiagramType: "vite-agency"
  },
  {
    id: "luxuryjewels",
    title: "Luxury Jewels",
    subtitle: "Bespoke Jewelry E-Commerce & Showroom",
    category: "E-Commerce & Digital Branding",
    problem: "Bespoke luxury brands need a high-performance digital presence that mirrors physical showroom exclusivity, loads instantly, and handles international client inquiries securely.",
    solution: "Engineered a custom React showcase and e-commerce showroom for high-end clientele in the Cayman Islands with fluid visual galleries, direct inquiry routing, and headless CMS capabilities.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
    engineeringHighlights: [
      "Built for international retail client in the Cayman Islands, optimized for global page loading speed",
      "Designed dynamic jewelry collections viewer with fluid transitions and custom catalog grid sorting",
      "Created direct customer inquiry routing channels for custom bespoke product requests",
      "Configured custom domain DNS records and optimized SEO index tags for target region visibility"
    ],
    metricsResult: "Cayman Islands Client Launch",
    githubUrl: "",
    liveUrl: "https://www.luxuryjewels.ky/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-a-project-41329-large.mp4",
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
    category: "Product Engineering",
    title: "Custom Web Apps & SaaS Dashboards",
    description: "End-to-end full-stack software development built for speed, performance, and search engine optimization (SEO). Tailored for startups using React, Next.js, and Node.js.",
    capabilities: [
      "Single Page Applications & Next.js Platforms",
      "SEO-Optimized Architectures & Core Web Vitals Optimization",
      "Real-time Telemetry & Data Dashboards",
      "Type-safe Frontend & Component Design Systems"
    ],
    iconName: "Layout"
  },
  {
    id: "srv-2",
    category: "Business Systems",
    title: "E-Commerce, Booking & Integration Platforms",
    description: "Turn business processes into high-performance web platforms. Structured with SEO-friendly headless architectures, fast payment gateways, and automated sync.",
    capabilities: [
      "Custom E-Commerce & Service Booking Engines",
      "SEO-Friendly Static Site Generation & Headless CMS",
      "CRM & Third-Party API Integrations",
      "Automated Business Data Pipelines"
    ],
    iconName: "Server"
  },
  {
    id: "srv-3",
    category: "Core Engineering",
    title: "API Architecture & Performance Optimization",
    description: "Deep technical engineering for existing applications suffering from latency, memory bloat, poor core web vitals, or unoptimized search visibility.",
    capabilities: [
      "RESTful API Design & JWT Auth Middleware",
      "Redis Caching & Token Bucket Rate-Limiting",
      "Core Web Vitals Audit & 15-30% Speed Boost",
      "Technical SEO Audits & Performance Tuning"
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
    sub: "Business & System Constraints",
    desc: "Every system starts with clarity on real business goals, user loads, performance SLAs, and data access patterns.",
    codeSnippet: `// Step 1: Requirements & Constraints Matrix
const Constraints = {
  maxAcceptableLatency: '50ms',
  targetAvailability: '99.9%',
  primaryBottleneck: 'Uncached API Endpoints'
};`
  },
  {
    step: "02",
    title: "Architect",
    sub: "API & Data Flow Design",
    desc: "Designing clear API contracts, decoupled service boundaries, caching strategies, and state flow before writing lines of code.",
    codeSnippet: `// Step 2: System Boundary Definition
interface RateLimiterRule {
  windowMs: 60 * 1000,
  maxRequests: 100,
  storageEngine: 'RedisCluster'
};`
  },
  {
    step: "03",
    title: "Engineer",
    sub: "Full-Stack Implementation",
    desc: "Building clean, type-safe React interfaces, robust Node.js backend logic, secure JWT authentication, and resilient DB operations.",
    codeSnippet: `// Step 3: Low-Overhead Middleware
async function rateLimitMiddleware(req, res, next) {
  const currentCount = await redis.incr(req.ip);
  if (currentCount > MAX_LIMIT) return res.status(429).json({ error: 'Quota Exceeded' });
  next();
}`
  },
  {
    step: "04",
    title: "Optimize",
    sub: "Performance & Reliability",
    desc: "Profiling bundle sizes, measuring Core Web Vitals, eliminating redundant network calls, and performing root-cause bug isolation.",
    codeSnippet: `// Step 4: Core Web Vitals Verification
const performanceMetrics = {
  LCP: '1.1s', // Largest Contentful Paint
  FID: '12ms', // First Input Delay
  CLS: '0.00'  // Cumulative Layout Shift
};`
  }
];
