import { faqs } from "@/content/portfolio";

export const FAQ = () => {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-24">
      <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text)] md:text-5xl">
        FAQ
      </h2>
      <div className="mt-12 space-y-6">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 transition-all hover:border-[color:var(--color-border-strong)]"
          >
            <summary className="flex cursor-pointer items-center justify-between text-lg font-bold text-[color:var(--color-text)] focus:outline-none list-none">
              {faq.question}
              <span className="text-[color:var(--color-text-muted-2)] transition group-open:rotate-180">
                ↓
              </span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-text-muted-2)]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};
