"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    Text,
    Float,
    Sparkles,
    Stars,
    useGLTF,
    Line,
    Environment,
    ContactShadows,
    Clone,
    PivotControls
} from "@react-three/drei";
import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import * as THREE from "three";

// --- ROBOT MODEL LOADER ---

function ModelLoader({ url, position, rotation = [0, 0, 0], scale = 1, active: initialActive = false }: any) {
    const gltf: any = useGLTF(url);
    const ref = useRef<THREE.Group>(null!);
    const [active, setActive] = useState(initialActive);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
        if (active) {
            ref.current.rotation.y += 0.05; // Faster rotation when clicked
        } else {
            ref.current.rotation.y += 0.005;
        }
    });

    return (
        <group
            position={position}
            rotation={rotation}
            onClick={() => setActive(!active)}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={active ? 1 : 0.2}>
                <group ref={ref}>
                    <Clone
                        object={gltf.scene}
                        scale={scale * (active ? 1.15 : 1)}
                    />
                </group>
            </Float>
            <pointLight color={active ? "#00ffff" : "#3b82f6"} intensity={active ? 50 : 5} distance={5} />
        </group>
    );
}

// --- NEURAL NODE (GEOMETRIC) ---

function NeuralNode({ position, label, active, color = "#3b82f6", labelColor = "white", onMove }: any) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += active ? 0.05 : 0.01;
        meshRef.current.rotation.z += active ? 0.02 : 0.005;
        const scale = active ? 1.2 + Math.sin(state.clock.elapsedTime * 5) * 0.1 : 1;
        meshRef.current.scale.set(scale, scale, scale);
    });

    return (
        <PivotControls
            autoTransform
            depthTest={false}
            scale={0.5}
            anchor={[0, 0, 0]}
            onDrag={(l) => {
                const pos = new THREE.Vector3();
                pos.setFromMatrixPosition(l);
                onMove && onMove([pos.x, pos.y, pos.z]);
            }}
            activeAxes={[true, true, true, false, false, false, false, false, false] as any}
        >
            <group position={position}>
                <Float speed={4} rotationIntensity={active ? 2 : 0.5} floatIntensity={active ? 2 : 0.5}>
                    <mesh ref={meshRef}>
                        <octahedronGeometry args={[0.5, 0]} />
                        <meshPhongMaterial
                            color={active ? "#00ffff" : color}
                            emissive={active ? "#00ffff" : color}
                            emissiveIntensity={active ? 2 : 0.5}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                </Float>
                <Text
                    position={[0, -1.2, 0]}
                    fontSize={0.35}
                    color={active ? "#020617" : labelColor}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
                <pointLight color={active ? "#00ffff" : color} intensity={active ? 20 : 2} distance={5} />
            </group>
        </PivotControls>
    );
}

// --- NEON CONNECTIONS ---

function PulsingConnection({ start, end, active, color = "#3b82f6" }: { start: [number, number, number], end: [number, number, number], active: boolean, color?: string }) {
    const curve = useMemo(() => {
        const vStart = new THREE.Vector3(...start);
        const vEnd = new THREE.Vector3(...end);
        const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
        mid.y += 2; // Arch
        return new THREE.CatmullRomCurve3([vStart, mid, vEnd]);
    }, [start, end]);

    const points = useMemo(() => curve.getPoints(50), [curve]);
    const lineRef = useRef<any>(null!);

    useFrame((state) => {
        if (lineRef.current) {
            const pulse = active ? 0.8 + Math.sin(state.clock.elapsedTime * 10) * 0.2 : 0.3;
            lineRef.current.material.opacity = pulse;
            if (active) {
                lineRef.current.material.color.set("#2563eb");
            } else {
                lineRef.current.material.color.set(color);
            }
        }
    });

    return (
        <group>
            <Line
                ref={lineRef}
                points={points}
                color={color}
                lineWidth={active ? 5 : 2}
                transparent
                opacity={0.3}
                toneMapped={false}
            />
            {active && (
                <DataFlow curve={curve} />
            )}
        </group>
    );
}

function DataFlow({ curve }: { curve: THREE.Curve<THREE.Vector3> }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (!meshRef.current) return;
        const t = (state.clock.elapsedTime * 0.5) % 1;
        const p = curve.getPoint(t);
        meshRef.current.position.copy(p);
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={50} toneMapped={false} />
            <pointLight color="#00ffff" intensity={10} distance={2} />
        </mesh>
    );
}

// --- MAIN SCENE ---

export function OrchestratorScene({ status }: { status: string }) {
    const { theme } = useTheme();
    const [nodePositions, setNodePositions] = useState({
        research: [-6, 3, -2] as [number, number, number],
        language: [-6, -3, -2] as [number, number, number],
        visual: [6, 3, -2] as [number, number, number],
        voice: [6, -3, -2] as [number, number, number],
    });

    const isDark = theme === "dark";
    const corePos: [number, number, number] = [0, 0, 0];

    return (
        <div className={`absolute inset-0 h-full w-full transition-colors duration-700 ${isDark ? "bg-[#020617]" : "bg-[#f8fafc]"}`}>
            <Canvas shadows camera={{ position: [0, 0, 15], fov: 40 }}>
                <color attach="background" args={[isDark ? "#020617" : "#f1f5f9"]} />
                <ambientLight intensity={isDark ? 0.3 : 1.2} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={isDark ? 10 : 5} castShadow />
                <pointLight position={[-10, -10, -10]} color={isDark ? "#00ffff" : "#3b82f6"} intensity={isDark ? 5 : 2} />

                <Suspense fallback={null}>
                    <Environment preset="studio" />

                    {/* Central AI Hub */}
                    <ModelLoader
                        url="/3d/weathered_penguin-bot.glb"
                        position={[0, -1.5, 0]}
                        scale={0.8}
                    />

                    {/* AI Nodes */}
                    <NeuralNode
                        position={nodePositions.research}
                        onMove={(p: [number, number, number]) => setNodePositions((prev: any) => ({ ...prev, research: p }))}
                        active={status === "RESEARCH"}
                        label="RESEARCH (Gemini)"
                        color="#4285F4"
                        labelColor="#1e293b"
                    />

                    <NeuralNode
                        position={nodePositions.language}
                        onMove={(p: [number, number, number]) => setNodePositions((prev: any) => ({ ...prev, language: p }))}
                        active={status === "CREATIVE"}
                        label="LANGUAGE (GPT-4o)"
                        color="#10a37f"
                        labelColor="#1e293b"
                    />

                    <NeuralNode
                        position={nodePositions.visual}
                        onMove={(p: [number, number, number]) => setNodePositions((prev: any) => ({ ...prev, visual: p }))}
                        active={status === "VISUALS"}
                        label="VISUAL ASSETS"
                        color="#ff00ff"
                        labelColor="#1e293b"
                    />

                    <NeuralNode
                        position={nodePositions.voice}
                        onMove={(p: [number, number, number]) => setNodePositions((prev: any) => ({ ...prev, voice: p }))}
                        active={status === "SYSTEM"}
                        label="VOICE ENGINE"
                        color="#f59e0b"
                        labelColor="#1e293b"
                    />

                    {/* Pulsing Connections (Dynamic positions) */}
                    <PulsingConnection start={nodePositions.research} end={corePos} active={status === "RESEARCH"} color="#3b82f6" />
                    <PulsingConnection start={nodePositions.language} end={corePos} active={status === "CREATIVE"} color="#10a37f" />
                    <PulsingConnection start={nodePositions.visual} end={corePos} active={status === "VISUALS"} color="#ff00ff" />
                    <PulsingConnection start={nodePositions.voice} end={corePos} active={status === "SYSTEM"} color="#f59e0b" />

                    <ContactShadows opacity={0.2} scale={20} blur={2.5} far={4.5} />
                </Suspense>

                {/* Stars and Sparkles adjusted for light background */}
                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={100} scale={20} size={4} speed={0.4} color="#3b82f6" />

                <OrbitControls
                    autoRotate={false}
                    enableZoom={false}
                    maxDistance={25}
                    minDistance={10}
                />
            </Canvas>

            {/* HUD Info (Darkened for contrast) */}
            <div className="absolute bottom-10 left-10 pointer-events-none font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em]">
                NEURAL_LINK: STABLE // ENCRYPTION: AES-Q // CORE_V2
            </div>
        </div>
    );
}
