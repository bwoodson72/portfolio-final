import { Metadata } from "next";
import { ContactForm } from "@/components/contactForm";

export const metadata: Metadata = {
    title: "Contact | Brian Woodson Web Development",
    description: "Tell us about your project. We'll reply within one business day with a clear scope, a fixed price, and a timeline.",
    openGraph: {
        title: "Contact | Brian Woodson Web Development",
        description: "Tell us about your project. We'll reply within one business day with a clear scope, a fixed price, and a timeline.",
        url: "/contact",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | Brian Woodson Web Development",
        description: "Tell us about your project. We'll reply within one business day with a clear scope, a fixed price, and a timeline.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return <ContactForm />;
}
