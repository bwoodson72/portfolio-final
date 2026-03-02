import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/content/portfolio";

export const metadata: Metadata = {
    title: "Work | Brian Woodson",
    description: "Projects and case studies",
};

export default function WorkPage() {
    const projects = siteContent.projects.filter((p) => p.problem.length > 0);

    return (
        <main className="mx-auto w-full max-w-7xl px-6 py-24">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-(--color-text) md:text-6xl">
                    Work
                </h1>
                <p className="max-w-2xl text-lg text-(--color-text-muted)">
                    Projects and case studies.
                </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/work/${project.slug}`}
                        className="group flex flex-col rounded-3xl border border-(--color-border) bg-(--color-surface) overflow-hidden transition hover:border-(--color-border-strong)"
                    >
                        {project.screenshots?.[0] && (
                            <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={project.screenshots[0].src}
                                    alt={project.screenshots[0].alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        )}
                        <div className="p-8 space-y-4">
                            {project.role && (
                                <div className="inline-block rounded-full bg-(--color-accent) px-3 py-1 text-[10px] font-bold tracking-wider text-(--color-text) uppercase">
                                    {project.role}
                                </div>
                            )}
                            <h2 className="text-xl font-bold text-(--color-text)">
                                {project.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-(--color-text-muted)">
                                {project.tagline}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-md border border-(--color-border) bg-(--color-bg) px-2 py-1 text-[10px] font-mono text-(--color-text)"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
