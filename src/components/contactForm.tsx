'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2 } from "lucide-react"; // npm install lucide-react

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", message: "" }
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSuccess(false);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Form Data:", data);
        reset();
        setIsSuccess(true);

        // Hide success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full max-w-xl mx-auto"
            noValidate
        >
            {/* Name Field */}
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">
                    Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                    {...register("name")}
                    id="name"
                    placeholder="Your Name"
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`p-4 rounded-lg bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-800'} focus:border-blue-500 outline-none transition-all focus:ring-1 focus:ring-blue-500`}
                />
                {errors.name && <p id="name-error" className="text-red-500 text-sm" role="alert">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">
                    Email Address <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`p-4 rounded-lg bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-800'} focus:border-blue-500 outline-none transition-all focus:ring-1 focus:ring-blue-500`}
                />
                {errors.email && <p id="email-error" className="text-red-500 text-sm" role="alert">{errors.email.message}</p>}
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">
                    Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`p-4 rounded-lg bg-gray-900 border ${errors.message ? 'border-red-500' : 'border-gray-800'} focus:border-blue-500 outline-none transition-all focus:ring-1 focus:ring-blue-500`}
                />
                {errors.message && <p id="message-error" className="text-red-500 text-sm" role="alert">{errors.message.message}</p>}
            </div>

            {/* Submit & Status Area */}
            <div className="flex flex-col gap-4 mt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-70 text-white font-bold py-4 px-8 rounded-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        "Send Message"
                    )}
                </button>

                {/* Success Feedback Animation */}
                {isSuccess && (
                    <div className="flex items-center justify-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 py-3 rounded-lg transition-opacity" role="status">
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        <span>Message sent successfully!</span>
                    </div>
                )}
            </div>
        </form>
    );
}