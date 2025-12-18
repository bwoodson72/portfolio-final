import { CtaButton } from "./ctaButton";
import Image from "next/image";

export function HeroSection() {
    return (
        <section id='hero' className="relative flex justify-center w-screen h-screen overflow-hidden">
            {/* 1. The Background Image */}
            <Image
                src="/hero-bg.avif"
                alt=""
                fill
                className="object-cover opacity-60 pointer-events-none z-0"
                priority
                role="presentation"
                quality={100}
                sizes="100vw"
            />

            {/* 2. The Overlay (Optional: only use if you want to darken edges) */}
            <div className="absolute inset-0 bg-black/20 z-1" />

            {/* 3. The Content (Higher Z-index to stay on top) */}
            <div className='relative z-10 p-6 flex flex-col items-center text-center mx-auto my-auto max-w-4xl'>
                <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                    Building <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Immersive</span> <br />
                    Digital Experiences
                </h1>

                <p className="text-lg md:text-2xl text-gray-300 mt-6 max-w-2xl leading-relaxed">
                    I’m Brian Woodson, a Frontend-focused Engineer specializing in
                    crafting high-performance, interactive web applications with
                    React and Next.js.
                </p>

                <div className="mt-10">
                    <CtaButton label="View My Work" href="#projects"/>
                </div>
            </div>
        </section>
    )
}