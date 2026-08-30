import React, { useState, useEffect } from 'react';
import { Layout, ShieldCheck, Zap, Cpu, Database, Wifi, Battery } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface TelemetryData {
  requests: string;
  latency: string;
  status: string;
  mode: string;
  details: string;
}

const nodeTelemetry: Record<string, TelemetryData> = {
  default: {
    requests: '1,284 / S',
    latency: '24ms',
    status: 'HEALTHY',
    mode: 'SYSTEM MONITOR',
    details: 'Simulating request streams. Hover over any node to inspect telemetry.',
  },
  client: {
    requests: '420 / S',
    latency: '12ms',
    status: 'ONLINE',
    mode: 'BROWSER HYDRATION',
    details: 'Vite React SPA loaded. Client-side route caching & asset hydration active.',
  },
  gateway: {
    requests: '1,284 / S',
    latency: '< 2ms',
    status: 'SECURE',
    mode: 'AUTH VALIDATION',
    details: 'Validating bearer JWT headers. Routing traffic to backend services.',
  },
  redis: {
    requests: '1,284 / S',
    latency: '< 1ms',
    status: 'OPTIMIZED',
    mode: 'SLIDING WINDOW',
    details: 'Redis Counter checking rate limits with multi/exec sliding-window.',
  },
  worker: {
    requests: '864 / S',
    latency: '14ms',
    status: 'COMPUTING',
    mode: 'ASYNC PIPELINE',
    details: 'Node.js async controllers running computations and AI pipeline workers.',
  },
  postgres: {
    requests: '640 / S',
    latency: '6ms',
    status: 'SYNCED',
    mode: 'PERSISTENCE',
    details: 'PostgreSQL DB executing index query lookups & state synchronization.',
  },
};

export const HeroSystemDashboard: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerHeight = isMobile ? 'h-[300px]' : 'h-[380px] lg:h-[420px]';

  const activeTelemetry = nodeTelemetry[hoveredNode || 'default'];

  return (
    <div className="relative p-3.5 pb-5 bg-white border border-line-strong shadow-[0_28px_64px_rgba(31,26,18,0.12)] select-none rounded-xl">
      <style>{`
        @keyframes sparkMove {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
        .animate-spark {
          animation: sparkMove 3s infinite linear;
        }
      `}</style>

      {/* Absolute gold overlay border matching design language */}
      <div className="absolute inset-[7px] bottom-[26px] border border-orange/40 pointer-events-none z-10" />

      {/* Schematic Grid Container */}
      <div className={`relative w-full ${containerHeight} bg-[#FDFBF8] overflow-hidden border border-line-strong bg-grid-pattern`}>
        
        {/* Top Indicators */}
        <div className="absolute top-2 left-2 px-2.5 py-1 bg-white/95 backdrop-blur-sm border border-line-strong rounded z-20 flex items-center gap-1.5 font-mono text-[9px] text-ink shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span>SYSTEM: ONLINE</span>
        </div>

        <div className="absolute top-2 right-2 px-2.5 py-1 bg-white/95 backdrop-blur-sm border border-line-strong rounded z-20 flex items-center gap-1 font-mono text-[9px] text-ink-soft shadow-sm">
          <span>LIVE TELEMETRY</span>
        </div>

        {/* ================= SVG CONNECTIONS & ANIME SPARKS ================= */}
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9C7A2E" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#5C2A2E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3F5C3F" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            {/* Client -> Gateway */}
            <path d="M 70 120 H 170" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Gateway -> Redis (Upwards curve) */}
            <path d="M 170 120 C 200 120, 200 55, 250 55" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Gateway -> Worker (Downwards curve) */}
            <path d="M 170 120 C 200 120, 200 185, 250 185" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Redis -> DB */}
            <path d="M 250 55 C 300 55, 300 120, 430 120" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Worker -> DB */}
            <path d="M 250 185 C 300 185, 300 120, 430 120" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>

          {/* Glowing Animated Spark Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Spark 1: Client -> Gateway */}
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_6px_#9C7A2E]" 
              style={{
                offsetPath: "path('M 70 120 H 170')",
                animation: "sparkMove 2.2s infinite linear",
              }}
            />
            {/* Spark 2: Gateway -> Redis */}
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-purple shadow-[0_0_6px_#5C2A2E]" 
              style={{
                offsetPath: "path('M 170 120 C 200 120, 200 55, 250 55')",
                animation: "sparkMove 2.6s infinite linear 0.4s",
              }}
            />
            {/* Spark 3: Gateway -> Worker */}
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_6px_#3F5C3F]" 
              style={{
                offsetPath: "path('M 170 120 C 200 120, 200 185, 250 185')",
                animation: "sparkMove 2.8s infinite linear 0.8s",
              }}
            />
            {/* Spark 4: Redis -> DB */}
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_6px_#9C7A2E]" 
              style={{
                offsetPath: "path('M 250 55 C 300 55, 300 120, 430 120')",
                animation: "sparkMove 3s infinite linear 1.2s",
              }}
            />
            {/* Spark 5: Worker -> DB */}
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_6px_#3F5C3F]" 
              style={{
                offsetPath: "path('M 250 185 C 300 185, 300 120, 430 120')",
                animation: "sparkMove 3.2s infinite linear 1.6s",
              }}
            />
          </div>
        </div>

        {/* ================= DYNAMIC FLOW INTERACTIVE NODES ================= */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          
          {/* Node 1: Client */}
          <div 
            onMouseEnter={() => setHoveredNode('client')}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto cursor-pointer"
            style={{ left: "14%", top: "50%" }}
          >
            <div className={`w-8 h-8 rounded-full bg-[#09090b] border ${hoveredNode === 'client' ? 'border-orange scale-110 shadow-[0_0_10px_rgba(156,122,46,0.3)]' : 'border-neutral-800'} flex items-center justify-center text-white transition-all duration-300 shadow-md relative`}>
              <Layout className="w-4 h-4 text-orange" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <span className="mt-1 text-[7px] font-bold font-mono tracking-wider text-ink uppercase">Client SPA</span>
          </div>

          {/* Node 2: Gateway */}
          <div 
            onMouseEnter={() => setHoveredNode('gateway')}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto cursor-pointer"
            style={{ left: "34%", top: "50%" }}
          >
            <div className={`w-8 h-8 rounded-full bg-[#09090b] border ${hoveredNode === 'gateway' ? 'border-green-500 scale-110 shadow-[0_0_10px_rgba(63,92,63,0.3)]' : 'border-neutral-800'} flex items-center justify-center text-white transition-all duration-300 shadow-md relative`}>
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <span className="mt-1 text-[7px] font-bold font-mono tracking-wider text-ink uppercase">API Gateway</span>
          </div>

          {/* Node 3: Redis */}
          <div 
            onMouseEnter={() => setHoveredNode('redis')}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto cursor-pointer"
            style={{ left: "50%", top: "23%" }}
          >
            <div className={`w-8 h-8 rounded-full bg-[#09090b] border ${hoveredNode === 'redis' ? 'border-purple scale-110 shadow-[0_0_10px_rgba(92,42,46,0.3)]' : 'border-neutral-800'} flex items-center justify-center text-white transition-all duration-300 shadow-md relative`}>
              <Zap className="w-4 h-4 text-purple" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <span className="mt-1 text-[7px] font-bold font-mono tracking-wider text-ink uppercase">Redis Cache</span>
          </div>

          {/* Node 4: Worker */}
          <div 
            onMouseEnter={() => setHoveredNode('worker')}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto cursor-pointer"
            style={{ left: "50%", top: "77%" }}
          >
            <div className={`w-8 h-8 rounded-full bg-[#09090b] border ${hoveredNode === 'worker' ? 'border-orange scale-110 shadow-[0_0_10px_rgba(156,122,46,0.3)]' : 'border-neutral-800'} flex items-center justify-center text-white transition-all duration-300 shadow-md relative`}>
              <Cpu className="w-4 h-4 text-orange" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <span className="mt-1 text-[7px] font-bold font-mono tracking-wider text-ink uppercase">Worker App</span>
          </div>

          {/* Node 5: Postgres */}
          <div 
            onMouseEnter={() => setHoveredNode('postgres')}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto cursor-pointer"
            style={{ left: "86%", top: "50%" }}
          >
            <div className={`w-8 h-8 rounded-full bg-[#09090b] border ${hoveredNode === 'postgres' ? 'border-green-500 scale-110 shadow-[0_0_10px_rgba(63,92,63,0.3)]' : 'border-neutral-800'} flex items-center justify-center text-white transition-all duration-300 shadow-md relative`}>
              <Database className="w-4 h-4 text-green-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <span className="mt-1 text-[7px] font-bold font-mono tracking-wider text-ink uppercase">Postgres DB</span>
          </div>

        </div>

        {/* Bottom Detailed Description Text Overlay inside Frame */}
        <div className="absolute bottom-[38px] left-2 right-2 px-3 py-1 bg-white/90 border border-line-strong rounded z-20 font-mono text-[7.5px] text-neutral-500 transition-all duration-200">
          <span className="text-orange font-bold uppercase mr-1 select-none">DETAILS:</span>
          <span>{activeTelemetry.details}</span>
        </div>

        {/* Bottom Technical Stats Overlay inside Frame */}
        <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-line-strong rounded z-20 flex justify-between items-center font-mono text-[8px] sm:text-[9px] text-ink shadow-sm">
          <div className="flex gap-4">
            <div>
              <span className="text-ink-soft block text-[7px] uppercase tracking-wider font-semibold">REQUESTS</span>
              <span className="font-bold">{activeTelemetry.requests}</span>
            </div>
            <div>
              <span className="text-ink-soft block text-[7px] uppercase tracking-wider font-semibold">LATENCY</span>
              <span className="font-bold text-green-600">{activeTelemetry.latency}</span>
            </div>
            <div>
              <span className="text-ink-soft block text-[7px] uppercase tracking-wider font-semibold">STATUS</span>
              <span className="font-bold text-green-600">{activeTelemetry.status}</span>
            </div>
          </div>
          <div className="text-right border-l border-line-strong pl-3">
            <span className="text-ink-soft block text-[7px] uppercase tracking-wider font-semibold">MODE</span>
            <span className="font-bold uppercase text-orange">{activeTelemetry.mode}</span>
          </div>
        </div>

      </div>

      {/* Polaroid Style Caption */}
      <div className="mt-2.5 flex items-center justify-between font-sans text-[9px] font-semibold tracking-wider text-ink-soft">
        <span>PLATE 01. SOFTWARE ARCHITECTURE</span>
        <span>{PERSONAL_INFO.name.toUpperCase()} STUDIO © 2026</span>
      </div>
    </div>
  );
};
