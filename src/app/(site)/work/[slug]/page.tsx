import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECT_BY_SLUG_QUERY, ALL_PROJECT_SLUGS_QUERY } from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
    try {
        const { client } = await import("@/lib/sanity/client");
        const slugs = await client.fetch<{ slug: string }[]>(ALL_PROJECT_SLUGS_QUERY);
        return slugs.map(({ slug }) => ({ slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return {};
    try {
        const { client, urlFor } = await import("@/lib/sanity/client");
        const project = await client.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
        if (!project) return {};
        const ogImage = project.coverImage
            ? urlFor(project.coverImage).width(1200).height(630).url()
            : "/og-image.png";
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
    } catch {
        return {};
    }
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound();

    const { client, urlFor } = await import("@/lib/sanity/client");
    let project: Project | null = null;
    try {
        project = await client.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
    } catch {
        notFound();
    }

    if (!project) notFound();

    const heroUrl = project.coverImage
        ? urlFor(project.coverImage).width(1200).height(675).auto("format").url()
        : undefined;

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-24 space-y-16">
            {/* Header */}
            <div className="space-y-4">
                {project.role && (
                    <div className="inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-wider text-text uppercase">
                        {project.role}
                    </div>
                )}
                <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-5xl">
                    {project.title}
                </h1>
                <p className="text-xl text-text-muted italic">
                    {project.tagline}
                </p>
            </div>

            {/* Hero screenshot */}
            {heroUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border">
                    <Image
                        src={heroUrl}
                        alt={project.coverImage?.alt ?? project.title}
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
                    <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                        Problem
                    </h2>
                    <ul className="space-y-2">
                        {(project.problem ?? []).map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-text-muted">
                                <span className="text-text">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                        Solution
                    </h2>
                    <ul className="space-y-2">
                        {(project.solution ?? []).map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-text-muted">
                                <span className="text-text">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Stack */}
            <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                    {(project.stack ?? []).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md border border-border bg-bg px-2 py-1 text-[10px] font-mono text-text"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Expected Outcomes */}
            {project.outcome && project.outcome.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                        Expected Outcomes
                    </h2>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {project.outcome.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex gap-3 rounded-xl border border-border bg-bg p-4 text-xs font-bold text-text"
                            >
                                <span className="text-green-400 shrink-0">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Deliverables */}
            <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    Deliverables
                </h2>
                <ul className="grid gap-4 md:grid-cols-2">
                    {(project.deliverables ?? []).map((item, idx) => (
                        <li
                            key={idx}
                            className="rounded-xl border border-border bg-bg p-4 text-xs font-bold text-text"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Additional screenshots */}
            {project.screenshots?.length > 0 && (
                <div className="space-y-6">
                    {project.screenshots.map((shot, idx) => {
                        const src = urlFor(shot).width(1200).height(675).auto("format").url();
                        return (
                            <div
                                key={idx}
                                className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border"
                            >
                                <Image
                                    src={src}
                                    alt={shot.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 1024px"
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Links */}
            {(project.liveUrl || project.loomUrl) && (
                <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-text px-6 py-3 text-xs font-bold text-bg transition hover:opacity-90"
                        >
                            View live site
                        </a>
                    )}
                    {project.loomUrl && (
                        <a
                            href={project.loomUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-border px-6 py-3 text-xs font-bold text-text transition hover:bg-surface-hover"
                        >
                            Watch walkthrough
                        </a>
                    )}
                </div>
            )}

            {/* Bottom CTA */}
            <div className="rounded-3xl border border-border bg-surface p-12 text-center space-y-6">
                <p className="text-lg font-bold text-text">
                    Want something like this for your business?
                </p>
                <Link
                    href="/contact"
                    className="inline-flex rounded-full bg-text px-6 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                >
                    Get in touch
                </Link>
            </div>
        </main>
    );
}
