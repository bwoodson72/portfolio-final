import Link from "next/link";
import { UPWORK_PROFILE_URL } from "@/content/portfolio";

export const FinalCTA = () => {
  return (
    <section id="cta" className="mx-auto w-full max-w-7xl px-6 py-24 text-center">
      <div className="rounded-[3rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-12 md:p-24">
        <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text)] md:text-6xl">
          Ready to ship?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[color:var(--color-text-muted-2)]">
          Pick a package and we’ll get moving this week.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="#packages"
            className="rounded-full bg-[color:var(--color-accent)] px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-[color:var(--color-accent-weak)]"
          >
            View packages
          </Link>
          <Link
            href={UPWORK_PROFILE_URL}
            className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-8 py-4 text-sm font-bold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-hover)]"
          >
            Hire me on Upwork
          </Link>
        </div>
      </div>
    </section>
  );
};
