'use client'

import { useLenis } from 'lenis/react'
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react"; // Install lucide-react if you haven't

export function Nav() {
    const lenis = useLenis();
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = href === "#" ? 0 : href;
            lenis?.scrollTo(target);
            setIsOpen(false); // Close menu on click
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
                        <li key={item} className="relative group/link">
                            <a
                                href={item === 'home' ? '#' : `#${item}`}
                                onClick={(e) => handleScroll(e, item === 'home' ? '#' : `#${item}`)}
                                className="text-white/60 hover:text-white transition-colors duration-300 block py-1"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-blue-500 transition-all duration-300 group-hover/link:w-full" />
                            </a>
                        </li>
                    ))}
                    <li className="flex items-center pl-4 border-l border-white/10">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,1)] animate-pulse" />
                    </li>
                </ul>

                {/* Mobile Trigger & Branding */}
                <div className="flex md:hidden items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,1)] animate-pulse" />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white/70 hover:text-white transition-colors p-1"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
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
                        <ul className="flex flex-col items-center gap-12 text-2xl font-mono font-bold uppercase tracking-[0.3em]">
                            {navLinks.map((item, idx) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <a
                                        href={item === 'home' ? '#' : `#${item}`}
                                        onClick={(e) => handleScroll(e, item === 'home' ? '#' : `#${item}`)}
                                        className="text-white/40 hover:text-blue-500 transition-colors italic"
                                    >
                                        <span className="text-blue-500 not-italic mr-2">0{idx + 1}.</span>
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="absolute bottom-12 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                            // Systems Ready
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}