import { Metadata } from "next";

export const revalidate = 60;
import Link from "next/link";
import Image from "next/image";
import { ALL_PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { ProjectCard } from "@/lib/sanity/types";

export const metadata: Metadata = {
    title: "Web Design Portfolio | Small Business Websites | Brian Woodson Web Development",
    description: "Custom website design portfolio for small businesses in the DFW area. Every site scores 95 or better on Google's Lighthouse performance audit.",
    openGraph: {
        title: "Web Design Portfolio | Small Business Websites | Brian Woodson Web Development",
        description: "Custom website design portfolio for small businesses in the DFW area. Every site scores 95 or better on Google's Lighthouse performance audit.",
        url: "https://brianwoodson.dev/work",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Web Design Portfolio | Small Business Websites | Brian Woodson Web Development",
        description: "Custom website design portfolio for small businesses in the DFW area. Every site scores 95 or better on Google's Lighthouse performance audit.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://brianwoodson.dev/work",
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

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://brianwoodson.dev/work/#webpage",
                "url": "https://brianwoodson.dev/work",
                "name": "Web Design Portfolio | Small Business Websites | Brian Woodson Web Development",
                "description": "Custom website design portfolio for small businesses in the DFW area. Every site scores 95 or better on Google's Lighthouse performance audit.",
                "isPartOf": {
                    "@type": "WebSite",
                    "url": "https://brianwoodson.dev",
                    "name": "Brian Woodson Web Development"
                },
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://brianwoodson.dev"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Work",
                            "item": "https://brianwoodson.dev/work"
                        }
                    ]
                }
            },
            {
                "@type": "ItemList",
                "name": "Web Design Portfolio",
                "description": "Custom website design projects for small businesses in the DFW area.",
                "itemListElement": projects.map((project, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": project.title,
                    "url": `https://brianwoodson.dev/work/${project.slug.current}`,
                    "description": project.tagline
                }))
            }
        ]
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-6 py-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
                    Web Design Portfolio
                </h1>
                <p className="max-w-2xl text-lg text-text-muted">
                    Custom websites built for small businesses in the DFW area. Every site scores 95 or better on Google's Lighthouse performance audit across performance, accessibility, best practices, and SEO.
                </p>
                <p className="max-w-2xl text-lg text-text-muted mt-4">
                    These are real builds, not templates. Every project includes custom design, conversion-focused copy, and local SEO foundations built in from the start.
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
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
