'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailResponse {
    success: boolean;
    error?: string;
}

export async function sendEmail(
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        message: string;
        package?: string;
    },
    turnstileToken: string | null
): Promise<SendEmailResponse> {

    // Validate Turnstile token
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (secretKey) {
        if (!turnstileToken) {
            return { success: false, error: "Bot verification required. Please complete the challenge." };
        }

        let turnstileResult: { success: boolean; "error-codes"?: string[] };

        try {
            const formBody = new URLSearchParams();
            formBody.append("secret", secretKey);
            formBody.append("response", turnstileToken);

            const turnstileResponse = await fetch(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: formBody.toString(),
                }
            );

            turnstileResult = await turnstileResponse.json();
        } catch {
            return { success: false, error: "Could not verify bot protection. Please try again." };
        }

        if (!turnstileResult.success) {
            return { success: false, error: "Bot verification failed. Please try again." };
        }
    }

    if (!process.env.RESEND_API_KEY) {
        return { success: false, error: "Server configuration error: Missing API Key." };
    }

    try {
        const { error } = await resend.emails.send({
            from: 'Portfolio <contact-form@brianwoodson.dev>',
            to: ['brian@brianwoodson.dev'],
            subject: `// INQUIRY [${formData.package ?? 'No package selected'}]: ${formData.firstName} ${formData.lastName}`,
            replyTo: formData.email,
            html: `
                <div style="font-family: monospace; background-color: #050505; color: #ffffff; padding: 20px; border: 1px solid #3b82f6;">
                    <h2 style="color: #3b82f6;">// INCOMING DATA NODE</h2>
                    <p><strong>SENDER:</strong> ${formData.firstName} ${formData.lastName}</p>
                    <p><strong>SOURCE:</strong> ${formData.email}</p>
                    <p><strong>PACKAGE:</strong> ${formData.package}</p>
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
        const errorMessage = err instanceof Error ? err.message : "System failure during transmission.";
        return { success: false, error: errorMessage };
    }
}
