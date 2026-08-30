import React, { useState } from 'react';
import { ProjectItem } from '../types/portfolio';
import { ArrowUpRight, Terminal, CheckCircle2, Zap } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'architecture'>('highlights');

  return (
    <div className="rounded-2xl border border-line-strong bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-orange/30">
      
      {/* Top Card Header Bar */}
      <div className="bg-cream-dim/20 px-6 py-4 border-b border-line flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-orange bg-orange-soft/40 px-3 py-1 rounded-full border border-orange-soft/75 uppercase tracking-wider">
            Case Study #{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-ink-soft select-none">
            {project.category}
          </span>
        </div>

        {project.metricsResult && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-soft/50 border border-green-soft/75 text-xs font-bold text-green">
            <Zap className="w-3.5 h-3.5" />
            <span>{project.metricsResult}</span>
          </div>
        )}
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Project Overview & Engineering Details */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-ink tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm font-semibold text-orange mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Problem & Solution Block */}
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-cream-dim/10 border border-line">
              <span className="text-ink-soft uppercase font-bold tracking-wider block mb-1">
                [The Problem]
              </span>
              <p className="text-ink-soft font-medium leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-line-strong">
              <span className="text-green uppercase font-bold tracking-wider block mb-1">
                [System Solution]
              </span>
              <p className="text-ink font-medium leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Interactive Case Study Content Tabs */}
          <div>
            <div className="flex border-b border-line mb-4 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('highlights')}
                className={`pb-2 pr-4 transition-colors ${
                  activeTab === 'highlights'
                    ? 'text-orange border-b-2 border-orange'
                    : 'text-ink-soft hover:text-orange'
                }`}
              >
                Engineering Highlights
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`pb-2 px-4 transition-colors ${
                  activeTab === 'architecture'
                    ? 'text-orange border-b-2 border-orange'
                    : 'text-ink-soft hover:text-orange'
                }`}
              >
                Architecture & Logic Flow
              </button>
            </div>

            {activeTab === 'highlights' ? (
              <ul className="space-y-2.5">
                {project.engineeringHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 rounded-xl bg-ink border border-line-strong font-mono text-xs text-orange-soft">
                {project.architectureDiagramType === 'rate-limiter' && (
                  <div className="space-y-2 text-[11px]">
                    <div className="text-ink-soft mb-2">// QuotaGuard Architecture Topology</div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded">
                      1. Client HTTP Request ➔ Axios Interceptor (Inject Bearer JWT)
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded text-green-soft">
                      2. Express Middleware ➔ Redis Multi/Exec Sliding-Window Check (&lt;5ms)
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded">
                      3. Allow Request ➔ Node.js API ➔ MongoDB Logs & Quota Counters
                    </div>
                  </div>
                )}

                {project.architectureDiagramType === 'ai-pipeline' && (
                  <div className="space-y-2 text-[11px]">
                    <div className="text-ink-soft mb-2">// BlogVerse AI Stream Pipeline</div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded">
                      1. React Component ➔ Redux Slice Memoization Check (~30% hit)
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded text-purple-soft">
                      2. Miss ➔ FastAPI Async Worker ➔ Groq / LLaMA3 Endpoint
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded">
                      3. Streamed Token Response ➔ Optimistic UI Render (Zero Jank)
                    </div>
                  </div>
                )}

                {project.architectureDiagramType === 'vite-agency' && (
                  <div className="space-y-2 text-[11px]">
                    <div className="text-ink-soft mb-2">// GaVenue High-Performance Web Engine</div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded">
                      1. Vite Module Bundler ➔ Code Splitting & Dynamic Asset Chunking
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded text-orange">
                      2. Framer Motion Scroll Triggers ➔ GPU-Accelerated Hardware Transitions
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded">
                      3. Vercel Global Edge CDN ➔ Sub-second TTFB & High Core Web Vitals
                    </div>
                  </div>
                )}

                {project.architectureDiagramType === 'performance-opt' && (
                  <div className="space-y-2 text-[11px]">
                    <div className="text-ink-soft mb-2">// WordPress / Hostinger Cache Warmup Pipeline</div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded">
                      1. Client Browser Request ➔ Deferred JS & Prioritized Hero Render Paint
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded text-orange">
                      2. Hostinger Cache Warmup ➔ 30-Day Persistence TTL (Prevents Timeout Loops)
                    </div>
                    <div className="p-2.5 bg-ink border border-line-strong rounded text-green-soft">
                      3. WP MySQL Database ➔ Optimized Query Routines (3,100+ DB Calls Silenced)
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tech Stack Tags */}
          <div>
            <span className="text-[10px] font-bold text-ink-soft block mb-2 uppercase tracking-wider">
              [Technologies Utilized]
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1.5 text-xs font-bold rounded bg-cream-dim/35 border border-line-strong text-ink hover:border-orange/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Architecture Blueprint Representation */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-cream-dim/15 border border-line p-6 font-sans">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-purple border-b border-line pb-2 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-orange" />
                System Blueprint
              </span>
              <span className="text-green">Verified</span>
            </div>

            {/* Micro Flow Visual */}
            <div className="space-y-3 my-6">
              {project.architectureDiagramType === 'performance-opt' ? (
                <>
                  <div className="p-3.5 rounded-xl bg-white border border-line-strong flex items-center justify-between text-xs font-semibold text-ink-soft">
                    <span>Client UI Paint</span>
                    <span className="text-orange">Deferred JS / Hero Render</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-orange text-xs font-bold">↓ Optimized Cache</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-line-strong flex items-center justify-between text-xs font-semibold text-ink-soft">
                    <span>Server Cache Layer</span>
                    <span className="text-purple">30-Day TTL (Hostinger)</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-purple text-xs font-bold">↓ Isolated Routines</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-line-strong flex items-center justify-between text-xs font-semibold text-ink-soft">
                    <span>Database Engine</span>
                    <span className="text-green">MySQL (3,100+ DB Queries)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-white border border-line-strong flex items-center justify-between text-xs font-semibold text-ink-soft">
                    <span>Client Interface</span>
                    <span className="text-orange">SPA / React</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-orange text-xs font-bold">↓ API Contract</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-line-strong flex items-center justify-between text-xs font-semibold text-ink-soft">
                    <span>System Backend</span>
                    <span className="text-purple">Express / FastAPI</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-purple text-xs font-bold">↓ Data & Cache</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-line-strong flex items-center justify-between text-xs font-semibold text-ink-soft">
                    <span>Persistence Layer</span>
                    <span className="text-green">Redis / MongoDB</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-line text-xs font-semibold flex flex-wrap items-center justify-between gap-4">
            <span className="text-ink-soft">Links & Resources:</span>
            <div className="flex items-center gap-4 select-text">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:text-orange hover:underline flex items-center gap-0.5"
                >
                  <span>Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange hover:text-orange/80 hover:underline flex items-center gap-0.5"
                >
                  <span>
                    {project.id === 'quotaguard' || project.id === 'slotswapper'
                      ? 'Frontend Repo'
                      : 'Live Demo'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {!project.githubUrl && !project.liveUrl && (
                <span className="text-ink-soft/50 flex items-center gap-0.5 select-none">
                  <span>Code Private</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
