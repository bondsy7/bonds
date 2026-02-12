"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterHeadingProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TypewriterHeading({ text, className = "", delay = 0 }: TypewriterHeadingProps) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 40 + Math.random() * 40); // Varied speed for natural feel
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <h1 className={`${className} relative inline-block`}>
            {displayText}
            {currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="ml-1 inline-block h-[0.9em] w-[4px] translate-y-[0.1em] bg-blue-600"
                />
            )}
        </h1>
    );
}
