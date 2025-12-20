'use client'

import { motion } from "motion/react"
import Image from "next/image"

export interface ProjectProps {
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
}

export function ProjectCard({ title, description, image, tags, liveUrl, repoUrl }: ProjectProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group flex flex-col gap-5 w-full bg-white/5 border border-white/10 rounded-3xl p-5 hover:border-blue-500/30 transition-colors duration-300"
        >
            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-gray-900">
                <Image
                    src={image}
                    alt={`${title} project preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={85}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-3 grow">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {title}
                    </h3>

                    {/* Action Links */}
                    <div className="flex gap-3 text-gray-400 shrink-0 pt-1">
                        <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors p-1"
                            aria-label={`View ${title} source code on GitHub`}
                        >
                            {/* Inline GitHub SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-github"
                            >
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36 1.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                                <path d="M9 18c-4.51 2-5-2-7-2"/>
                            </svg>
                        </a>
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors p-1"
                            aria-label={`View ${title} live demo`}
                        >
                            {/* Inline External Link SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-external-link"
                            >
                                <path d="M15 3h6v6"/>
                                <path d="M10 14 21 3"/>
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <p className="text-gray-400 leading-relaxed text-sm line-clamp-3">
                    {description}
                </p>

                {/* Tech Tags - Using mt-auto to push to bottom if card height varies */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}