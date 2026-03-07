import { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contactForm";


export const metadata: Metadata = {
    title: "Contact | Brian Woodson",
    description: "Get in touch to discuss your Next.js project. Fixed-scope engagements, clear timelines, no surprises.",
    openGraph: {
        title: "Contact | Brian Woodson",
        description: "Get in touch to discuss your Next.js project. Fixed-scope engagements, clear timelines, no surprises.",
        url: "/contact",
        siteName: "Brian Woodson Portfolio",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Portfolio Preview" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | Brian Woodson",
        description: "Get in touch to discuss your Next.js project. Fixed-scope engagements, clear timelines, no surprises.",
        images: ["/og-image.png"],
    },
};

export default function ContactPage() {
    return (
        <Suspense>
            {/*<HubSpotTracker />*/}
            <ContactForm />
        </Suspense>
    );
}
