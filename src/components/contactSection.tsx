import {ContactForm} from "@/components/contactForm";


export function ContactSection() {

    return (
        <section id="contact" className="flex flex-col items-center gap-10 p-10 w-full min-h-screen">

            <ContactForm/>
        </section>
    )
}