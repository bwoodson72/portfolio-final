
'use client'

import { useLenis } from 'lenis/react'
import React from "react";


export function Nav() {
    const lenis = useLenis();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Intercept hash links to use Lenis instead of default browser behavior
        if (href.startsWith('#')) {
            e.preventDefault();
            // Scroll to top if href is just "#", otherwise scroll to the target ID
            const target = href === "#" ? 0 : href;
            lenis?.scrollTo(target);
        }
    };

    return (
        <header className="flex justify-center w-screen fixed top-0 z-50 mt-1">
            <nav className="bg-blue-900/80 backdrop-blur-md w-fit p-3 rounded-3xl shadow-2xl border border-blue-800" aria-label="Main Navigation">
                <ul className="flex justify-center gap-6 text-xl text-gray-300">
                    <li className="hover:text-white transition-colors">
                        <a href="#" onClick={(e) => handleScroll(e, "#")} aria-label="Scroll to Home">Home</a>
                    </li>
                    <li className="hover:text-white transition-colors">
                        <a href="#about" onClick={(e) => handleScroll(e, "#about")} aria-label="Scroll to About section">About</a>
                    </li>
                    <li className="hover:text-white transition-colors">
                        <a href="#projects" onClick={(e) => handleScroll(e, "#projects")} aria-label="Scroll to Projects section">Projects</a>
                    </li>
                    <li className="hover:text-white transition-colors">
                        <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} aria-label="Scroll to Contact section">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}