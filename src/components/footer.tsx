'use client'

import { motion } from "motion/react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full py-16 px-6 bg-[#050505] overflow-hidden border-t border-white/10">
            {/* Ambient Background Glow - Keeps it tied to the layout */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">

                {/* Brand & Status */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse" />
                        <span className="text-lg font-bold tracking-tighter uppercase italic text-white">
                            Brian <span className="text-blue-500 not-italic">Woodson</span>
                        </span>
                    </div>
                    <p className="text-xs font-mono text-white/70 uppercase tracking-[0.2em]">
                        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                        © {currentYear} // Systems Operational
                    </p>
                </div>

                {/* Core Stack - Now High Contrast */}
                <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] font-mono text-white/90 uppercase tracking-widest font-bold">
                    <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Next.js 15</span>
                    <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Tailwind</span>
                    <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Framer</span>
                </div>

                {/* Navigation Nodes */}
                <div className="flex justify-center md:justify-end items-center gap-10">
                    <a
                        href="https://github.com/bwoodson72"
                        target="_blank"
                        className="text-xs font-mono text-white hover:text-blue-500 uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                    >
                        GitHub
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        className="text-xs font-mono text-white hover:text-blue-500 uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="mailto:hello@brianwoodson.com"
                        className="text-xs font-mono text-white hover:text-blue-500 uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 font-bold"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}