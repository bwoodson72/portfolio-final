'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendAuditReport } from "@/app/actions/sendAuditReport";
import { trackEvent } from "@/lib/analytics/events";

const emailSchema = z.object({
  email: z.email({ error: "Enter a valid email address" }),
});

type EmailInput = z.infer<typeof emailSchema>;

type AuditScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type Props = {
  url: string;
  scores: AuditScores;
};

export function AuditEmailCapture({ url, scores }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: EmailInput) => {
    setServerError(null);
    trackEvent("audit_email_capture", { url });

    const result = await sendAuditReport({
      email: data.email,
      url,
      scores,
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      setServerError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border-strong bg-bg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="text-sm font-bold text-text">Report sent — check your inbox</p>
        <p className="text-xs text-text-muted">If you do not see it, check your spam folder.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold text-text">
        Want the detailed report with business-specific recommendations?
      </p>
      <p className="text-sm text-text-muted">
        The full report explains what your scores mean for your bottom line — and what to do about it.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            {...register("email")}
            type="email"
            placeholder="hello@example.com"
            aria-invalid={!!errors.email}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted-2 focus:outline-none transition-colors ${errors.email ? "border-red-500/50 focus:border-red-500/70" : "border-border focus:border-border-strong"}`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-text text-bg px-6 py-3 text-sm font-bold transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? "Sending..." : "Send my report"}
          </button>
        </div>
        {errors.email && (
          <p role="alert" className="text-sm text-red-400 mt-2">{errors.email.message}</p>
        )}
        {serverError && (
          <p role="alert" className="text-sm text-red-400 mt-2">{serverError}</p>
        )}
      </form>
    </div>
  );
}
