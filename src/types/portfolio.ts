export interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  engineeringHighlights: string[];
  metricsResult?: string;
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  architectureDiagramType: 'rate-limiter' | 'ai-pipeline' | 'vite-agency' | 'performance-opt';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
  techStack: string[];
}

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  capabilities: string[];
  iconName: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: 'client' | 'gateway' | 'service' | 'cache' | 'database';
  status: 'active' | 'synced' | 'optimized';
  latency: string;
  tech: string;
  details: string;
}
