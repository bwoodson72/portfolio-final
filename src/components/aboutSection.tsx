import Image from "next/image";
import { CtaButton } from "./ctaButton";

export function AboutSection() {
    return (
        <section id="about" className="flex flex-col md:flex-row items-center justify-between gap-10 p-10 w-full min-h-screen max-w-7xl mx-auto scroll-mt-20">
            {/* Text Content */}
            <div className="flex flex-col order-2 md:order-1 w-full lg:w-1/2">
                <h2 className="text-4xl font-bold tracking-tight">
                    Engineering <span className="text-blue-500">Interfaces</span> that Feel Right
                </h2>

                <p className="text-xl my-4 text-gray-300 leading-relaxed">
                    I’m a Frontend-focused Engineer dedicated to building polished digital products.
                    I bridge the gap between complex logic and intuitive design using **Next.js**,
                    **React**, and **Tailwind CSS**.
                </p>

                <p className="text-xl my-4 text-gray-300 leading-relaxed">
                    My approach centers on **performance-first development** and **thoughtful motion**.
                    I believe that great software isn&#39;t just about code—it&#39;s about creating
                    accessible, seamless experiences that users actually enjoy interacting with.
                </p>

                <div className="mt-6">
                    <CtaButton label="Work With Me" href="#contact"/>
                </div>
            </div>

            {/* Image Content */}
            <div className="order-1 md:order-2 w-full lg:w-1/2 flex justify-center relative">
                {/* Optional: Subtle decorative background for the image to show off frontend "flair" */}
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full -z-10 scale-75" />

                <Image
                    className='object-cover rounded-2xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500'
                    src="/brianwoodson.jpg"
                    alt="Brian Woodson"
                    width={500}
                    height={500}
                    priority
                />
            </div>
        </section>
    )
}