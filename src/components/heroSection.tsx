import { CtaButton } from "./ctaButton";
import Image from "next/image";

export function HeroSection() {
    return (
        <section id='hero' className="relative flex justify-center w-screen h-screen overflow-hidden">
            <Image
                src="/hero-bg.jpg"
                alt="Background Texture"
                fill
                className="object-cover opacity-20 blur-[2px] pointer-events-none -z-10"
                priority
            />

            <div className='relative z-10 p-6 flex flex-col items-center text-center mx-auto my-auto max-w-4xl'>
                {/* The "Hook" - Highlighting the Frontend Craft */}
                <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight">
                    Building <span className="text-blue-500">Immersive</span> <br />
                    Digital Experiences
                </h1>

                {/* The "Value Prop" - Clearly stating your frontend focus */}
                <p className="text-lg md:text-2xl text-gray-300 mt-6 max-w-2xl leading-relaxed">
                    I’m Brian Woodson, a Frontend-focused Engineer specializing in
                    crafting high-performance, interactive web applications with
                    React and Next.js.
                </p>

                <div className="mt-8">
                    <CtaButton label="View My Work" href="#projects"/>
                </div>
            </div>
        </section>
    )
}