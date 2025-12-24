'use client'

import { motion } from "motion/react"
import { ReactNode } from "react";
import Image from "next/image";

export interface PerformanceCardProps {
    title: string;
    description: string;
    tags: string[];
    visual?: ReactNode; // Preferred: The code-based visuals we just made
    image?: string;     // Fallback: A static image file
}

export function PerformanceCard({ title, description, tags, visual, image }: PerformanceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group flex flex-col gap-5 w-full bg-white/5 border border-white/10 rounded-3xl p-5 hover:border-red-500/30 transition-colors duration-300"
        >
            {/* Visual Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-black/50 group-hover:border-red-500/20 transition-colors flex items-center justify-center">

                {visual ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                        {visual}
                    </div>
                ) : (
                    /* Fallback: Next.js Optimized Image */
                    image && (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    )
                )}

            </div>

            <div className="flex flex-col gap-3 grow">
                <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors leading-tight">
                    {title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm line-clamp-3">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}