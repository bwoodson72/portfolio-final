'use client'

import Image from "next/image";
import { CtaButton } from "./ctaButton";
import { motion } from "motion/react";
import Divider from "@/components/divider";

export function AboutSection() {
    return (

        <>
        <section id="about" className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 py-24 px-6 w-full min-h-[80vh] bg-transparent overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">

                {/* Text Content - 60% Width */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col order-2 lg:order-1 w-full lg:w-[60%]"
                >
                    <div className="space-y-6">
                        <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] italic">
                            // The Philosophy
                        </span>

                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase italic leading-[0.95]">
                            Engineering <br />
                            <span className="text-blue-500 not-italic">Interfaces.</span>
                        </h2>

                        <div className="space-y-5 text-white/70 text-base md:text-lg leading-relaxed">
                            <p>
                                I am a Frontend-focused Engineer dedicated to building polished digital products.
                                I bridge the gap between complex logic and intuitive design using <span className="text-white">Next.js</span>,
                                <span className="text-white"> React</span>, and <span className="text-white">Tailwind CSS</span>.
                            </p>

                            <p>
                                My approach centers on <span className="text-blue-400">performance-first development</span> and
                                <span className="italic text-white/90"> thoughtful motion</span>. I believe that great software
                                is about creating accessible, seamless experiences that feel natural.
                            </p>
                        </div>

                        <div className="pt-4">
                            <CtaButton label="Work With Me" href="#contact"/>
                        </div>
                    </div>
                </motion.div>

                {/* Image Content - 40% Width */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2 w-full lg:w-[40%] flex justify-center lg:justify-end"
                >
                    <div className="relative group max-w-[320px] lg:max-w-none">
                        {/* Subtle Image Glow */}
                        <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full scale-90" />

                        <Image
                            className='object-cover rounded-2xl shadow-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700'
                            src="/brianwoodson.jpg"
                            alt="Brian Woodson"
                            width={400}
                            height={480}
                            priority
                        />

                        {/* Minimal Technical Accents */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-blue-500/40 rounded-tl-lg" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-blue-500/40 rounded-br-lg" />
                    </div>
                </motion.div>
            </div>

        </section>
    <Divider/>
    </>
    )
}