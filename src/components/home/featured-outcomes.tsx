import Link from "next/link";
import { FEATURED_PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { ProjectCard } from "@/lib/sanity/types";

export async function FeaturedOutcomes() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;

  const { client } = await import("@/lib/sanity/client");
  const projects = await client.fetch<ProjectCard[]>(FEATURED_PROJECTS_QUERY);

  if (projects.length === 0) return null;

  return (
    <section id="work" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-(--color-text) md:text-5xl">
          Featured Work
        </h2>
        <p className="max-w-2xl text-lg text-(--color-text-muted)">
          A selection of recent projects focused on measurable outcomes and technical excellence.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/work/${project.slug.current}`}
            className="flex flex-col text-left rounded-2xl border border-(--color-border) bg-(--color-surface) p-8 transition hover:border-(--color-border-strong) hover:-translate-y-1"
          >
            <div className="mb-4 inline-block self-start rounded-full bg-(--color-accent) px-3 py-1 text-[10px] font-bold tracking-wider text-(--color-text) uppercase">
              {project.role}
            </div>
            <h3 className="text-xl font-bold text-(--color-text)">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
              {project.tagline}
            </p>
            <div className="mt-8 text-sm font-bold text-(--color-text) hover:underline">
              View details →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
