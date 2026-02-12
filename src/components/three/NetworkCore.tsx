"use client";

import {Canvas, useFrame} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import * as THREE from "three";
import {useMemo, useRef} from "react";

type Node = {
  position: THREE.Vector3;
};

function Network() {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo<Node[]>(() => {
    return Array.from({length: 18}).map(() => ({
      position: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(3),
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(2)
      )
    }));
  }, []);

  const lines = useMemo(() => {
    const points: number[] = [];

    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (i !== j && a.position.distanceTo(b.position) < 1.6) {
          points.push(
            a.position.x,
            a.position.y,
            a.position.z,
            b.position.x,
            b.position.y,
            b.position.z
          );
        }
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [nodes]);

  useFrame(({clock, mouse}) => {
    if (!group.current) return;

    group.current.rotation.y = clock.getElapsedTime() * 0.05;
    group.current.rotation.x = mouse.y * 0.15;
    group.current.rotation.z = mouse.x * 0.15;
  });

  return (
    <group ref={group}>
      {/* Lines */}
      <lineSegments geometry={lines}>
        <lineBasicMaterial
          color="#4f8cff"
          transparent
          opacity={0.35}
        />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <mesh key={i} position={n.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#4f8cff"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export function NetworkCore() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <Canvas camera={{position: [0, 0, 4.5], fov: 45}}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 4, 4]} intensity={1.1} />
        <Network />
        <Environment preset="city" />
      </Canvas>

      {/* Cinematic Overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>
    </div>
  );
}
