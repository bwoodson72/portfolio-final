'use client'

import { CtaButton } from "@/components/ctaButton";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { PerformanceCard } from "@/components/performanceCard";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==========================================
// 1. ZOD SCHEMA & TYPES
// ==========================================
const auditSchema = z.object({
    url: z.string().url(),
    email: z.string().email(),
});

type AuditInputs = z.infer<typeof auditSchema>;

// ==========================================
// 2. VISUAL COMPONENTS
// ==========================================

const SpeedVisual = () => (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-black/40">
        <div className="absolute w-32 h-32 bg-green-500/10 blur-[50px] rounded-full" />
        <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="6" />
                <motion.circle
                    cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    initial={{ strokeDashoffset: 251 }}
                    whileInView={{ strokeDashoffset: 251 - (251 * 0.98) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-4xl font-bold text-white font-mono"
                >
                    98
                </motion.span>
            </div>
        </div>
        <div className="mt-2 text-[10px] font-mono text-green-400 uppercase tracking-widest bg-green-900/20 px-2 py-1 rounded border border-green-500/20">
            Performance
        </div>
    </div>
);

const StabilityVisual = () => (
    <div className="w-full h-full p-6 flex flex-col justify-end relative overflow-hidden bg-black/40">
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        <div className="relative z-10 h-24 flex items-end w-full">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <motion.path
                    d="M0,80 L10,75 L20,85 L30,40 L40,80 L50,80"
                    fill="none" stroke="#ef4444" strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                />
                <motion.path
                    d="M50,80 L100,80"
                    fill="none" stroke="#10b981" strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                />
                <motion.circle
                    cx="50" cy="80" r="3" fill="#fff"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                />
            </svg>
        </div>
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute top-4 right-4 bg-black/80 border border-green-500/30 px-3 py-1 rounded backdrop-blur-sm"
        >
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-500 font-mono text-[10px] font-bold">CLS: 0.000</span>
            </div>
        </motion.div>
    </div>
);

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default function Page() {
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuditInputs>({
        resolver: zodResolver(auditSchema),
    });

    const onAuditSubmit: SubmitHandler<AuditInputs> = async (data) => {
        console.log("Submitting Audit:", data);
        await new Promise(r => setTimeout(r, 1500));
        setIsSuccess(true);
    };

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

    const imageStyle: React.CSSProperties = {
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
    };

    return (
        <main className="w-full min-h-screen bg-[#050505] text-white selection:bg-red-500/30">

            {/* HERO SECTION */}
            <section id='audit-hero' className="relative flex justify-center w-full h-screen overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-bg.avif"
                        alt="Background"
                        fill
                        className="object-cover opacity-40 pointer-events-none"
                        style={imageStyle}
                        priority
                        quality={100}
                    />
                </div>
                <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08)_0%,transparent_50%)]" />

                <div className='relative z-10 p-6 flex flex-col items-center text-center m-auto max-w-5xl'>
                    <div className="opacity-0 animate-reveal">
                        <p className="text-red-500 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase italic mb-6">
                            {' // CRITICAL ALERT: AD BUDGET EFFICIENCY'}
                        </p>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase italic leading-[0.85]">
                        Your Google Ads Are <br />
                        <span
                            className="text-red-500 not-italic"
                            style={{ textShadow: '0 0 25px rgba(239, 68, 68, 0.4)'}}
                        >
                            Leaking Money.
                        </span>
                    </h1>
                    <div className="mt-8 space-y-2 opacity-0 animate-reveal" style={{ animationDelay: '0.2s' }}>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-medium">
                            Slow landing pages trigger Google&#39;s <span className="text-white font-bold">&#34;Quality Score Penalty.&#34;</span>
                        </p>
                        <p className="text-sm md:text-base text-white/40 italic font-mono uppercase tracking-widest">
                            {'// I build High-Velocity pages that lower your CPC'}
                        </p>
                    </div>
                    <div className="mt-12 opacity-0 animate-reveal" style={{ animationDelay: '0.4s' }}>
                        <CtaButton label="Initialize Speed Audit" href="#audit-form"/>
                    </div>
                </div>
            </section>

            {/* AUDIT FORM SECTION */}
            <section id="audit-form" className="relative w-full py-24 px-6 flex justify-center bg-[#050505]">
                <div className="max-w-3xl w-full">
                    <div className="mb-8 border-l-2 border-red-500/50 pl-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-white uppercase italic tracking-tighter mb-2"
                        >
                            Identify The <span className="text-red-500">Bottleneck.</span>
                        </motion.h2>
                        <p className="text-gray-400 font-mono text-sm mb-2">
                            {'// Stop guessing. Get a line-by-line breakdown of why your ads are expensive.'}
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-xs font-mono mt-4">
                            <span className="text-green-400 flex items-center gap-2">
                                <span>[✔]</span> Deliverable: 3-Minute Engineer Review
                            </span>
                            <span className="text-yellow-500 flex items-center gap-2">
                                <span>[!]</span> Capacity: 2 Slots Open Today
                            </span>
                        </div>
                    </div>

                    <div
                        className="relative group bg-black border border-white/10 p-8 md:p-12 overflow-hidden transition-colors hover:border-red-500/40 opacity-0 animate-reveal"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 pointer-events-none bg-size-[100%_4px,3px_100%]" />

                        <AnimatePresence mode="wait">
                            {!isSuccess ? (
                                <motion.form
                                    key="audit-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubmit(onAuditSubmit)}
                                    className="relative z-10 space-y-8"
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs text-red-500 font-mono uppercase tracking-widest">
                                                {'> Target_URL'}
                                            </label>
                                            {errors.url && (
                                                <span className="text-xs text-red-400 font-mono animate-pulse">
                                                    [ERROR: {errors.url.message}]
                                                </span>
                                            )}
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="absolute left-4 text-gray-500 font-mono text-lg select-none">https://</span>
                                            <input
                                                {...register("url")}
                                                type="text"
                                                className={`w-full bg-[#0a0a0a] border-b ${errors.url ? 'border-red-500 text-red-100' : 'border-white/20 text-white'} font-mono text-lg py-4 pl-24 pr-4 focus:outline-none focus:border-red-500 focus:bg-[#0f0f0f] transition-all placeholder:text-gray-700`}
                                                placeholder="yourbusiness.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs text-red-500 font-mono uppercase tracking-widest">
                                                {'> Report_Destination'}
                                            </label>
                                            {errors.email && (
                                                <span className="text-xs text-red-400 font-mono animate-pulse">
                                                    [ERROR: {errors.email.message}]
                                                </span>
                                            )}
                                        </div>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className={`w-full bg-[#0a0a0a] border-b ${errors.email ? 'border-red-500 text-red-100' : 'border-white/20 text-white'} font-mono text-lg py-4 px-4 focus:outline-none focus:border-red-500 focus:bg-[#0f0f0f] transition-all placeholder:text-gray-700`}
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    <button
                                        disabled={isSubmitting}
                                        className="w-full mt-8 bg-white hover:bg-red-600 hover:text-white text-black font-bold uppercase italic tracking-tighter py-6 text-xl transition-colors relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            {isSubmitting ? (
                                                <>
                                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"/>
                                                    ANALYZING...
                                                </>
                                            ) : (
                                                <>
                                                    Get My Performance Report
                                                    <span className="font-mono text-sm transition-transform duration-300 group-hover/btn:translate-x-2">-&gt;</span>
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="audit-success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative z-10 py-12 text-center flex flex-col items-center justify-center space-y-6"
                                >
                                    <div className="w-16 h-16 border-2 border-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                        <span className="text-green-500 text-2xl font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Sequence Initiated</h3>
                                        <p className="text-gray-400 font-mono text-sm mt-2 max-w-xs mx-auto">
                                            I am reviewing your site now. Expect a personal video breakdown in your inbox within 24 hours.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="text-red-500 font-mono text-xs uppercase tracking-widest hover:text-white underline mt-8"
                                    >
                                        [ Scan Another URL ]
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/30" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/30" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/30" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/30" />
                    </div>

                    <p className="mt-6 text-center text-xs text-gray-600 font-mono">
                        * I offer this initial audit pro-bono to demonstrate competence.<br/>
                        Real engineering analysis. No automated bots. No sales pressure.
                    </p>
                </div>
            </section>

            {/* INTEL SECTION */}
            <section className="w-full py-24 px-6 bg-[#050505] border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div className="flex flex-col h-full justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-red-500 font-mono text-xs uppercase tracking-widest">
                                    {'// TECHNICAL_DIAGNOSIS'}
                                </span>
                            </motion.div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-6 leading-[0.9]">
                                WordPress Was Built For <br />
                                <span className="text-gray-500">Blogs.</span> Not Ads.
                            </h2>
                            <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    {'The reason your current site fails Core Web Vitals isn\'t because of "bad code"—it\'s because of '}
                                    <strong className="text-white">Architecture Bloat.</strong>
                                </p>
                                <p>
                                    When a user clicks your ad, WordPress has to wake up a database, load a heavy Theme, and process 20+ plugins before it even shows the first pixel.
                                </p>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="p-4 border-l-4 border-white/10 bg-white/5 mt-4"
                                >
                                    <h4 className="text-white font-bold uppercase italic mb-1">The &quot;Plugin Paradox&quot;</h4>
                                    <p className="font-mono text-xs text-gray-400">
                                        {'To add marketing features (pixels, chat, forms), you add plugins. But every plugin adds ~200ms of load time. You are effectively breaking your site to try and market it.'}
                                    </p>
                                </motion.div>
                                <div className="pt-6 border-t border-white/10 mt-2">
                                    <h3 className="text-red-500 font-bold uppercase italic mb-2 flex items-center gap-2">
                                        <span className="text-lg">⚠</span>
                                        The &quot;Back Button&quot; Effect
                                    </h3>
                                    <p className="mb-2">
                                        Here is the hard truth: <strong>If your site takes 3+ seconds to load, 53% of users leave immediately.</strong>
                                    </p>
                                    <p>
                                        You aren&apos;t just paying a penalty to Google. You are paying for clicks that <em>vanish</em> before they even see your offer.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Stack Trace */}
                        <div className="relative mt-8 md:mt-0">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden font-mono text-xs shadow-2xl group hover:border-red-500/30 transition-colors duration-500"
                            >
                                <div className="bg-white/5 p-3 border-b border-white/5 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    <span className="ml-2 text-gray-500">wordpress_process_monitor.log</span>
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="flex justify-between text-gray-500 border-b border-white/5 pb-2 mb-4">
                                        <span>PROCESS</span>
                                        <span>LATENCY</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-50">
                                        <span className="text-gray-400">1. Initialize Database Connection</span>
                                        <span className="text-red-400">120ms</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-60">
                                        <span className="text-gray-400">{'2. Load "Mega-Theme" Assets'}</span>
                                        <span className="text-red-400">350ms</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-70">
                                        <span className="text-gray-400">3. Execute Plugin: Form_Builder</span>
                                        <span className="text-red-400">210ms</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-80">
                                        <span className="text-gray-400">4. Execute Plugin: Analytics_Suite</span>
                                        <span className="text-red-400">180ms</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-90">
                                        <span className="text-gray-400">5. Execute Plugin: Page_Builder_Core</span>
                                        <span className="text-red-400">410ms</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                                        <span className="text-red-500 font-bold uppercase">{' > Total_Interactive_Delay'}</span>
                                        <span className="text-red-500 font-bold bg-red-950/30 px-2 py-1 rounded">1.27s (CRITICAL)</span>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="absolute -bottom-6 -right-6 bg-white text-black p-4 font-bold uppercase italic tracking-tighter border-2 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                            >
                                Ad Budget <br/> Drained.
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROOF SECTION */}
            <section className="w-full py-24 px-6 bg-[#050505] border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-4"
                        >
                            The <span className="text-red-500">Speed</span> Standard.
                        </motion.h2>
                        <p className="text-gray-400 font-mono text-sm">
                            {' // My builds consistently hit the "Green Zone." Google rewards this with cheaper traffic.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <PerformanceCard
                            title="Passing Core Web Vitals"
                            description="While competitors struggle with failing scores on WordPress, my architecture consistently hits the 'Green Zone' (90+). This ensures Google treats your landing page as high-quality."
                            visual={<SpeedVisual />}
                            tags={["Score: 90+", "Mobile Optimized", "Ad-Ready"]}
                        />
                        <PerformanceCard
                            title="Instant Interactive"
                            description="Visual stability prevents 'Rage Clicks' and user bounce. By minimizing layout shifts, we keep users focused on your Call-to-Action."
                            visual={<StabilityVisual />}
                            tags={["No Layout Shift", "Sub-Second Load", "Solid State"]}
                        />
                    </div>

                    <div className="mt-16 text-center flex flex-col items-center gap-4">
                        <p className="text-gray-500 text-sm font-mono">
                            {' > ANALYSIS_COMPLETE: The data confirms high-speed sites win.'}
                        </p>
                        <CtaButton label="Audit My Site Now" href="#audit-form"/>
                    </div>
                </div>
            </section>

            {/* PROTOCOL SECTION */}
            <section className="w-full py-24 px-6 bg-[#050505] border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 border-l-2 border-white/20 pl-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-4">
                            Execution Protocol.
                        </h2>
                        <p className="text-gray-400 font-mono text-sm">
                            {'// Zero friction. No "Sales Calls" required.'}
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="relative p-8 border border-white/10 bg-white/5 group hover:bg-white/10 transition-colors"
                        >
                            <span className="absolute top-4 right-4 font-mono text-xs text-gray-600">[ PHASE_01 ]</span>
                            <div className="text-6xl font-bold text-white/10 mb-6 group-hover:text-red-500/20 transition-colors">01</div>
                            <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-3">Input Target</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Submit your URL in the secure form above. This queues your site for a manual performance review. No automated bots—real engineering eyes only.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="relative p-8 border border-white/10 bg-white/5 group hover:bg-white/10 transition-colors"
                        >
                            <span className="absolute top-4 right-4 font-mono text-xs text-gray-600">[ PHASE_02 ]</span>
                            <div className="text-6xl font-bold text-white/10 mb-6 group-hover:text-red-500/20 transition-colors">02</div>
                            <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-3">Manual Analysis</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                I personally review your site&apos;s code structure and asset loading. I record a 3-minute video showing exactly where you are leaking ad revenue.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="relative p-8 border border-white/10 bg-white/5 group hover:bg-white/10 transition-colors"
                        >
                            <span className="absolute top-4 right-4 font-mono text-xs text-gray-600">[ PHASE_03 ]</span>
                            <div className="text-6xl font-bold text-white/10 mb-6 group-hover:text-red-500/20 transition-colors">03</div>
                            <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-3">The &#34;Bolt-On&#34; Fix</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                I propose a dedicated high-speed landing page to capture your ad traffic. This fixes the Quality Score problem instantly <strong>without touching or rebuilding your main website.</strong>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="w-full py-24 px-6 bg-[#050505] border-t border-white/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase italic tracking-tighter mb-4">
                            System FAQ.
                        </h2>
                        <p className="text-gray-400 font-mono text-sm">
                            {'// Common queries regarding performance architecture.'}
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6 md:p-8 rounded-lg">
                            <h3 className="text-white font-bold text-lg mb-3 flex items-start gap-3">
                                <span className="text-red-500 font-mono mt-1">{'>'}</span>
                                Will this break my current website?
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed pl-6 border-l border-white/10 ml-2">
                                No. I build &quot;Bolt-On&quot; landing pages. They live on a subdomain (e.g., offer.yoursite.com) or a specific route. Your main WordPress site remains untouched. We are simply creating a &quot;Fast Lane&quot; specifically for your ad traffic.
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6 md:p-8 rounded-lg">
                            <h3 className="text-white font-bold text-lg mb-3 flex items-start gap-3">
                                <span className="text-red-500 font-mono mt-1">{'>'}</span>
                                I already have a web developer. Can&apos;t they fix this?
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed pl-6 border-l border-white/10 ml-2">
                                Likely not. Most agencies are &quot;WordPress Implementers,&quot; not software engineers. Their solution to every problem is to install another plugin—which is exactly what caused your speed issues in the first place. You cannot fix a WordPress architecture problem with more WordPress. You need an external, hand-coded solution.
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6 md:p-8 rounded-lg">
                            <h3 className="text-white font-bold text-lg mb-3 flex items-start gap-3">
                                <span className="text-red-500 font-mono mt-1">{'>'}</span>
                                How much does the &quot;Fix&quot; cost?
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed pl-6 border-l border-white/10 ml-2">
                                The audit video is free. If you choose to hire me to build the landing page, packages start at $1,500. For businesses spending $5k+/month on ads, this investment usually pays for itself in ad savings within the first 90 days.
                                </p>
                            </motion.div>
                        </motion.div>

                        <div className="mt-16 text-center">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white border-b border-white pb-1 hover:text-red-500 hover:border-red-500 transition-colors font-mono uppercase text-xs tracking-widest"
                >
                    {' // Initialize Audit Sequence'}
                </button>
            </div>
        </div>
</section>

{/* FOOTER */}
    <footer className="w-full py-12 px-6 bg-black border-t border-white/10 text-center">
        <div className="mb-4">
            <p className="text-white font-bold uppercase italic tracking-tighter text-xl">
                Brian Woodson
            </p>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">
                Performance Engineer // React Systems
            </p>
        </div>
        <p className="text-gray-700 text-xs">
            &copy; {new Date().getFullYear()} Systems Operational. All rights reserved.
        </p>
    </footer>
</main>
);
}