import Link from "next/link";
import { siteContent } from "@/content/portfolio";

export const FinalCTA = () => {
  const { cta } = siteContent;

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-24 text-center">
      <div className="rounded-[3rem] border border-(--color-border) bg-(--color-surface) p-12 md:p-24 space-y-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-(--color-text) md:text-6xl">
          {cta.headline}
        </h2>
        <p className="mx-auto max-w-xl text-lg text-(--color-text-muted)">
          {cta.body}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/contact"
            className="rounded-full bg-(--color-text) px-8 py-4 text-sm font-bold text-(--color-bg) transition hover:opacity-90"
          >
            Get in touch
          </Link>
          <Link
            href="/"
            className="text-sm font-bold text-(--color-text-muted) transition hover:text-(--color-text) hover:underline underline-offset-4"
          >
            Back to top
          </Link>
        </div>
      </div>
    </section>
  );
};
