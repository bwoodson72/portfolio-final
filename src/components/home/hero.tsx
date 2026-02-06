import Link from "next/link";
import { UPWORK_PROFILE_URL, INTAKE_URL } from "@/content/portfolio";

export const Hero = () => {
  return (
    <section
      id="top"
      className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32"
    >
      <div className="max-w-[960px] space-y-8">
        <div className="inline-block rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-1.5 text-xs font-bold tracking-wider text-[color:var(--color-text-muted-2)] uppercase">
          FIXED-SCOPE UPWORK PACKAGES FOR FOUNDERS
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[color:var(--color-text)] sm:text-6xl md:text-7xl">
          Ship your next product win with a senior <br className="hidden md:block" />
          Next.js partner
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[color:var(--color-text-muted-2)] md:text-xl">
          I help product teams and founders launch MVPs, stabilize bugs, and improve
          conversions with fixed-scope engagements designed for Upwork. Fast
          timelines, clear deliverables, and measurable outcomes.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href={UPWORK_PROFILE_URL}
            className="rounded-full bg-[color:var(--color-accent)] px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-[color:var(--color-accent-weak)]"
          >
            Hire me on Upwork
          </Link>
          <Link
            href="#packages"
            className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-8 py-4 text-sm font-bold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-hover)]"
          >
            See packages & pricing
          </Link>
          <Link
            href={INTAKE_URL}
            className="text-sm font-bold text-[color:var(--color-text-muted-2)] transition hover:text-[color:var(--color-text)] hover:underline underline-offset-4"
          >
            Submit intake (5 min)
          </Link>
        </div>
      </div>
    </section>
  );
};
