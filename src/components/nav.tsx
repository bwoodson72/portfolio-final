'use client'

import { useLenis } from 'lenis/react'
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Nav() {
    const lenis = useLenis();
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = href === "#" ? 0 : href;
            lenis?.scrollTo(target);
            setIsOpen(false);
        }
    };

    const navLinks = ['home', 'about', 'projects', 'contact'];

    return (
        <header className="flex justify-center w-full fixed top-4 md:top-6 z-50 px-4 pointer-events-none">
            {/* --- Desktop & Mobile Capsule --- */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="pointer-events-auto bg-[#0c0c0c]/80 backdrop-blur-xl py-2 md:py-3 px-5 md:px-8 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.7)] border border-white/10 flex items-center justify-between transition-all duration-500"
            >
                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-10 text-[13px] font-mono font-bold uppercase tracking-[0.2em]">
                    {navLinks.map((item) => (
                        <li key={item} className="relative group">
                            <a
                                href={item === 'home' ? '#' : `#${item}`}
                                onClick={(e) => handleScroll(e, item === 'home' ? '#' : `#${item}`)}
                                className="text-white/60 hover:text-white transition-colors duration-300 block py-1"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
                            </a>
                        </li>
                    ))}
                    <li className="flex items-center pl-4 border-l border-white/10">
                        {/* v4 Syntax: size-2 */}
                        <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,1)] animate-pulse" />
                    </li>
                </ul>

                {/* Mobile Trigger & Branding */}
                <div className="flex md:hidden items-center gap-4">
                    <div className="size-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,1)] animate-pulse" />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white/70 hover:text-white active:text-blue-500 transition-colors p-1"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* --- Mobile Full-Screen Overlay --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 bg-black/90 z-[-1] flex flex-col items-center justify-center md:hidden pointer-events-auto"
                    >
                        <ul className="flex flex-col items-center gap-10 text-2xl font-mono font-bold uppercase tracking-[0.3em]">
                            {navLinks.map((item, idx) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <motion.a
                                        href={item === 'home' ? '#' : `#${item}`}
                                        onClick={(e) => handleScroll(e, item === 'home' ? '#' : `#${item}`)}
                                        className="text-white/40 block py-2 transition-colors duration-200"
                                        // The Neon Flash Interaction
                                        whileTap={{
                                            color: "#ffffff",
                                            textShadow: "0px 0px 8px rgb(59, 130, 246)",
                                            scale: 1.05 // Subtle pop to emphasize the light
                                        }}
                                    >
                                        {item}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="absolute bottom-12 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                            {' // Systems Ready'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}