import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ShaderMode } from '../ui/LusionLabsController';

interface LusionBackgroundCanvasProps {
  activeSection?: string;
  shaderMode?: ShaderMode;
  isTransitioning?: boolean;
}

// Color palettes per portfolio section
const SECTION_PALETTES: Record<string, { primary: string; secondary: string; bgTint: string }> = {
  hero: { primary: '#9C7A2E', secondary: '#EAD9AA', bgTint: '#F5EEDD' },
  credibility: { primary: '#5C2A2E', secondary: '#9C7A2E', bgTint: '#F5EEDD' },
  philosophy: { primary: '#6E5F49', secondary: '#9C7A2E', bgTint: '#F0E8D5' },
  work: { primary: '#9C7A2E', secondary: '#3F5C3F', bgTint: '#F5EEDD' },
  system: { primary: '#3F5C3F', secondary: '#9C7A2E', bgTint: '#EAE2CE' },
  services: { primary: '#5C2A2E', secondary: '#6E5F49', bgTint: '#F5EEDD' },
  experience: { primary: '#9C7A2E', secondary: '#5C2A2E', bgTint: '#F0E8D5' },
  about: { primary: '#3F5C3F', secondary: '#9C7A2E', bgTint: '#F5EEDD' },
  contact: { primary: '#5C2A2E', secondary: '#9C7A2E', bgTint: '#E8DEC4' },
};

// Full-screen GLSL Liquid Transition Curtain Wipe Shader
const TransitionCurtainShader = {
  uniforms: {
    uProgress: { value: 0 },
    uColor: { value: new THREE.Color('#9C7A2E') },
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uProgress;
    uniform vec3 uColor;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;
      float wave = sin(uv.x * 10.0 + uTime * 4.0) * 0.08;
      float border = step(1.0 - uv.y, uProgress + wave);

      if (border <= 0.01 || uProgress <= 0.01) {
        discard;
      }

      gl_FragColor = vec4(uColor, (1.0 - uv.y) * 0.45);
    }
  `,
};

// GLSL Organic Fluid Liquid Mesh Shader
const FluidMeshShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#9C7A2E') },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;

    // Simplex noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;

      float noise = snoise(pos * 0.8 + vec3(uTime * 0.4));
      pos += normal * noise * 0.45;

      // Mouse influence displacement
      float mouseDist = distance(uv, uMouse);
      pos += normal * sin(mouseDist * 10.0 - uTime * 2.0) * 0.2;

      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uTime;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
      float diff = max(dot(normal, lightDir), 0.2);

      // Specular shine rim
      vec3 viewDir = normalize(-vPosition);
      float rim = 1.0 - max(dot(viewDir, normal), 0.0);
      rim = pow(rim, 3.0);

      vec3 finalColor = mix(uColor, vec3(1.0), rim * 0.5) * diff;
      gl_FragColor = vec4(finalColor, 0.45);
    }
  `,
};

function TransitionCurtain({ isTransitioning, activeSection }: { isTransitioning: boolean; activeSection: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const progressRef = useRef(0);

  useEffect(() => {
    if (isTransitioning) {
      progressRef.current = 0.01;
    }
  }, [isTransitioning, activeSection]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;

    if (progressRef.current > 0) {
      progressRef.current += delta * 1.8;
      if (progressRef.current >= 1.2) {
        progressRef.current = 0;
      }
    }
    materialRef.current.uniforms.uProgress.value = progressRef.current;
    materialRef.current.uniforms.uColor.value.set(
      SECTION_PALETTES[activeSection]?.primary || '#9C7A2E'
    );
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        args={[TransitionCurtainShader]}
        depthWrite={false}
        transparent
      />
    </mesh>
  );
}

function FluidSculpture({ activeSection }: { activeSection: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta * 0.6;
    materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
    materialRef.current.uniforms.uColor.value.lerp(
      new THREE.Color(SECTION_PALETTES[activeSection]?.primary || '#9C7A2E'),
      delta * 2.0
    );

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <icosahedronGeometry args={[1.8, 16]} />
      <shaderMaterial
        ref={materialRef}
        args={[FluidMeshShader]}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ParticleField({ activeSection = 'hero' }: { activeSection: string }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const particleCount = 500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(SECTION_PALETTES.hero.primary);
    const color2 = new THREE.Color(SECTION_PALETTES.hero.secondary);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 2.2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mixColor = color1.clone().lerp(color2, Math.random());
      cols[i * 3] = mixColor.r;
      cols[i * 3 + 1] = mixColor.g;
      cols[i * 3 + 2] = mixColor.b;
    }

    return [pos, cols];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function LusionBackgroundCanvas({
  activeSection = 'hero',
  shaderMode = 'fluid',
  isTransitioning = false,
}: LusionBackgroundCanvasProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.8} />

        {/* Dynamic Shader Mesh Render Modes */}
        {shaderMode === 'fluid' && <FluidSculpture activeSection={activeSection} />}
        {shaderMode === 'quantum' && <ParticleField activeSection={activeSection} />}
        {shaderMode === 'ribbon' && <FluidSculpture activeSection={activeSection} />}

        {/* Full-Screen GLSL Liquid Transition Curtain */}
        <TransitionCurtain isTransitioning={isTransitioning} activeSection={activeSection} />
      </Canvas>
    </div>
  );
}

export default LusionBackgroundCanvas;
