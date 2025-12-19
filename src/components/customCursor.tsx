'use client'

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth "spring" physics for a high-end feel
    const springConfig = { damping: 25, stiffness: 700 };
    const edgeX = useSpring(cursorX, springConfig);
    const edgeY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsHovering(!!target.closest('button, a, .interactive'));
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-9999 hidden md:block">
            {/* Main Data Node */}
            <motion.div
                className="absolute w-2 h-2 bg-blue-500 rounded-full"
                style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
            />
            {/* Outer Technical Ring */}
            <motion.div
                className="absolute w-8 h-8 border border-blue-500/30 rounded-full"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.8 : 0.4,
                    borderWidth: isHovering ? '1px' : '1px'
                }}
                style={{ x: edgeX, y: edgeY, translateX: '-50%', translateY: '-50%' }}
            />
        </div>
    );
}