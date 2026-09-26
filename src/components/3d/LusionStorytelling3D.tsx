import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Globe, ArrowRight, RotateCcw } from 'lucide-react';

interface StoryNode {
  id: string;
  step: string;
  title: string;
  category: string;
  position: [number, number, number];
  color: string;
  icon: typeof Zap;
  summary: string;
  metric: string;
  details: string[];
}

const STORY_NODES: StoryNode[] = [
  {
    id: 'gateway',
    step: '01',
    title: 'API Gateway & JWT Auth',
    category: 'Edge Security',
    position: [-2.6, 1.4, 1.2],
    color: '#9C7A2E',
    icon: ShieldCheck,
    summary: 'Evaluates incoming HTTP requests, injects Bearer tokens, and enforces security boundaries.',
    metric: '< 3ms Latency',
    details: [
      'Axios bearer token interceptors with automatic refresh routines',
      'Decoupled Express middleware architecture with graceful error handling',
      'Zero-downtime payload validation & REST contract isolation',
    ],
  },
  {
    id: 'ratelimiter',
    step: '02',
    title: 'Redis Rate Limiter',
    category: 'Traffic Control',
    position: [2.8, 1.6, -1.0],
    color: '#3F5C3F',
    icon: Zap,
    summary: 'Sliding-window token bucket algorithm protecting endpoints from DDoS & quota abuse.',
    metric: '< 5ms Overhead',
    details: [
      'Redis Multi/Exec sliding-window counter execution in <5ms',
      'Automatic IP & client token key expiry with 60-second windows',
      'Live metric dashboard telemetry inspecting traffic surges',
    ],
  },
  {
    id: 'aipipeline',
    step: '03',
    title: 'AI Stream Engine',
    category: 'Async Inference',
    position: [-2.2, -1.8, 1.6],
    color: '#5C2A2E',
    icon: Cpu,
    summary: 'FastAPI async workers streaming sub-second LLaMA3 / Groq LLM inference tokens.',
    metric: '~30% Fewer API Calls',
    details: [
      'Groq / LLaMA3 sub-second stream token generation',
      'Client-side Redux Toolkit slice memoization cache preventing duplicate hits',
      'Optimistic UI rendering with zero frame drop or jank',
    ],
  },
  {
    id: 'edgecdn',
    step: '04',
    title: 'Core Web Vitals Engine',
    category: 'Global Distribution',
    position: [2.5, -1.6, -1.2],
    color: '#9C7A2E',
    icon: Globe,
    summary: 'Optimized server persistence TTL, deferred JS payloads, and prioritizing hero render paint.',
    metric: '96% LCP Boost',
    details: [
      '30-day persistence TTL bypassing redundant cold loops',
      'Deferred non-critical JS slashes Total Blocking Time by 98%',
      'LCP improved from 30.6s to 1.1s on production Hostinger setup',
    ],
  },
];

// Camera lerp controller to pan toward selected 3D node
function CameraController({ activeNode }: { activeNode: StoryNode | null }) {
  useFrame((state) => {
    const targetPos = activeNode
      ? new THREE.Vector3(
          activeNode.position[0] * 1.3,
          activeNode.position[1] * 1.3,
          activeNode.position[2] + 4.5
        )
      : new THREE.Vector3(0, 0, 8);

    state.camera.position.lerp(targetPos, 0.05);

    const lookTarget = activeNode
      ? new THREE.Vector3(...activeNode.position)
      : new THREE.Vector3(0, 0, 0);

    state.camera.lookAt(lookTarget);
  });

  return null;
}

export function LusionStorytelling3D() {
  const [activeNode, setActiveNode] = useState<StoryNode | null>(STORY_NODES[0]);

  const handleSelectNode = (node: StoryNode) => {
    setActiveNode(node);
  };

  const handleNextStep = () => {
    if (!activeNode) {
      setActiveNode(STORY_NODES[0]);
      return;
    }
    const currentIdx = STORY_NODES.findIndex((n) => n.id === activeNode.id);
    const nextIdx = (currentIdx + 1) % STORY_NODES.length;
    setActiveNode(STORY_NODES[nextIdx]);
  };

  return (
    <div className="relative w-full rounded-[32px] sm:rounded-[40px] bg-[#09090b] border border-white/10 overflow-hidden text-cream shadow-2xl my-8">
      
      {/* Top Header Controls Bar */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 bg-black/40 backdrop-blur-md z-20 relative">
        <div className="flex items-center gap-2.5 truncate">
          <span className="w-2 h-2 rounded-full bg-orange animate-ping shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono text-neutral-300 truncate">
            Interactive 3D Visual Storytelling
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveNode(null)}
            data-magnetic="true"
            className="px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset 360° Orbit</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div
        className="relative h-[340px] sm:h-[450px] lg:h-[500px] w-full bg-gradient-to-b from-[#09090b] via-[#101014] to-[#09090b]"
        style={{ touchAction: 'pan-y' }}
      >
        
        {/* Helper Hint */}
        <div className="absolute top-3 left-4 sm:top-4 sm:left-6 z-10 pointer-events-none select-none max-w-[90%]">
          <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-neutral-400 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 truncate block">
            Drag mouse to rotate 3D view · Click 3D Nodes to Inspect
          </span>
        </div>

        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#9C7A2E" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#5C2A2E" />

          {/* Smooth Camera Lerp Controller */}
          <CameraController activeNode={activeNode} />

          {/* 360° Orbit Controls - Non-blocking for page scroll */}
          <OrbitControls
            enableZoom={false}
            rotateSpeed={0.7}
            enablePan={false}
            autoRotate={activeNode === null}
            autoRotateSpeed={0.6}
          />

          {/* Central Organic 3D Core Sphere */}
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.5, 64, 64]} />
              <MeshDistortMaterial
                color={activeNode ? activeNode.color : '#9C7A2E'}
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.85}
              />
            </mesh>
          </Float>

          {/* 3D Connecting Orbit Ring Wireframe */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.8, 0.015, 16, 100]} />
            <meshBasicMaterial color="#9C7A2E" transparent opacity={0.3} wireframe />
          </mesh>

          {/* Orbiting Interactive 3D Nodes */}
          {STORY_NODES.map((node) => {
            const isSelected = activeNode?.id === node.id;
            return (
              <group key={node.id} position={node.position}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                  <mesh onClick={() => handleSelectNode(node)}>
                    <sphereGeometry args={[isSelected ? 0.35 : 0.25, 32, 32]} />
                    <meshStandardMaterial
                      color={node.color}
                      emissive={node.color}
                      emissiveIntensity={isSelected ? 1.2 : 0.4}
                      roughness={0.1}
                    />
                  </mesh>

                  {/* Outer Glow Ring */}
                  <mesh>
                    <sphereGeometry args={[isSelected ? 0.48 : 0.32, 16, 16]} />
                    <meshBasicMaterial color={node.color} wireframe transparent opacity={0.4} />
                  </mesh>

                  {/* HTML Badge Label in 3D Space */}
                  <Html center distanceFactor={10} zIndexRange={[100, 0]}>
                    <button
                      onClick={() => handleSelectNode(node)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-extrabold flex items-center gap-1.5 transition-all shadow-xl whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-orange text-white scale-110 shadow-[0_0_20px_rgba(156,122,46,0.6)]'
                          : 'bg-black/80 text-neutral-300 border border-white/20 hover:border-orange hover:text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                      <span>{node.step}: {node.title}</span>
                    </button>
                  </Html>
                </Float>
              </group>
            );
          })}
        </Canvas>
      </div>

      {/* Interactive Story Narrative Drawer (Below 3D Stage) */}
      <div className="p-6 sm:p-8 bg-black/60 border-t border-white/10">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full bg-orange/20 text-orange border border-orange/30">
                    Pillar {activeNode.step} · {activeNode.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-green">
                    {activeNode.metric}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeNode.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                  {activeNode.summary}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {activeNode.details.map((detail, i) => (
                    <li key={i} className="text-[11px] text-neutral-400 font-mono flex items-start gap-1.5">
                      <span className="text-orange font-bold">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Action Stepper */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                <button
                  onClick={handleNextStep}
                  data-magnetic="true"
                  className="w-full px-5 py-3 rounded-full bg-orange hover:bg-orange/90 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-102 active:scale-98"
                >
                  <span>Next Chapter ({activeNode.step}/04)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-4 text-neutral-400 text-xs font-mono">
              Click any 3D node above to inspect system architecture story details.
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default LusionStorytelling3D;
