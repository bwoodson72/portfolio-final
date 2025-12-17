import {ContactForm} from "@/components/contactForm";


export function ContactSection() {

    return (
        <section id="contact" className="flex flex-col items-center gap-10 p-10 w-full min-h-screen">
            <h2 className="text-3xl font-bold mt-14">Contact</h2>
            <p className="text-xl">Ready to bring your vision to life? </p>
            <p className="text-xl"> Let&#39;s connect and discuss how I can help you achieve your goals. </p>
            <p className="text-xl">Feel free to reach out via email or schedule a call.</p>
            <ContactForm/>
        </section>
    )
}