'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackEvent } from "@/lib/analytics/events";

const auditSchema = z.object({
  url: z
    .string()
    .min(1, { error: "Enter a website URL" })
    .refine(
      (val) => {
        const withProtocol = /^https?:\/\//i.test(val) ? val : "https://" + val;
        try {
          const parsed = new URL(withProtocol);
          return parsed.hostname.includes(".");
        } catch {
          return false;
        }
      },
      { message: "Enter a valid URL (e.g. example.com or https://example.com)" }
    ),
});

type AuditInput = z.infer<typeof auditSchema>;

export function AuditCta() {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuditInput>({
    resolver: zodResolver(auditSchema),
    defaultValues: { url: "" },
  });

  const onSubmit = async (data: AuditInput) => {
    let normalizedUrl = data.url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = "https://" + normalizedUrl;
    }
    trackEvent("audit_submit", { url: normalizedUrl });
    const slug = btoa(encodeURIComponent(normalizedUrl))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    setNavigating(true);
    router.push(`/audit/${slug}`);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Is your website costing you customers?
        </h2>
        <p className="max-w-2xl text-lg text-text-muted">
          Enter your URL and get a free performance, SEO, and accessibility audit. Takes 30 seconds — and you might not like what you find.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            {...register("url")}
            type="text"
            placeholder="https://yourwebsite.com"
            aria-invalid={!!errors.url}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted-2 focus:outline-none transition-colors ${errors.url ? "border-red-500/50 focus:border-red-500/70" : "border-border focus:border-border-strong"}`}
          />
          <button
            type="submit"
            disabled={isSubmitting || navigating}
            className="rounded-xl bg-text text-bg px-6 py-3 text-sm font-bold transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting || navigating ? "Analyzing..." : "Run free audit"}
          </button>
        </div>
        {errors.url && (
          <p role="alert" className="text-sm text-red-400 mt-2">
            {errors.url.message}
          </p>
        )}
      </form>
    </section>
  );
}
