import Link from "next/link";
import { siteContent } from "@/content/portfolio";

export const FinalCTA = () => {
  const { cta } = siteContent;

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-24 text-center">
      <div className="rounded-[3rem] border border-border bg-surface p-12 md:p-24 space-y-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-6xl">
          {cta.headline}
        </h2>
        <p className="mx-auto max-w-xl text-lg text-text-muted">
          {cta.body}
        </p>
        <div className="flex items-center justify-center">
          <Link
            href="/contact"
            className="rounded-full bg-text px-8 py-4 text-sm font-bold text-bg transition hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
};
