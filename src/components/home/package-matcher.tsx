"use client";

import * as React from "react";
import { type PortfolioCategory } from "@/content/portfolio";

export const PackageMatcher = () => {
  const [step, setStep] = React.useState(1);
  const [recommendation, setRecommendation] = React.useState<PortfolioCategory | null>(null);

  const handleGoal = (goal: string) => {
    if (goal === "MVP") setRecommendation("MVP");
    else if (goal === "BUGFIX") setRecommendation("BUGFIX");
    else setRecommendation("LANDING");
    setStep(2);
  };

  const handleRecommend = () => {
    const event = new CustomEvent("selectPortfolioCategory", { detail: recommendation });
    window.dispatchEvent(event);
  };

  return (
    <section id="matcher" className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <div className="rounded-[3rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 text-[color:var(--color-text)] md:p-16">
        {step === 1 ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold md:text-4xl text-[color:var(--color-text)]">What’s your goal?</h2>
            <div className="flex flex-col gap-4 md:flex-row md:justify-center">
              <button
                onClick={() => handleGoal("MVP")}
                className="rounded-full bg-[color:var(--color-accent)] px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-[color:var(--color-accent-weak)]"
              >
                Ship MVP
              </button>
              <button
                onClick={() => handleGoal("BUGFIX")}
                className="rounded-full bg-[color:var(--color-accent)] px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-[color:var(--color-accent-weak)]"
              >
                Fix bugs
              </button>
              <button
                onClick={() => handleGoal("LANDING")}
                className="rounded-full bg-[color:var(--color-accent)] px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-[color:var(--color-accent-weak)]"
              >
                Increase conversions
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold md:text-4xl text-[color:var(--color-text)]">We recommend: {recommendation}</h2>
            <ul className="mx-auto max-w-xs space-y-2 text-left text-[color:var(--color-text-muted-2)]">
              <li className="flex items-center gap-2">
                <span className="text-[color:var(--color-text)]">✓</span> Tailored for your current stage
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[color:var(--color-text)]">✓</span> Fixed-scope for clear delivery
              </li>
            </ul>
            <div className="flex flex-col gap-4 md:flex-row md:justify-center">
              <button
                onClick={handleRecommend}
                className="rounded-full bg-[color:var(--color-accent)] px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-[color:var(--color-accent-weak)]"
              >
                See {recommendation} packages
              </button>
              <button
                onClick={() => setStep(1)}
                className="text-sm font-bold text-[color:var(--color-text-muted-2)] transition hover:text-[color:var(--color-text)] hover:underline underline-offset-4"
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
