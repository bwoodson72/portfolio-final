import Link from "next/link";
import Image from "next/image";
import { FEATURED_PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { ProjectCard } from "@/lib/sanity/types";

export async function FeaturedWork() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;

  const { client, urlFor } = await import("@/lib/sanity/client");
  let projects: ProjectCard[] = [];
  try {
    projects = await client.fetch<ProjectCard[]>(FEATURED_PROJECTS_QUERY);
  } catch (err) {
    console.error("Failed to fetch featured projects:", err);
    return null;
  }

  if (projects.length === 0) return null;

  return (
    <section id="work" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Proof, not promises
        </h2>
        <p className="max-w-2xl text-lg text-text-muted">
          Every site we ship scores 95+ on Google&#39;s performance audit. Here&#39;s what that looks like in practice.
        </p>
      </div>

      <div className="mt-12 grid gap-6  lg:grid-cols-3 row-auto">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/work/${project.slug.current}`}
            className="group flex w-full min-w-xs  flex-col text-left rounded-2xl border border-border bg-surface overflow-hidden transition hover:border-border-strong hover:-translate-y-1"
          >
            {project.coverImage && (
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={urlFor(project.coverImage).width(800).height(450).auto("format").url()}
                  alt={project.coverImage.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="flex flex-col flex-1 p-6 space-evenly">
              {project.role && (
                <div className="mb-3 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-wider text-text uppercase">
                  {project.role}
                </div>
              )}

              <div className="flex flex-col flex-1">
              <h3 className="text-xl font-bold text-text">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {project.tagline}
              </p>
              </div>
              <div className="mt-6 text-sm font-bold justify-self-end text-text">
                View details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
