import Link from "next/link";
import { FEATURED_PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { ProjectCard } from "@/lib/sanity/types";

export async function ProjectHighlights() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;

  const { client } = await import("@/lib/sanity/client");
  let projects: ProjectCard[] = [];
  try {
    projects = await client.fetch<ProjectCard[]>(FEATURED_PROJECTS_QUERY);
  } catch {
    return null;
  }

  const withQuotes = projects.filter((p) => p.highlightQuote);
  if (withQuotes.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4 text-center md:text-left mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          What I&apos;ve Built
        </h2>
        <p className="max-w-2xl text-lg text-text-muted">
          Results from recent projects.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {withQuotes.map((project) => (
          <Link
            key={project._id}
            href={`/work/${project.slug.current}`}
            className="flex flex-col rounded-2xl border border-border bg-surface p-8 transition hover:border-border-strong hover:-translate-y-1"
          >
            <p className="text-sm leading-relaxed text-text-muted flex-1">
              {project.highlightQuote}
            </p>
            <div className="mt-6 pt-4 border-t border-border">
              <span className="text-sm font-bold text-text">{project.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
