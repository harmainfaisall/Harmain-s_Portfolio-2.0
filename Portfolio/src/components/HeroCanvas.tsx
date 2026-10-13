import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingCore({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
      
      // Subtle mouse reactive tilt
      meshRef.current.rotation.x += (mouse.current.y * 0.5 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (mouse.current.x * 0.5 - meshRef.current.rotation.y) * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.z += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35;
      ring2Ref.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <group>
      {/* Central Organic Polyhedron in Deep Matte Carbon */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh ref={meshRef} scale={1.6}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#111111"
            emissive="#000000"
            roughness={0.25}
            metalness={0.8}
            distort={0.35}
            speed={2}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Primary Orbital Ring (Cream Gold) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]} scale={2.4}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#E9E4A8"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Orbital Ring (Refined White/Cream) */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]} scale={2.9}>
        <torusGeometry args={[1, 0.012, 16, 80]} />
        <meshStandardMaterial
          color="#ECE5C8"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

function createRandomGenerator(initialSeed = 42) {
  let seed = initialSeed;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function StarParticles({ count = 320 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const creamColor = new THREE.Color("#E9E4A8");
    const whiteColor = new THREE.Color("#FFFFFF");
    const goldGrayColor = new THREE.Color("#8C887B");
    const random = createRandomGenerator(42);

    for (let i = 0; i < count; i++) {
      const radius = 3.5 + random() * 4.5;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const rChoice = random();
      const chosenColor = rChoice > 0.6 ? creamColor : rChoice > 0.3 ? whiteColor : goldGrayColor;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = { x, y };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[550px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Geometric Scene"
    >
      {/* Background soft ambient vignette */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#E9E4A8]/5 blur-[90px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center space-y-3 text-[#ECE5C8]">
            <div className="w-10 h-10 rounded-full border-2 border-[#E9E4A8]/20 border-t-[#E9E4A8] animate-spin" />
            <span className="text-xs font-mono tracking-wider font-medium text-[#ECE5C8]/80">INITIALIZING 3D ENGINE...</span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
          <pointLight position={[-8, -5, -5]} intensity={0.9} color="#ffffff" />
          <pointLight position={[5, -5, 5]} intensity={0.8} color="#e5e5e5" />
          
          <FloatingCore mouse={mouse} />
          <StarParticles />
        </Canvas>
      </Suspense>

      {/* Subtle interaction cue badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#1A1916]/95 border border-[#E9E4A8]/20 text-[11px] font-mono text-[#ECE5C8] backdrop-blur-md pointer-events-none flex items-center gap-2 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E9E4A8] animate-ping" />
        Interactive 3D • Move cursor
      </div>
    </div>
  );
}
