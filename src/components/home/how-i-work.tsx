import { howIWorkSteps } from "@/content/portfolio";

export const HowIWork = () => {
  return (
    <section id="process" className="mx-auto w-full max-w-7xl px-6 py-24">
      <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text)] md:text-5xl">
        How I work
      </h2>
      <div className="mt-12 grid gap-12 md:grid-cols-4">
        {howIWorkSteps.map((step, idx) => (
          <div key={step.title} className="space-y-4">
            <div className="text-4xl font-extrabold text-[color:var(--color-text)]/80">
              0{idx + 1}
            </div>
            <h3 className="text-xl font-bold text-[color:var(--color-text)]">{step.title}</h3>
            <p className="text-sm leading-relaxed text-[color:var(--color-text-muted-2)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
