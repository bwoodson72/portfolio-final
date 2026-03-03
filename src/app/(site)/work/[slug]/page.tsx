import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { siteContent } from "@/content/portfolio";

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return siteContent.projects
        .filter((p) => p.problem.length > 0)
        .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = siteContent.projects.find((p) => p.slug === slug);
    if (!project) return {};
    const ogImage = project.screenshots?.[0]?.src ?? "/og-image.png";
    return {
        title: project.title,
        description: project.tagline,
        openGraph: {
            type: "article",
            title: project.title,
            description: project.tagline,
            url: `/work/${slug}`,
            images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.tagline,
            images: [ogImage],
        },
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const project = siteContent.projects.find((p) => p.slug === slug);

    if (!project || project.problem.length === 0) notFound();

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-24 space-y-16">
            {/* Header */}
            <div className="space-y-4">
                {project.role && (
                    <div className="inline-block rounded-full bg-(--color-accent) px-3 py-1 text-[10px] font-bold tracking-wider text-(--color-text) uppercase">
                        {project.role}
                    </div>
                )}
                <h1 className="text-4xl font-extrabold tracking-tight text-(--color-text) md:text-5xl">
                    {project.title}
                </h1>
                <p className="text-xl text-(--color-text-muted) italic">
                    {project.tagline}
                </p>
            </div>

            {/* Screenshot */}
            {project.screenshots?.[0] && (
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-(--color-border)">
                    <Image
                        src={project.screenshots[0].src}
                        alt={project.screenshots[0].alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                </div>
            )}

            {/* Problem / Solution */}
            <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                        Problem
                    </h2>
                    <ul className="space-y-2">
                        {project.problem.map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-(--color-text-muted)">
                                <span className="text-(--color-text)">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                        Solution
                    </h2>
                    <ul className="space-y-2">
                        {project.solution.map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-(--color-text-muted)">
                                <span className="text-(--color-text)">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Stack */}
            <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                    Stack
                </h2>
                <div className="flex flex-wrap gap-2">
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

            {/* Deliverables */}
            <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                    Deliverables
                </h2>
                <ul className="grid gap-4 md:grid-cols-2">
                    {project.deliverables.map((item, idx) => (
                        <li
                            key={idx}
                            className="rounded-xl border border-(--color-border) bg-(--color-bg) p-4 text-xs font-bold text-(--color-text)"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Links */}
            {project.links && (project.links.liveUrl || project.links.loomUrl) && (
                <div className="flex flex-wrap gap-4 pt-8 border-t border-(--color-border)">
                    {project.links.liveUrl && (
                        <a
                            href={project.links.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-(--color-text) px-6 py-3 text-xs font-bold text-(--color-bg) transition hover:opacity-90"
                        >
                            View live site
                        </a>
                    )}
                    {project.links.loomUrl && (
                        <a
                            href={project.links.loomUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-(--color-border) px-6 py-3 text-xs font-bold text-(--color-text) transition hover:bg-(--color-surface-hover)"
                        >
                            Watch walkthrough
                        </a>
                    )}
                </div>
            )}

            {/* Bottom CTA */}
            <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-12 text-center space-y-6">
                <p className="text-lg font-bold text-(--color-text)">
                    Interested in a similar project?
                </p>
                <Link
                    href="/contact"
                    className="inline-flex rounded-full bg-(--color-text) px-6 py-3 text-sm font-bold text-(--color-bg) transition hover:opacity-90"
                >
                    Get in touch
                </Link>
            </div>
        </main>
    );
}
