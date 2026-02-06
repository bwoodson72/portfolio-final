"use client";

import * as React from "react";
import { siteContent, type Project } from "@/content/portfolio";
import { motion, AnimatePresence } from "motion/react";

export const FeaturedOutcomes = () => {
  const { projects } = siteContent;
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <section id="work" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text)] md:text-5xl">
          Featured Work
        </h2>
        <p className="max-w-2xl text-lg text-[color:var(--color-text-muted)]">
          A selection of recent projects focused on measurable outcomes and technical excellence.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.slug}
            onClick={() => setSelectedProject(project)}
            className="flex flex-col text-left rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 transition hover:border-[color:var(--color-border-strong)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-text-muted)]/20"
          >
            <div className="mb-4 inline-block self-start rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-[10px] font-bold tracking-wider text-[color:var(--color-text)] uppercase">
              {project.role}
            </div>
            <h3 className="text-xl font-bold text-[color:var(--color-text)]">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
              {project.tagline}
            </p>
            <div className="mt-8 text-sm font-bold text-[color:var(--color-text)] hover:underline">
              View details →
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-[color:var(--color-bg)]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl border-l border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-2xl overflow-y-auto md:p-12"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-8 top-8 text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>

              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="inline-block rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-[10px] font-bold tracking-wider text-[color:var(--color-text)] uppercase">
                    {selectedProject.role}
                  </div>
                  <h2 className="text-3xl font-extrabold text-[color:var(--color-text)] md:text-4xl">
                    {selectedProject.title}
                  </h2>
                  <p className="text-lg text-[color:var(--color-text-muted)] italic">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">Problem</h4>
                    <ul className="space-y-2">
                      {selectedProject.problem.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-[color:var(--color-text-muted)]">
                          <span className="text-[color:var(--color-text)]">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">Solution</h4>
                    <ul className="space-y-2">
                      {selectedProject.solution.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-[color:var(--color-text-muted)]">
                          <span className="text-[color:var(--color-text)]">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span key={tech} className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-2 py-1 text-[10px] font-mono text-[color:var(--color-text)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">Deliverables</h4>
                  <ul className="grid gap-4 md:grid-cols-2">
                    {selectedProject.deliverables.map((item, idx) => (
                      <li key={idx} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 text-xs font-bold text-[color:var(--color-text)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.links && (
                  <div className="flex flex-wrap gap-4 pt-8 border-t border-[color:var(--color-border)]">
                    {selectedProject.links.liveUrl && (
                      <a href={selectedProject.links.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[color:var(--color-text)] px-6 py-3 text-xs font-bold text-[color:var(--color-bg)] transition hover:opacity-90">
                        View live site
                      </a>
                    )}
                    {selectedProject.links.loomUrl && (
                      <a href={selectedProject.links.loomUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[color:var(--color-border)] px-6 py-3 text-xs font-bold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-hover)]">
                        Watch walkthrough
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
