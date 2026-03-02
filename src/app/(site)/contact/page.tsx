import { Metadata } from "next";
import { ContactForm } from "@/components/contactForm";

export const metadata: Metadata = {
    title: "Contact | Brian Woodson",
};

export default function ContactPage() {
    return <ContactForm />;
}
