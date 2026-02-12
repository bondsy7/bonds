"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
    const mesh = useRef<THREE.Points>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 20; // spread x
            const y = (Math.random() - 0.5) * 20; // spread y
            const z = (Math.random() - 0.5) * 10; // spread z

            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    // Initial positions
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        particles.forEach((_, i) => {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        });
        return p;
    }, [count, particles]);

    useFrame((state) => {
        // Mouse interaction
        // We Map mouse position (-1 to 1) to world space roughly
        const mx = (state.mouse.x * state.viewport.width) / 2;
        const my = (state.mouse.y * state.viewport.height) / 2;

        if (!mesh.current) return;

        // Standard animation
        // We are just rotating the whole group for simplicity + wave effect in vertex shader would be better
        // But let's do CPU animation for "antigravity" interaction logic (repulsion)
        // For 5000 particles, loop is okay-ish on modern device, but vertex shader is preferred.
        // However, R3F makes it easier to just use `ref` and mutate positions.
        // Let's try a simple approach: mutate attribute.

        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            let x = positions[i * 3];
            let y = positions[i * 3 + 1];
            let z = positions[i * 3 + 2];

            // Base Movement (Flow)
            const p = particles[i];
            // x += Math.sin(state.clock.elapsedTime * p.speed) * 0.01;
            y += Math.cos(state.clock.elapsedTime * p.speed) * 0.01; // subtle float

            // Interaction: Mouse Repulsion
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 3) {
                const angel = Math.atan2(dy, dx);
                const force = (3 - dist) * 0.1;
                x += Math.cos(angel) * force;
                y += Math.sin(angel) * force;
            }

            // Return to original (spring back) - simplistic
            const ox = p.x;
            const oy = p.y;
            x += (ox - x) * 0.02;
            y += (oy - y) * 0.02;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z; // depth
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
        // mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    // Generate circle texture
    const texture = useMemo(() => {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if (context) {
            context.beginPath();
            context.arc(16, 16, 14, 0, 2 * Math.PI);
            context.fillStyle = 'white';
            context.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }, []);

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05} // Slightly larger to compensate for round shape
                color="#cbd5e1"
                sizeAttenuation={true}
                depthWrite={false}
                transparent
                opacity={0.5}
                map={texture}
                alphaMap={texture}
                alphaTest={0.01}
            />
        </points>
    );
}

export function InteractiveParticles() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-50 pointer-events-none">
            {/* pointer-events-none on canvas container might block mouse events for R3F 'mouse' prop?
           Actually R3F listens to events on the canvas. If we set pointer-events-none, it won't receive them.
           We need pointer-events-none ONLY if we want clicks to pass through to buttons behind it.
           But we want mouse interaction for particles.
           
           Solution: Use 'eventSource' on Canvas if existing, or just let Canvas handle events but set CSS to not block clicks?
           CSS `pointer-events-none` disables mouse interaction completely.
           
           We want the particles to perform largely as a background. 
           If we want interaction, the Canvas must receive events.
           But if Canvas is full screen on top (z-index), it blocks buttons.
           If Canvas is behind (z-index -1), it receives interactions if body/html allows?
           
           Usually:
           Canvas z-index: -1.
           Content z-index: 10.
           
           R3F uses `eventSource={document.body}` or similar to listen to events globally even if canvas is behind.
       */}
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} eventSource={typeof document !== 'undefined' ? document.body : undefined} eventPrefix="client">
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div>
    );
}
