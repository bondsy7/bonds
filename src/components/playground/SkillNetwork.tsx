"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Data
const skills = [
    { id: 0, label: "React", group: "core", pos: [0, 0, 0] },
    { id: 1, label: "Next.js", group: "core", pos: [2, 1, 0] },
    { id: 2, label: "TypeScript", group: "lang", pos: [-2, 1, 0] },
    { id: 3, label: "Tailwind", group: "ui", pos: [2, -1, 1] },
    { id: 4, label: "Three.js", group: "gfx", pos: [0, 2, 2] },
    { id: 5, label: "Framer", group: "ui", pos: [-2, -1, 1] },
    { id: 6, label: "Node.js", group: "backend", pos: [0, -2, -1] },
    { id: 7, label: "PostgreSQL", group: "backend", pos: [1.5, -2, -2] },
    { id: 8, label: "GraphQL", group: "backend", pos: [-1.5, -2, -2] },
    { id: 9, label: "Zustand", group: "state", pos: [-1, 0, -2] },
];

const connections = [
    [0, 1], // React -> Next
    [0, 2], // React -> TS
    [0, 3], // React -> Tailwind
    [0, 4], // React -> Three
    [0, 5], // React -> Framer
    [0, 9], // React -> Zustand
    [1, 3], // Next -> Tailwind
    [1, 6], // Next -> Node
    [6, 7], // Node -> Postgres
    [6, 8], // Node -> GraphQL
    [2, 0],
    [2, 6],
    [4, 0], // Three -> React
];

function Node({ pos, label, color = "white" }: { pos: number[], label: string, color?: string }) {
    const [hovered, setHovered] = useState(false);
    const vPos = new THREE.Vector3(...pos);

    return (
        <group position={vPos}>
            <mesh
                onPointerOver={() => { document.body.style.cursor = "pointer"; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = "auto"; setHovered(false); }}
            >
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color={hovered ? "#60a5fa" : color}
                    emissive={hovered ? "#3b82f6" : "#000000"}
                    emissiveIntensity={hovered ? 0.5 : 0}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
            <Text
                position={[0, 0.5, 0]}
                fontSize={0.3}
                color={hovered ? "#60a5fa" : "#94a3b8"}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#ffffff"
            >
                {label}
            </Text>
        </group>
    );
}

function Edges() {
    const points = useMemo(() => {
        return connections.map(([start, end]) => {
            const s = skills.find(n => n.id === start);
            const e = skills.find(n => n.id === end);
            if (!s || !e) return null;
            return [new THREE.Vector3(...s.pos), new THREE.Vector3(...e.pos)];
        }).filter(Boolean) as [THREE.Vector3, THREE.Vector3][];
    }, []);

    return (
        <group>
            {points.map((pts, i) => (
                <Line
                    key={i}
                    points={pts}
                    color="#cbd5e1"
                    lineWidth={1}
                    transparent
                    opacity={0.3}
                />
            ))}
        </group>
    );
}

function SceneContent() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Gentle rotation
        groupRef.current.rotation.y += 0.001;
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {skills.map(s => (
                    <Node key={s.id} pos={s.pos as any} label={s.label} />
                ))}
                <Edges />
            </Float>
        </group>
    );
}

export function SkillNetwork() {
    return (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-slate-50 to-white">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Background Particles/Stars for depth */}
                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

                <SceneContent />

                <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            {/* Overlay UI */}
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-12">
                <div className="glass-panel rounded-full px-6 py-2 text-sm font-medium text-slate-500 z-10">
                    Drag to explore • Hover nodes for glow
                </div>
            </div>
        </div>
    );
}
