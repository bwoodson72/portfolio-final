'use client'

import { useLenis } from 'lenis/react'
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { INTAKE_URL, UPWORK_PROFILE_URL } from "@/content/portfolio";

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

    const desktopLinks: { label: string; href: string }[] = [
        { label: "Home", href: "#top" },
        { label: "Work", href: "#work" },
        { label: "Packages", href: "#packages" },
        { label: "Process", href: "#process" },
        { label: "FAQ", href: "#faq" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[color:var(--color-border)]/80 bg-[color:var(--color-bg)]/70 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <motion.nav
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex h-16 items-center justify-between"
                >
                    {/* Left: Brand */}
                    <div className="flex items-center gap-3">
                        <Link href="#top" onClick={(e) => handleScroll(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#top')} className="text-sm font-bold tracking-tight text-[color:var(--color-text)]">
                            Brian Woodson
                        </Link>
                        <span className="hidden md:inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)] shadow-[var(--text-glow-blue)] animate-pulse" />
                    </div>

                    {/* Center/Right: Links */}
                    <ul className="hidden md:flex items-center gap-6 text-sm font-semibold text-[color:var(--color-text-muted-2)]">
                        {desktopLinks.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    onClick={(e) => handleScroll(e, l.href)}
                                    className="px-2 py-1 rounded-md hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-hover)]/40 transition"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right: CTAs + Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={UPWORK_PROFILE_URL}
                            className="hidden md:inline-flex rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-xs font-bold text-slate-950 hover:bg-[color:var(--color-accent-weak)] transition"
                        >
                            Hire me on Upwork
                        </Link>
                        <Link
                            href={INTAKE_URL}
                            className="hidden md:inline-flex rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-xs font-bold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-hover)] transition"
                        >
                            Submit intake
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[color:var(--color-text-muted-2)] hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-hover)]/40 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                            )}
                        </button>
                    </div>
                </motion.nav>
            </div>

            {/* Mobile Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 backdrop-blur-xl"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {desktopLinks.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={(e) => handleScroll(e, l.href)}
                                    className="block rounded-lg px-3 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-hover)]"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <div className="h-px bg-[color:var(--color-border)] my-2" />
                            <a
                                href={UPWORK_PROFILE_URL}
                                className="block text-center rounded-full bg-[color:var(--color-accent)] px-4 py-3 text-sm font-bold text-slate-950 hover:bg-[color:var(--color-accent-weak)]"
                            >
                                Hire me on Upwork
                            </a>
                            <a
                                href={INTAKE_URL}
                                className="block text-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 text-sm font-bold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-hover)]"
                            >
                                Submit intake
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}