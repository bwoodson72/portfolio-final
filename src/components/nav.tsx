'use client'

import { useLenis } from 'lenis/react'
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { UPWORK_PROFILE_URL } from "@/content/portfolio";

export function Nav() {
    const lenis = useLenis();
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = href === "#" ? 0 : href;
            lenis?.scrollTo(target);
            setIsOpen(false);
        }
    };

    const navLinks: { label: string; href: string }[] = [
        { label: "Home", href: "#top" },
        { label: "Work", href: "#work" },
        { label: "Packages", href: "#packages" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6">
                <nav className="flex h-20 items-center justify-between">
                    {/* Left: Brand */}
                    <Link 
                        href="#top" 
                        onClick={(e) => handleScroll(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#top')} 
                        className="text-lg font-bold tracking-tighter text-[color:var(--color-text)]"
                    >
                        Brian Woodson
                    </Link>

                    {/* Center: Links */}
                    <ul className="hidden md:flex items-center gap-8 text-sm font-bold text-[color:var(--color-text-muted)]">
                        {navLinks.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    onClick={(e) => handleScroll(e, l.href)}
                                    className="hover:text-[color:var(--color-text)] transition-colors"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right: CTA + Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <Link
                            href={UPWORK_PROFILE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex rounded-full bg-[color:var(--color-surface)] border border-[color:var(--color-border)] px-5 py-2.5 text-xs font-bold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-hover)] transition"
                        >
                            Hire me
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-[color:var(--color-text)]"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                            )}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navLinks.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={(e) => handleScroll(e, l.href)}
                                    className="block text-2xl font-bold text-[color:var(--color-text)]"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <Link
                                href={UPWORK_PROFILE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full rounded-full bg-[color:var(--color-text)] py-4 text-center text-sm font-bold text-[color:var(--color-bg)]"
                            >
                                Hire me on Upwork
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}