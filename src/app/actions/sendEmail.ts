'use server'

import { Resend } from 'resend';

// This stays on the server and is never sent to the browser
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailResponse {
    success: boolean;
    error?: string;
}

export async function sendEmail(formData: {
    firstName: string;
    lastName: string;
    email: string;
    message: string
}): Promise<SendEmailResponse> {

    if (!process.env.RESEND_API_KEY) {
        return { success: false, error: "Server configuration error: Missing API Key." };
    }

    try {
        const { error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: ['bwoodson2@live.com'], // Replace with your verified email
            subject: `// TRANSMISSION: ${formData.firstName} ${formData.lastName}`,
            replyTo: formData.email,
            html: `
                <div style="font-family: monospace; background-color: #050505; color: #ffffff; padding: 20px; border: 1px solid #3b82f6;">
                    <h2 style="color: #3b82f6;">// INCOMING DATA NODE</h2>
                    <p><strong>SENDER:</strong> ${formData.firstName} ${formData.lastName}</p>
                    <p><strong>SOURCE:</strong> ${formData.email}</p>
                    <br />
                    <p><strong>MESSAGE:</strong></p>
                    <p style="border-left: 2px solid #3b82f6; padding-left: 15px; color: #cccccc;">${formData.message}</p>
                </div>
            `,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err: unknown) {
        // Robust error handling to satisfy TypeScript
        const errorMessage = err instanceof Error ? err.message : "System failure during transmission.";
        return { success: false, error: errorMessage };
    }
}