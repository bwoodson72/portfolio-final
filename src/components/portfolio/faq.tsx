import { faqs } from "@/content/portfolio";

export const Faq = (): JSX.Element => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          FAQ
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Answers to common questions
        </h2>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {faqs.map((item) => (
          <div
            key={item.question}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {item.question}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
