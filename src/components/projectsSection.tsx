import { siteContent } from "@/content/portfolio";
import { ProjectCard } from "@/components/projectCard";

export const ProjectsSection = () => {
  const featured = siteContent.projects.filter((p) => p.featured && p.problem.length > 0);
  const more = siteContent.projects.filter((p) => !p.featured && p.problem.length > 0);

  return (
    <section id="work" className="mx-auto w-full max-w-7xl px-6 py-24 space-y-16">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-(--color-text) md:text-5xl">
          Featured Work
        </h2>
        <p className="max-w-2xl text-lg text-(--color-text-muted)">
          A selection of recent projects focused on measurable outcomes and technical excellence.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {more.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-(--color-text)">More Work</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {more.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
