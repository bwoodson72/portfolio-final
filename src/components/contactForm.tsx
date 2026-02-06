'use client'

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { sendEmail } from "@/app/actions/sendEmail";

// FIXED: Replaced deprecated helpers (.min, .email) with .refine()
// This bypasses the Zod 4 TS6385 error by using the stable primitive API.
const schema = z.object({
    firstName: z.string().refine((s) => s.length >= 2, {
        message: "Name required"
    }),
    lastName: z.string().refine((s) => s.length >= 2, {
        message: "Last name required"
    }),
    // Zod v4 style z.email()
    email: z.email(),
    message: z.string().refine((s) => s.length >= 10, {
        message: "Please provide more details (10+ chars)"
    }),
});

type Inputs = z.infer<typeof schema>;

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
            setServerError(String(result.error || "Unknown transmission error."));
        }
    };

    const shakeVariants = {
        error: { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.4 } }
    };

    // Tailwind v4: Supports direct opacity modifiers (/0.03) without needing legacy utilities
    const inputStyles = (fieldName: keyof Inputs) => `
        w-full bg-white/[0.03] border py-3 px-4 text-base text-white rounded-xl
        placeholder:text-white/10 focus:outline-none transition-all duration-500
        backdrop-blur-md
        ${errors[fieldName]
        ? "border-red-500/40 bg-red-500/5 focus:border-red-500/60"
        : "border-white/5 focus:border-blue-500/50 focus:bg-white/[0.07]"}
    `;

    return (
        <section id="contact" className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-6 py-20 md:py-32 bg-transparent overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

                {/* Left Column: Narrative */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8 md:space-y-10 order-1"
                >
                    <div className="space-y-4">
                        <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase italic opacity-80">

                            {'// Available for New Projects'}
                        </p>
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase italic leading-[0.9] md:leading-[0.85]">
                            Let’s build <br />
                            <span className="text-blue-500 not-italic">together.</span>
                        </h2>
                    </div>

                    <div className="space-y-6 max-w-md">
                        <p className="text-white/40 text-base md:text-lg leading-relaxed font-light">
                            If you have a project in mind or want to discuss technical strategy, reach out.
                        </p>

                        <div className="pt-8 border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center group">
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Email</span>
                                <span className="text-xs md:text-sm text-white/70 group-hover:text-blue-500 transition-colors truncate ml-4 font-mono">
                                    hello@brianwoodson.com
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: The Form */}
                <div className="relative order-2 w-full">
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.div
                                key="prod-form"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                            >
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="relative group bg-white/2 border border-white/5 backdrop-blur-xl p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-2xl transition-all duration-700"
                                    noValidate
                                >
                                    {/* Tailwind v4 Syntax: bg-linear-to-r */}
                                    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent opacity-50" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 relative z-10">

                                        {/* First Name */}
                                        <motion.div animate={errors.firstName ? "error" : ""} variants={shakeVariants} className="space-y-2">
                                            <div className="flex justify-between items-baseline">
                                                <label htmlFor="firstName" className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">First Name</label>
                                                {/* Error Message */}
                                                {errors.firstName && <span role="alert" className="text-[10px] text-red-400 font-mono">{errors.firstName.message}</span>}
                                            </div>
                                            <input
                                                id="firstName"
                                                {...register("firstName")}
                                                className={inputStyles("firstName")}
                                                placeholder="Brian"
                                                aria-invalid={!!errors.firstName}
                                            />
                                        </motion.div>

                                        {/* Last Name */}
                                        <motion.div animate={errors.lastName ? "error" : ""} variants={shakeVariants} className="space-y-2">
                                            <div className="flex justify-between items-baseline">
                                                <label htmlFor="lastName" className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Last Name</label>
                                                {errors.lastName && <span role="alert" className="text-[10px] text-red-400 font-mono">{errors.lastName.message}</span>}
                                            </div>
                                            <input
                                                id="lastName"
                                                {...register("lastName")}
                                                className={inputStyles("lastName")}
                                                placeholder="Woodson"
                                                aria-invalid={!!errors.lastName}
                                            />
                                        </motion.div>

                                        {/* Email */}
                                        <motion.div animate={errors.email ? "error" : ""} variants={shakeVariants} className="md:col-span-2 space-y-2">
                                            <div className="flex justify-between items-baseline">
                                                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Email Address</label>
                                                {errors.email && <span role="alert" className="text-[10px] text-red-400 font-mono">{errors.email.message}</span>}
                                            </div>
                                            <input
                                                id="email"
                                                {...register("email")}
                                                className={inputStyles("email")}
                                                placeholder="hello@brianwoodson.io"
                                                aria-invalid={!!errors.email}
                                            />
                                        </motion.div>

                                        {/* Message */}
                                        <motion.div animate={errors.message ? "error" : ""} variants={shakeVariants} className="md:col-span-2 space-y-2">
                                            <div className="flex justify-between items-baseline">
                                                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Message</label>
                                                {errors.message && <span role="alert" className="text-[10px] text-red-400 font-mono">{errors.message.message}</span>}
                                            </div>
                                            <textarea
                                                id="message"
                                                {...register("message")}
                                                rows={4}
                                                className={`${inputStyles("message")} resize-none`}
                                                placeholder="Describe your vision..."
                                                aria-invalid={!!errors.message}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Global Server Error */}
                                    {serverError && (
                                        <div role="alert" className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <p className="text-[10px] text-red-400 font-mono text-center uppercase tracking-widest">
                                                {serverError}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        disabled={isSubmitting}
                                        className="mt-8 md:mt-10 w-full py-4 md:py-5 bg-blue-600 text-white font-bold uppercase tracking-[0.3em] text-[10px] rounded-xl hover:bg-blue-500 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                {/* Tailwind v4 Syntax: size-1.5 */}
                                                <div className="size-1.5 bg-white rounded-full animate-ping" />
                                                Transmitting...
                                            </>
                                        ) : "Send Transmission"}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="prod-success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/2 border border-white/5 backdrop-blur-xl p-8 md:p-16 rounded-3xl md:rounded-[2.5rem] text-center space-y-6 min-h-100 flex flex-col justify-center items-center"
                            >
                                {/* Tailwind v4 Syntax: size-12 / size-16 */}
                                <div className="size-12 md:size-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                    <span className="text-blue-500 text-xl md:text-2xl">✓</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white uppercase italic tracking-tight">Transmission <span className="text-blue-500 not-italic">Complete.</span></h2>
                                <p className="text-white/40 text-[10px] md:text-xs font-mono tracking-widest uppercase">Response within 24 hours.</p>
                                <button onClick={() => setIsSuccess(false)} className="text-blue-500 underline uppercase tracking-widest text-[10px] pt-6 hover:text-white transition-colors">Reset Terminal</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}