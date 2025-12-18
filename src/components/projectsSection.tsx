'use client'

import { ProjectCard } from "@/components/projectCard";

const projects = [
    {
        title: "Weather Engine",
        description: "A high-performance weather dashboard featuring dynamic data fetching and real-time SVG weather state rendering.",
        image: "/weather-app.png",
        tags: ["React","Next.js", "Rest API", "Material UI"],
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
        <section id="projects" className="relative flex flex-col items-center gap-6 py-20 px-6 w-full min-h-screen scroll-mt-20 overflow-hidden">

            {/* Ambient Background Glow (optional, matches your hero theme) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-blue-500/5 blur-[120px] -z-10" />

            {/* Header Area */}
            <div className="text-center max-w-3xl mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    Featured Work
                </h2>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                    A collection of projects where I prioritize <span className="text-blue-400 font-medium">refined interactions</span>,
                    <span className="text-white"> responsive layouts</span>, and
                    <span className="text-blue-400 font-medium"> performant frontend architecture</span>.
                </p>
            </div>

            {/* Cards Container - Using Grid for better control than Flex */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        liveUrl={project.liveUrl}
                        repoUrl={project.repoUrl}
                    />
                ))}
            </div>
        </section>
    );
}