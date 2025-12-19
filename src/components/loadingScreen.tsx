'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 12) + 4;
            });
        }, 120);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center p-6 lg:p-12"
                >
                    {/* Atmospheric Glow behind the loader */}
                    <div className="absolute w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="w-full max-w-[320px] md:max-w-[450px] space-y-6 md:space-y-8 relative z-10">

                        <div className="flex justify-between items-end font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]">
                            <motion.span
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-blue-500 italic font-bold"

                            >

                                // System.Initialize
                            </motion.span>
                            <span className="text-white/60 tabular-nums">{progress}%</span>
                        </div>

                        {/* High-Visibility Progress Bar */}
                        <div className="h-[2px] w-full bg-white/5 relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", damping: 20, stiffness: 50 }}
                            />
                        </div>

                        {/* More detailed terminal output for desktop */}
                        <div className="text-[9px] md:text-[11px] font-mono text-white/20 uppercase tracking-[0.2em] space-y-2 h-12">
                            <p className={progress > 10 ? "opacity-100" : "opacity-0"}>{'>'} kernel_boot_v1.0.4</p>
                            <p className={progress > 45 ? "opacity-100" : "opacity-0"}>{'>'} mounting_immersive_assets</p>
                            <p className={progress > 85 ? "opacity-100" : "opacity-0 text-blue-500"}>
                                {progress > 85 ? "> ready_to_render" : "> pending_node_sync"}
                            </p>
                        </div>
                    </div>

                    {/* Footer metadata for the loader */}
                    <div className="absolute bottom-12 font-mono text-[9px] text-white/10 uppercase tracking-[0.5em]">
                        Brian Woodson // Software Engineer // 2025
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}