import { ProjectCard } from "@/components/projectCard";

export function ProjectsSection() {
    return (
        <section id="projects" className="flex flex-col items-center gap-6 p-10 w-full min-h-screen scroll-mt-20">
            {/* Header Area - Focused on UI/UX & Interaction */}
            <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold mt-14 mb-4">Featured Work</h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                    A collection of projects where I prioritize <strong>refined interactions</strong>,
                    <strong>responsive layouts</strong>, and <strong>performant frontend architecture</strong>.
                </p>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col items-center justify-center w-full gap-12 mt-12 md:flex-row md:flex-wrap md:items-start md:justify-center">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </section>
    )
}