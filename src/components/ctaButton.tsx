'use client'

import { motion } from "motion/react"

export function CtaButton({ label, href }: { label: string; href: string }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(37, 99, 235, 0.45)"
            }}
            whileTap={{ scale: 0.98 }}
            animate={{
                rotate: [0, -1.5, 1.5, -1.5, 1.5, 0],
            }}
            transition={{
                delay: 5,
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 8
            }}
            className="relative group pointer-events-auto"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

            <a
                href={href}
                aria-label={label}
                className="relative flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-mono text-[13px] md:text-[14px] font-bold uppercase tracking-[0.25em] transition-all duration-300 border border-blue-400/30 shadow-xl shadow-blue-900/30 overflow-hidden"
            >
                {/* Visual Shine Effect */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none" />

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
        </motion.div>
    )
}