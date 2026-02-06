import Link from "next/link";
import { siteContent } from "@/content/portfolio";

export const Hero = () => {
  const { hero } = siteContent;

  return (
    <section
      id="top"
      className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32"
    >
      <div className="max-w-[960px] space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[color:var(--color-text)] sm:text-6xl md:text-7xl">
          {hero.headline}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[color:var(--color-text-muted)] md:text-xl">
          {hero.subheadline}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="#work"
            className="rounded-full bg-[color:var(--color-accent)] px-8 py-4 text-sm font-bold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-accent-hover)]"
          >
            {hero.ctaPrimary}
          </Link>
          <Link
            href="#packages"
            className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-8 py-4 text-sm font-bold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-hover)]"
          >
            {hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};
