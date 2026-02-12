"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Plane(props: any) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial color="#171717" transparent opacity={0.1} />
        </mesh>
    );
}

function Cube({ position }: { position: [number, number, number] }) {
    const [ref, api] = useBox(() => ({
        mass: 1,
        position,
        args: [1, 1, 1],
        linearDamping: 0.5,
        angularDamping: 0.5
    }));

    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <mesh ref={ref} castShadow receiveShadow onClick={() => api.applyImpulse([0, 5, 0], [0, 0, 0])}>
            <boxGeometry />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.1} />
        </mesh>
    );
}

function MouseBall() {
    const { viewport } = useThree();
    const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [1], position: [0, 0, 0] }));

    useFrame(({ mouse }) => {
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        // We map mouse Y to Z in 3D space since camera is looking somewhat down/forward
        // But let's just use mouse on the ground plane.
        // Actually, let's map it simply to x and z on the floor plane.
        // Need raycaster for true mouse-to-floor mapping, but viewport generic mapping works for fixed camera.

        // Simple improved mapping:
        // If camera is at [0, 5, 10] looking at [0,0,0], mouse movement differs.
        // For simplicity, let's just map viewport x/y to x/y and keep z constant or calculate.

        // Better: Raycast to invisible plane at y=1?
        // Let's stick to viewport mapping, assuming top-down-ish view.
        // Camera is usually at z=10.

        api.position.set(x, 0.5, -y); // mapping y to -z for "forward/backward" feel
    });

    return (
        <mesh ref={ref} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="white" transparent opacity={0.5} />
        </mesh>
    );
}

export function PhysicsScene() {
    const [cubes, setCubes] = useState<[number, number, number][]>([]);

    useEffect(() => {
        const temp: [number, number, number][] = [];
        for (let i = 0; i < 50; i++) {
            temp.push([
                (Math.random() - 0.5) * 10,
                5 + Math.random() * 10,
                (Math.random() - 0.5) * 5
            ]);
        }
        setCubes(temp);
    }, []);

    return (
        <div className="absolute inset-0 h-full w-full">
            <Canvas shadows camera={{ position: [0, 10, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} castShadow intensity={1} />
                <Physics gravity={[0, -9.81, 0]}>
                    <Plane />
                    <MouseBall />
                    {cubes.map((pos, i) => (
                        <Cube key={i} position={pos} />
                    ))}
                </Physics>
            </Canvas>
        </div>
    );
}
