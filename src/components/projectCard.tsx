import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/content/portfolio";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col rounded-3xl border border-(--color-border) bg-(--color-surface) overflow-hidden transition hover:border-(--color-border-strong)">
      {project.screenshots?.[0] && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.screenshots[0].src}
            alt={project.screenshots[0].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-(--color-text)">{project.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)">
            {project.tagline}
          </p>
        </div>
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
        <div className="flex items-center gap-4 pt-2 mt-auto">
          {project.links?.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-(--color-text) hover:opacity-70 transition"
            >
              <ExternalLink size={14} /> Live site
            </a>
          )}
          {project.links?.repoUrl && (
            <a
              href={project.links.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-(--color-text-muted) hover:text-(--color-text) transition"
            >
              <Github size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
