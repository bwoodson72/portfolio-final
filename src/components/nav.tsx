
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
        <div className="flex justify-center w-screen fixed top-0 z-50 mt-1">
            <nav className="bg-blue-900/80 backdrop-blur-md w-fit p-3 rounded-3xl shadow-2xl border border-blue-800">
                <ul className="flex justify-center gap-6 text-xl text-gray-300">
                    <li className="hover:text-white transition-colors">
                        <a href="#" onClick={(e) => handleScroll(e, "#")}>Home</a>
                    </li>
                    <li className="hover:text-white transition-colors">
                        <a href="#about" onClick={(e) => handleScroll(e, "#about")}>About</a>
                    </li>
                    <li className="hover:text-white transition-colors">
                        <a href="#projects" onClick={(e) => handleScroll(e, "#projects")}>Projects</a>
                    </li>
                    <li className="hover:text-white transition-colors">
                        <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}