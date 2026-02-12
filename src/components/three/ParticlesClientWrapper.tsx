"use client";

import dynamic from "next/dynamic";

const InteractiveParticles = dynamic(
    () => import("@/components/three/InteractiveParticles").then((mod) => mod.InteractiveParticles),
    { ssr: false }
);

export function ParticlesClientWrapper() {
    return <InteractiveParticles />;
}
