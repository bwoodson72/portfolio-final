'use client'

import { CtaButton } from "./ctaButton";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import React from "react";

export function HeroSection() {
    // Explicitly typing variants to resolve TS errors
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    // Casting style to React.CSSProperties to allow the mask properties
    const imageStyle: React.CSSProperties = {
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
    };

    return (
        <section id='hero' className="relative flex justify-center w-full h-screen overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.avif"
                    alt=""
                    fill
                    className="object-cover opacity-40 pointer-events-none"
                    style={imageStyle}
                    priority
                    quality={100}
                />
            </div>

            <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1)_0%,transparent_50%)]" />

            <div className='relative z-10 p-6 flex flex-col items-center text-center m-auto max-w-5xl'>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        variants={itemVariants}
                        className="text-blue-500 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase italic mb-6"


                    >
                        // Available for New Projects
                    </motion.p>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase italic leading-[0.85]"
                    >
                        Building <span  className="text-blue-500 not-italic "
                                        style={{ textShadow: '0 0 25px rgba(59, 130, 246, 0.4)'}}>Immersive</span> <br />
                        Digital Experiences.
                    </motion.h1>

                    <motion.div variants={itemVariants} className="mt-8 space-y-2">
                        <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
                            I’m Brian Woodson // Frontend-focused Engineer
                        </p>
                        <p className="text-sm md:text-base text-white/30 italic font-mono uppercase tracking-widest">
                            Specializing in high-performance React systems
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-12">
                        <CtaButton label="View My Work" href="#projects"/>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}