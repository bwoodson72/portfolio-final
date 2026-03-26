import Link from "next/link";
import { faqs } from "@/content/portfolio";

const SELECTED_QUESTIONS = [
  "Do you write the content/copy?",
  "Do you offer ongoing maintenance?",
  "How do revisions work?",
];

const items = SELECTED_QUESTIONS.map((q) => faqs.find((f) => f.question === q)!);

export function InlineFAQ() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24">
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-4xl">
          Things people ask before they commit
        </h2>
        <p className="text-lg text-text-muted">
          Have more?{" "}
          <Link href="/faq" className="underline hover:text-text transition-colors">
            Check out the full FAQ.
          </Link>
        </p>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.question}>
            <details className="group rounded-2xl border border-border bg-surface open:border-border-strong">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-text marker:content-none list-none select-none">
                {item.question}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-text-muted transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="border-t border-border px-6 py-5">
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.answer}
                </p>
              </div>
            </details>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href="/faq"
          className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-bold text-text transition hover:border-border-strong"
        >
          View all FAQs
        </Link>
      </div>
    </section>
  );
}
