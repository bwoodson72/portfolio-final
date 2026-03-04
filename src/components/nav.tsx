'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks: { label: string; href: string }[] = [
        { label: "Work", href: "/work" },
        { label: "Knowledge", href: "/knowledge" },
        { label: "Packages", href: "/#packages" },
        { label: "About", href: "/about" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6">
                <nav className="flex h-20 items-center justify-between">
                    {/* Left: Brand */}
                    <Link
                        href="/"
                        className="text-lg font-bold tracking-tighter text-text"
                    >
                        Brian Woodson
                    </Link>

                    {/* Center: Links */}
                    <ul className="hidden md:flex items-center gap-8 text-sm font-bold text-text-muted">
                        {navLinks.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className="hover:text-text transition-colors"
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right: Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-text"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                        )}
                    </button>
                </nav>
            </div>

            {/* Mobile Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-bg"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navLinks.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-2xl font-bold text-text"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
