'use client'

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { sendEmail } from "@/app/actions/sendEmail";
import { siteContent } from "@/content/portfolio";

const schema = z.object({
    firstName: z.string().refine((s) => s.length >= 2, { message: "Required" }),
    lastName: z.string().refine((s) => s.length >= 2, { message: "Required" }),
    email: z.email(),
    message: z.string().refine((s) => s.length >= 10, { message: "10+ characters required" }),
    package: z.string().min(1, { message: "Please select one" }),
});

type Inputs = z.infer<typeof schema>;

const shakeVariants = {
    error: { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.35 } },
};

function Field({
    label,
    error,
    children,
    span2 = false,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
    span2?: boolean;
}) {
    return (
        <motion.div
            animate={error ? "error" : ""}
            variants={shakeVariants}
            className={`space-y-2${span2 ? " md:col-span-2" : ""}`}
        >
            <div className="flex items-baseline justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                    {label}
                </label>
                {error && (
                    <span role="alert" className="text-xs text-red-400">
                        {error}
                    </span>
                )}
            </div>
            {children}
        </motion.div>
    );
}

const baseInput =
    "w-full rounded-xl border bg-(--color-surface) px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted-2) transition-colors focus:outline-none";
const inputOk = "border-(--color-border) focus:border-(--color-border-strong)";
const inputErr = "border-red-500/50 focus:border-red-500/70";

export function ContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setServerError(null);
        const result = await sendEmail(data);
        if (result.success) {
            setIsSuccess(true);
            reset();
        } else {
            setServerError(result.error ?? "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-6 py-24">
            <div className="space-y-4 mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-(--color-text) md:text-6xl">
                    Contact
                </h1>
                <p className="max-w-xl text-lg text-(--color-text-muted)">
                    {siteContent.cta.body}
                </p>
            </div>

            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-8 md:p-12 space-y-6"
                        >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                <Field label="First name" error={errors.firstName?.message}>
                                    <input
                                        {...register("firstName")}
                                        id="firstName"
                                        placeholder="Brian"
                                        aria-invalid={!!errors.firstName}
                                        className={`${baseInput} ${errors.firstName ? inputErr : inputOk}`}
                                    />
                                </Field>

                                <Field label="Last name" error={errors.lastName?.message}>
                                    <input
                                        {...register("lastName")}
                                        id="lastName"
                                        placeholder="Woodson"
                                        aria-invalid={!!errors.lastName}
                                        className={`${baseInput} ${errors.lastName ? inputErr : inputOk}`}
                                    />
                                </Field>

                                <Field label="Email" error={errors.email?.message} span2>
                                    <input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        placeholder="hello@example.com"
                                        aria-invalid={!!errors.email}
                                        className={`${baseInput} ${errors.email ? inputErr : inputOk}`}
                                    />
                                </Field>

                                <Field label="Package interest" error={errors.package?.message} span2>
                                    <select
                                        {...register("package")}
                                        id="package"
                                        aria-invalid={!!errors.package}
                                        className={`${baseInput} ${errors.package ? inputErr : inputOk} cursor-pointer bg-(--color-surface)`}
                                    >
                                        <option value="">Select a package...</option>
                                        <option value="Business Site">Business Site</option>
                                        <option value="Full Business Site">Full Business Site</option>
                                        <option value="Not sure">Not sure</option>
                                    </select>
                                </Field>

                                <Field label="Project description" error={errors.message?.message} span2>
                                    <textarea
                                        {...register("message")}
                                        id="message"
                                        rows={5}
                                        placeholder="Tell me about your project — what it is, what you need, and any relevant timeline."
                                        aria-invalid={!!errors.message}
                                        className={`${baseInput} ${errors.message ? inputErr : inputOk} resize-none`}
                                    />
                                </Field>
                            </div>

                            {serverError && (
                                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3">
                                    <p className="text-sm text-red-400">{serverError}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-full bg-(--color-text) py-4 text-sm font-bold text-(--color-bg) transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending…" : "Send message"}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-12 md:p-16 text-center space-y-6"
                    >
                        <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-(--color-border-strong) bg-(--color-bg)">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-text)"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-extrabold tracking-tight text-(--color-text)">
                                Message sent
                            </h2>
                            <p className="text-(--color-text-muted)">
                                I&apos;ll get back to you within one business day.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="text-sm font-bold text-(--color-text-muted) hover:text-(--color-text) transition-colors underline underline-offset-4"
                        >
                            Send another message
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
