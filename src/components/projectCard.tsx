'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react" // npm install lucide-react

interface ProjectProps {
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
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -10 }} // Subtle lift on hover
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative flex flex-col gap-4 w-full bg-gray-900/40 border border-white/10 rounded-3xl p-4 hover:border-blue-500/50 transition-colors duration-500"
        >
            {/* Image Container with Hover Zoom */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-2 px-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <div className="flex gap-3 text-gray-400">
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label={`View ${title} source code on GitHub`}>
                            <Github size={20} aria-hidden="true" />
                        </a>
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label={`View ${title} live demo`}>
                            <ExternalLink size={20} aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}