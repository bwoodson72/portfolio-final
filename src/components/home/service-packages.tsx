'use client'

import Link from "next/link";
import { siteContent } from "@/content/portfolio";
import { trackEvent } from "@/lib/analytics/events";

export const ServicePackages = () => {
  const { packages } = siteContent;

  return (
    <section id="packages" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Fixed-scope Packages
        </h2>
        <p className="max-w-2xl text-lg text-text-muted">
          Productized services with clear deliverables, fast timelines, and transparent pricing.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`flex flex-col rounded-3xl border bg-surface p-8 shadow-sm transition hover:border-border-strong ${pkg.recommended ? "border-border-strong" : "border-border"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                {pkg.recommended && (
                  <div className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-text">{pkg.name}</h3>
              </div>
              <div className="text-sm font-bold text-text">
                From ${pkg.priceFrom.toLocaleString()}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              {pkg.description}
            </p>

            <div className="mt-8 space-y-6 grow">
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">What&#39;s included</h4>
                <ul className="space-y-2">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-text-muted">
                      <span className="text-text font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  <span>Timeline</span>
                  <span className="text-text">{pkg.timeline}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/contact?package=${encodeURIComponent(pkg.name)}`}
              onClick={() => trackEvent("package_click", { package: pkg.name })}
              className="mt-8 block w-full rounded-full bg-text py-3 text-center text-sm font-bold text-bg transition hover:opacity-90"
            >
              Get started
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-text-muted">
        I take on 2–3 projects at a time to keep quality high. Currently booking for <strong className="text-text">July 2025</strong>.
      </p>
    </section>
  );
};
