import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// 3D Diamond / Octahedron Mesh Component with glistening glass reflection
// 3D Diamond / Octahedron Mesh Component with glistening reflection
function GlisteningDiamond({ position, scale, rotationSpeed }: { position: [number, number, number]; scale: number; rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x += delta * (rotationSpeed * 0.5);
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#9C7A2E"
        emissiveIntensity={0.2}
        roughness={0.1}
        metalness={0.85}
      />
    </mesh>
  );
}

// 3D Cyber Robot Character with waving arm & 'HI! 👋' speech bubble
function WavingCyberRobot() {
  const groupRef = useRef<THREE.Group>(null!);
  const armRef = useRef<THREE.Group>(null!);
  const [greetingText, setGreetingText] = React.useState("HI! 👋");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
      groupRef.current.position.y = Math.sin(time * 0.9) * 0.12;
    }
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(time * 4) * 0.3 + 0.6;
    }
  });

  const handleRobotClick = () => {
    const greetings = ["HI! 👋", "HELLO WORLD! 🚀", "LET'S BUILD! ⚡", "READY! 💻"];
    const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
    setGreetingText(randomGreet);
  };

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} onClick={handleRobotClick}>
      
      {/* Animated Floating Speech Bubble Above Robot */}
      <Html position={[0, 2.6, 0]} center distanceFactor={7} zIndexRange={[100, 0]}>
        <div
          onClick={handleRobotClick}
          className="bg-white text-black font-extrabold px-3.5 py-1.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center gap-2 border-2 border-orange animate-bounce cursor-pointer select-none whitespace-nowrap hover:scale-110 transition-transform"
        >
          <span className="text-sm font-black text-black">{greetingText}</span>
          <span className="text-[9px] font-mono font-bold text-white bg-orange px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            BOT-01
          </span>
        </div>
      </Html>

      {/* Robot Antenna Rod & Pulsing Beacon */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
        <meshStandardMaterial color="#9C7A2E" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.38, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={1.5} />
      </mesh>

      {/* Robot Metallic Head */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1.2, 1.0, 0.9]} />
        <meshStandardMaterial color="#18181b" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Visor Screen with Glowing LED Eyes */}
      <mesh position={[0, 1.4, 0.46]}>
        <planeGeometry args={[0.95, 0.6]} />
        <meshBasicMaterial color="#000000" />
        <Html center position={[0, 0, 0.02]} transform distanceFactor={5}>
          <div className="font-mono text-xs font-black text-yellow-400 select-none pointer-events-none tracking-widest flex items-center gap-2 bg-black px-2 py-1 rounded border border-yellow-400/40">
            <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
            <span>[ O _ O ]</span>
            <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
          </div>
        </Html>
      </mesh>

      {/* Robot Side Ears */}
      <mesh position={[0.65, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.15, 12]} />
        <meshStandardMaterial color="#9C7A2E" metalness={0.9} />
      </mesh>
      <mesh position={[-0.65, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.15, 12]} />
        <meshStandardMaterial color="#9C7A2E" metalness={0.9} />
      </mesh>

      {/* Robot Neck Joint */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.9} />
      </mesh>

      {/* Robot Torso */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.3, 1.2, 0.9]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Chest HUD Control Panel */}
      <mesh position={[0, 0.2, 0.46]}>
        <boxGeometry args={[0.6, 0.45, 0.08]} />
        <meshStandardMaterial color="#09090b" roughness={0.1} />
      </mesh>

      {/* Right Waving Robot Arm */}
      <group ref={armRef} position={[0.8, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.14, 0.14, 0.7, 12]} />
        <meshStandardMaterial color="#9C7A2E" metalness={0.8} />
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} />
        </mesh>
      </group>

      {/* Left Robot Arm */}
      <group position={[-0.8, 0.3, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.14, 0.14, 0.7, 12]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} />
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#9C7A2E" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// 2D Pop Sticker Items mapped into 3D Physics Space
const STICKERS = [
  { id: 'smiley', icon: '😃', bg: 'bg-yellow-400', pos: [-4.2, 2.5, 1] },
  { id: 'eightball', icon: '🎱', bg: 'bg-neutral-900 text-white', pos: [4.2, -2.0, 1.2] },
  { id: 'gem', icon: '💎', bg: 'bg-cyan-400', pos: [3.8, 0.5, -1] },
  { id: 'flame', icon: '🔥', bg: 'bg-orange-500', pos: [1.8, 3.6, -0.2] },
  { id: 'rocket', icon: '🚀', bg: 'bg-purple-600', pos: [-1.2, -2.8, 0.5] },
  { id: 'eyes', icon: '👁️', bg: 'bg-emerald-400', pos: [3.2, -3.2, 0.8] },
];

function FloatingStickersSwarm() {
  return (
    <>
      {STICKERS.map((sticker) => {
        return (
          <Float key={sticker.id} speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
            <Html position={sticker.pos as [number, number, number]} center distanceFactor={8} zIndexRange={[100, 0]}>
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white ${sticker.bg} flex items-center justify-center text-xl sm:text-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-transform duration-300 hover:scale-125 cursor-pointer select-none`}
              >
                {sticker.icon}
              </div>
            </Html>
          </Float>
        );
      })}
    </>
  );
}

export function LusionContact3DCanvas() {
  const diamonds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      scale: Math.random() * 0.35 + 0.2,
      rotationSpeed: Math.random() * 0.6 + 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden bg-[#070709]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#9C7A2E" />

        {/* Central 3D Waving Robot with 'HI!' Speech Bubble */}
        <WavingCyberRobot />

        {/* Floating Glistening Diamonds */}
        {diamonds.map((d) => (
          <Float key={d.id} speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
            <GlisteningDiamond position={d.position} scale={d.scale} rotationSpeed={d.rotationSpeed} />
          </Float>
        ))}

        {/* Pop Art Physics Floating Stickers Swarm */}
        <FloatingStickersSwarm />
      </Canvas>

      {/* Optical Crosshair Sparkle Flares Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[12%] text-white/40 font-mono text-xs">+</div>
        <div className="absolute top-[25%] right-[15%] text-white/40 font-mono text-xs">+</div>
        <div className="absolute bottom-[22%] left-[18%] text-white/40 font-mono text-xs">+</div>
        <div className="absolute bottom-[30%] right-[22%] text-white/40 font-mono text-xs">+</div>
      </div>
    </div>
  );
}

export default LusionContact3DCanvas;
