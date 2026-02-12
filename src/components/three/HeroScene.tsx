"use client";

import {Canvas} from "@react-three/fiber";
import {Float, OrbitControls, Environment} from "@react-three/drei";

function Core() {
  return (
    <Float speed={1.6} rotationIntensity={0.9} floatIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial metalness={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <Canvas camera={{position: [0, 0, 4.2], fov: 45}}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <Core />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      </div>
    </div>
  );
}
