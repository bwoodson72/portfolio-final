import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ALL_PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { ProjectCard } from "@/lib/sanity/types";

export const metadata: Metadata = {
    title: "Work | Brian Woodson Web Development",
    description: "Case studies and projects — websites designed, written, and built for real businesses.",
    openGraph: {
        title: "Work | Brian Woodson Web Development",
        description: "Case studies and projects — websites designed, written, and built for real businesses.",
        url: "/work",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Work | Brian Woodson Web Development",
        description: "Case studies and projects — websites designed, written, and built for real businesses.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/work",
    },
};

export default async function WorkPage() {
    let projects: ProjectCard[] = [];
    let resolveImageUrl: ((source: ProjectCard["coverImage"]) => string | undefined) | undefined;

    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const { client, urlFor } = await import("@/lib/sanity/client");
        try {
            projects = await client.fetch<ProjectCard[]>(ALL_PROJECTS_QUERY);
            resolveImageUrl = (source) =>
                source ? urlFor(source).width(800).height(450).auto("format").url() : undefined;
        } catch (err) {
            console.error("Failed to fetch projects:", err);
        }
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-6 py-24">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
                    Proof, not promises
                </h1>
                <p className="max-w-2xl text-lg text-text-muted">
                    Every site we ship scores 95+ on Google's performance audit. Here's what that looks like in practice.
                </p>
            </div>

            {projects.length === 0 ? (
                <p className="mt-16 text-text-muted">No projects yet.</p>
            ) : (
                <div className="mt-16 grid gap-8 md:grid-cols-2">
                    {projects.map((project) => {
                        const imageUrl = resolveImageUrl?.(project.coverImage);
                        return (
                            <Link
                                key={project._id}
                                href={`/work/${project.slug.current}`}
                                className="group flex flex-col rounded-3xl border border-border bg-surface overflow-hidden transition hover:border-border-strong"
                            >
                                {imageUrl && (
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <Image
                                            src={imageUrl}
                                            alt={project.coverImage?.alt ?? project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                )}
                                <div className="p-8 space-y-4">
                                    {project.role && (
                                        <div className="inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-wider text-text uppercase">
                                            {project.role}
                                        </div>
                                    )}
                                    <h2 className="text-xl font-bold text-text">
                                        {project.title}
                                    </h2>
                                    <p className="text-sm leading-relaxed text-text-muted">
                                        {project.tagline}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
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
                            </Link>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
