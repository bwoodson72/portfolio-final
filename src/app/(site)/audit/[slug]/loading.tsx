'use client'

import { motion } from "motion/react";

const CATEGORIES = ["Performance", "Accessibility", "Best Practices", "SEO"];

export default function AuditLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-24 space-y-4">
      <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
        Analyzing your website...
      </h1>
      <p className="text-lg text-text-muted max-w-xl">
        Running performance, accessibility, and SEO checks. This usually takes 15–30 seconds.
      </p>

      <div className="w-full max-w-md h-2 rounded-full bg-surface border border-border overflow-hidden mt-8">
        <motion.div
          className="h-full rounded-full bg-blue-600"
          animate={{ width: "90%" }}
          transition={{ duration: 20, ease: "easeOut" }}
          style={{ width: "0%" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mt-12">
        {CATEGORIES.map((label) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-6 text-center">
            <div className="h-10 w-16 mx-auto rounded-lg bg-border/50 animate-pulse" />
            <div className="text-xs font-bold uppercase tracking-widest text-text-muted mt-2">
              {label}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
