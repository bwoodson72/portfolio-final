'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define the validation schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

// 2. Derive the TypeScript type from the schema
type ContactFormData = z.infer<typeof contactSchema>;

export  function ContactForm() {
    // 3. Initialize the form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form Data:", data);

        // Reset form after success
        reset();
        alert("Message sent successfully!");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full max-w-xl mx-auto"
        >
            {/* Name Field */}
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                <input
                    {...register("name")}
                    id="name"
                    placeholder="Your Name"
                    className={`p-4 rounded-lg bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none transition-all`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className={`p-4 rounded-lg bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none transition-all`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`p-4 rounded-lg bg-gray-900 border ${errors.message ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 outline-none transition-all`}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-lg transition-all active:scale-95 flex justify-center items-center"
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
            Sending...
          </span>
                ) : (
                    "Send Message"
                )}
            </button>
        </form>
    );
}