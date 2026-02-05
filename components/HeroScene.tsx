'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls, Points } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function NetworkCore() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    return Array.from({ length: 42 }, () =>
      new THREE.Vector3((Math.random() - 0.5) * 3.2, (Math.random() - 0.5) * 3.2, (Math.random() - 0.5) * 3.2)
    );
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial color="#4f8cff" wireframe emissive="#2a4c9f" emissiveIntensity={0.6} />
        </mesh>
      </Float>
      <Points positions={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))} stride={3} frustumCulled={false}>
        <pointsMaterial transparent color="#c7d9ff" size={0.03} sizeAttenuation depthWrite={false} />
      </Points>
      {points.slice(0, 18).map((p, i) => (
        <Line key={i} points={[p, points[(i * 2 + 7) % points.length]]} color="#4f8cff" transparent opacity={0.24} lineWidth={1} />
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-surface/30">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <color attach="background" args={['#0b0f17']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={2.4} color="#4f8cff" />
        <NetworkCore />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
