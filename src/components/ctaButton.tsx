'use client'

import { motion } from "motion/react"

export function CtaButton({ label, href }: { label: string; href: string }) {
    return (
        <div className="flex justify-center w-full">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500 blur-2xl  opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

            <a
                href={href}
                aria-label={label}
                className="relative flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-mono text-[13px] md:text-[14px] font-bold uppercase tracking-[0.25em] transition-all duration-300 border border-blue-400/30 shadow-xl shadow-blue-900/30 overflow-hidden"
            >
                {/* Visual Shine Effect */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-linear-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none" />

                <span className="relative z-10">{label}</span>

                {/* Visual Indicator */}
                <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    className="relative z-10 text-[16px]"
                >
                    →
                </motion.span>
            </a>
    
        </div>
    )
}