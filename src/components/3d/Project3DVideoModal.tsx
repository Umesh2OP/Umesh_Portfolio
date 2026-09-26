import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, Code2 } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

interface Project3DVideoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

// Shader Material for Liquid Video Plane Distortion
const VideoPlaneShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Calculate distance to mouse vector
      float dist = distance(uv, uMouse);
      float wave = sin(dist * 12.0 - uTime * 3.0) * 0.15 * (1.0 - dist);
      pos.z += wave * uHover;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;

    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, uMouse);
      
      // Chromatic aberration on distortion
      vec2 offset = (uv - uMouse) * sin(dist * 10.0 - uTime * 2.0) * 0.02 * uHover;
      
      float r = texture2D(uTexture, uv + offset).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - offset).b;

      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
};

function VideoMesh({ videoElement }: { videoElement: HTMLVideoElement | null }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const videoTexture = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (videoElement) {
      const tex = new THREE.VideoTexture(videoElement);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.format = THREE.RGBAFormat;
      videoTexture.current = tex;

      if (materialRef.current) {
        materialRef.current.uniforms.uTexture.value = tex;
      }
    }
  }, [videoElement]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      const { x, y } = state.mouse;
      materialRef.current.uniforms.uMouse.value.set((x + 1) / 2, (y + 1) / 2);
      materialRef.current.uniforms.uHover.value = 1.0;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = state.mouse.y * -0.15;
      meshRef.current.rotation.y = state.mouse.x * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 2.3, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        args={[VideoPlaneShader]}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function Project3DVideoModal({ project, onClose }: Project3DVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Sample video placeholder stream for showcase
  const demoVideoUrl =
    'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41328-large.mp4';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-ink/80 backdrop-blur-xl animate-fade-in">
      {/* Hidden Video element acting as texture source */}
      <video
        ref={videoRef}
        src={demoVideoUrl}
        loop
        muted={isMuted}
        autoPlay
        playsInline
        crossOrigin="anonymous"
        className="hidden"
      />

      <div className="relative w-full max-w-5xl bg-ink rounded-3xl border border-white/10 shadow-2xl overflow-hidden text-cream grid grid-cols-1 lg:grid-cols-12">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          data-magnetic="true"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-cream/10 text-cream hover:bg-orange hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: 3D WebGL Video Canvas Plane */}
        <div className="relative lg:col-span-7 h-[300px] lg:h-[500px] bg-black/60 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
              <ambientLight intensity={1} />
              <VideoMesh videoElement={videoRef.current} />
            </Canvas>
          </div>

          {/* Interactive Player Overlay Controls */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <button onClick={togglePlay} className="text-white hover:text-orange">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-orange">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              3D WebGL Texture Shader
            </span>
          </div>
        </div>

        {/* Right Column: Case Study Specs & Live Links */}
        <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-orange/20 text-orange border border-orange/30">
                {project.category}
              </span>
              {project.metricsResult && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-green/20 text-green border border-green/30">
                  {project.metricsResult}
                </span>
              )}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-xs text-orange font-semibold">{project.subtitle}</p>
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              {project.solution}
            </p>
          </div>

          {/* Tech Badges */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Tech Stack Topology
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[10px] font-bold rounded bg-white/5 border border-white/10 text-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-orange hover:bg-orange/90 text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="View Github Repository"
              >
                <Code2 className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Project3DVideoModal;
