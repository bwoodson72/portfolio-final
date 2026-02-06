import { siteContent } from "@/content/portfolio";

export const HowIWork = () => {
  const { about } = siteContent;

  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-[color:var(--color-border)]">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text)] md:text-5xl">
            {about.headline}
          </h2>
          <div className="space-y-4 text-lg text-[color:var(--color-text-muted)]">
            {about.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">Primary Stack</h3>
          <div className="flex flex-wrap gap-3">
            {about.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-bold text-[color:var(--color-text)] transition hover:border-[color:var(--color-border-strong)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
