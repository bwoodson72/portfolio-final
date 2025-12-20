'use client'

import { ProjectCard } from "@/components/projectCard";
import { motion } from "motion/react";
import Divider from "@/components/divider";

// 1. Pure TypeScript Interface (Zero runtime bundle size)
export interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
}

const projects: Project[] = [
    {
        title: "Weather Engine",
        description: "A high-performance weather dashboard featuring dynamic data fetching and real-time SVG weather state rendering.",
        image: "/weather-app.png",
        tags: ["React", "Next.js", "Rest API", "Material UI"],
        liveUrl: "https://weather-vert-psi-84.vercel.app",
        repoUrl: "https://github.com/bwoodson72/weather"
    },
    {
        title: "Modern Form Architecture",
        description: "A complex multi-step validation system utilizing Zod and React Hook Form to ensure data integrity and smooth UX.",
        image: "/form.webp",
        tags: ["Next.js", "Zod", "React Hook Form"],
        liveUrl: "https://react-hook-form-plum.vercel.app",
        repoUrl: "https://github.com/bwoodson72/react_hook_form"
    },
    {
        title: "Premium Landing Page",
        description: "An SEO-optimized marketing site focused on high-speed performance, accessibility, and fluid motion design.",
        image: "/aetheria-landing-page.webp",
        tags: ["Framer Motion", "Next.js", "Tailwind"],
        liveUrl: "https://aetheria-landing-page.vercel.app/",
        repoUrl: "https://github.com/bwoodson72/aetheria--landing-page"
    }
];

export function ProjectsSection() {
    return (
        <>
            <section id="projects" className="relative flex flex-col items-center py-32 px-6 w-full min-h-screen scroll-mt-20 bg-transparent overflow-hidden">

                {/* Ambient Background Glow (Marked decorative) */}
                <div
                    aria-hidden="true"
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-125 bg-blue-600/10 blur-[150px] -z-10 pointer-events-none"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-4xl mb-24 space-y-4"
                >
                    <span className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase italic">

                        { '// Selected Works' }
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase italic leading-none">
                        Featured <span className="text-blue-500 not-italic">Artifacts.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl mx-auto pt-4 italic">
                        Architecting digital interfaces with a focus on <span className="text-blue-400">performance</span>,
                        <span className="text-white/80"> motion</span>, and accessibility.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl relative z-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="flex h-full"
                        >
                            {/* Spread props safely since they match the Interface */}
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </section>
            <Divider/>
        </>
    );
}