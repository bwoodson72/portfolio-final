import Link from "next/link";
import { siteContent } from "@/content/portfolio";

export const HowIWork = () => {
  const { about } = siteContent;

  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
            {about.headline}
          </h2>
          <div className="space-y-4 text-lg text-text-muted">
            {about.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="inline-block text-sm font-bold text-text hover:underline underline-offset-4"
          >
            More about me →
          </Link>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Primary Stack</h3>
          <div className="flex flex-wrap gap-3">
            {about.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-bold text-text transition hover:border-border-strong"
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
