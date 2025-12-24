'use client'

import { CtaButton } from "@/components/ctaButton";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { PerformanceCard } from "@/components/performanceCard";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==========================================
// 0. UTILITY HOOK (For Below-the-Fold Only)
// ==========================================
function useInView(threshold = 0.2) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, { threshold });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [threshold]);

    return { ref, isInView };
}

// ==========================================
// 1. ZOD SCHEMA
// ==========================================
const auditSchema = z.object({
    url: z.string().url({ message: "Invalid URL format (include https://)" }),
    email: z.string().email({ message: "Invalid email address" }),
});

type AuditInputs = z.infer<typeof auditSchema>;

// ==========================================
// 2. VISUAL COMPONENTS
// ==========================================

const SpeedVisual = () => {
    // Only animate if scrolled into view
    const { ref, isInView } = useInView();
    const circumference = 251;

    return (
        <div ref={ref} className="w-full h-full flex flex-col items-center justify-center relative bg-black/40">
            <div className="absolute w-32 h-32 bg-green-500/10 blur-[50px] rounded-full" />
            <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="6" />
                    <circle
                        cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        className={`transition-all duration-[1500ms] ease-out ${isInView ? 'stroke-dashoffset-0' : ''}`}
                        style={{ strokeDashoffset: isInView ? 0 : circumference }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold text-white font-mono transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        100
                    </span>
                </div>
            </div>
            <div className="mt-2 text-[10px] font-mono text-green-400 uppercase tracking-widest bg-green-900/20 px-2 py-1 rounded border border-green-500/20">
                This Page
            </div>
        </div>
    );
};

const StabilityVisual = () => {
    const { ref, isInView } = useInView();

    return (
        <div ref={ref} className="w-full h-full p-6 flex flex-col justify-end relative overflow-hidden bg-black/40">
            <div className="absolute inset-0 opacity-20"
                 style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />
            <div className="relative z-10 h-24 flex items-end w-full">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path
                        d="M0,80 L400,80"
                        fill="none" stroke="#10b981" strokeWidth="3"
                        strokeDasharray="400"
                        strokeDashoffset="400"
                        className={`transition-all duration-[1500ms] ease-out ${isInView ? 'stroke-dashoffset-0' : ''}`}
                        style={{ strokeDashoffset: isInView ? 0 : 400 }}
                    />
                </svg>
            </div>
            <div className={`absolute top-4 right-4 bg-black/80 border border-green-500/30 px-3 py-1 rounded backdrop-blur-sm transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-500 font-mono text-[10px] font-bold">CLS: 0.000</span>
                </div>
            </div>
        </div>
    );
};

const ComparisonVisual = () => (
    <div className="w-full h-full p-6 bg-[#0a0a0a] font-mono text-xs flex flex-col justify-center">
        <div className="grid grid-cols-3 border-b border-white/10 pb-2 mb-2 text-gray-500 uppercase tracking-wider">
            <span>Metric</span>
            <span className="text-red-500">WP Site</span>
            <span className="text-green-500">My Build</span>
        </div>
        <div className="space-y-3">
            <div className="grid grid-cols-3 items-center">
                <span className="text-white">LCP (Load)</span>
                <span className="text-red-400">3.2s</span>
                <span className="text-green-400 font-bold">0.8s</span>
            </div>
            <div className="grid grid-cols-3 items-center">
                <span className="text-white">Requests</span>
                <span className="text-red-400">84</span>
                <span className="text-green-400 font-bold">12</span>
            </div>
            <div className="grid grid-cols-3 items-center">
                <span className="text-white">JS Bloat</span>
                <span className="text-red-400">2.1 MB</span>
                <span className="text-green-400 font-bold">45 KB</span>
            </div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-gray-500 text-center">
            * Average data based on mobile 4G networks
        </div>
    </div>
);

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default function Page() {
    const [isSuccess, setIsSuccess] = useState(false);

    // --- SCROLL OBSERVERS (For Below-the-fold content ONLY) ---
    // Note: We removed the observer for the Hero Header to fix LCP.
    const { ref: formHeaderRef, isInView: formHeaderVisible } = useInView();
    const { ref: intelRef, isInView: intelVisible } = useInView();
    const { ref: proofRef, isInView: proofVisible } = useInView();
    const { ref: protocolRef, isInView: protocolVisible } = useInView();
    const { ref: pilotRef, isInView: pilotVisible } = useInView();
    const { ref: faqRef, isInView: faqVisible } = useInView();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuditInputs>({
        resolver: zodResolver(auditSchema),
    });

    const onAuditSubmit: SubmitHandler<AuditInputs> = async (data) => {
        console.log("Submitting Audit:", data);
        await new Promise(r => setTimeout(r, 1500));
        setIsSuccess(true);
    };

    const imageStyle: React.CSSProperties = {
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
    };

    return (
        <main className="w-full min-h-screen bg-[#050505] text-white selection:bg-red-500/30">

            {/* HERO SECTION:
                CRITICAL PERFORMANCE FIX: Removed all `useInView` and `opacity-0` states.
                This allows the browser to paint the text immediately (LCP < 1s).
                Animations are now pure CSS (`animate-reveal`) defined in globals.css.
            */}
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

                    {/* Element 1: Top Tag (Immediate CSS Animation) */}
                    <div className="opacity-0 animate-reveal">
                        <p className="text-red-500 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase italic mb-6">
                            {' // CRITICAL ALERT: AD BUDGET EFFICIENCY'}
                        </p>
                    </div>

                    {/* Element 2: Headline (LCP CANDIDATE - NO ANIMATION DELAY)
                        Note: We removed opacity-0 here entirely so it paints on Frame 1.
                    */}
                    <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase italic leading-[0.85]">
                        Your Google Ads Are <br />
                        <span
                            className="text-red-500 not-italic"
                            style={{ textShadow: '0 0 25px rgba(239, 68, 68, 0.4)'}}
                        >
                            Leaking Money.
                        </span>
                    </h1>

                    {/* Element 3: Subhead (CSS Animation Staggered) */}
                    <div className="mt-8 space-y-2 opacity-0 animate-reveal" style={{ animationDelay: '0.2s' }}>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-medium">
                            Slow landing pages trigger Google&#39;s <span className="text-white font-bold">&#34;Quality Score Penalty.&#34;</span>
                        </p>
                        <p className="text-sm md:text-base text-white/40 italic font-mono uppercase tracking-widest">
                            {'// I build High-Velocity pages that lower your CPC'}
                        </p>
                    </div>

                    {/* Element 4: CTA (CSS Animation Staggered) */}
                    <div className="mt-12 opacity-0 animate-reveal" style={{ animationDelay: '0.4s' }}>
                        <CtaButton label="Initialize Speed Audit" href="#audit-form"/>
                    </div>
                </div>
            </section>

            {/* AUDIT FORM SECTION */}
            <section id="audit-form" className="relative w-full py-24 px-6 flex justify-center bg-[#050505]">
                <div className="max-w-3xl w-full">

                    {/* Scroll Animation logic restored for below-the-fold content */}
                    <div ref={formHeaderRef} className={`mb-8 border-l-2 border-red-500/50 pl-6 transition-all duration-1000 ${formHeaderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase italic tracking-tighter mb-2">
                            Identify The <span className="text-red-500">Bottleneck.</span>
                        </h2>
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
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                        {!isSuccess ? (
                            <form
                                onSubmit={handleSubmit(onAuditSubmit)}
                                className="relative z-10 space-y-8 animate-reveal"
                            >
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-xs text-red-500 font-mono uppercase tracking-widest">
                                            {'> Target_URL'}
                                        </label>
                                        {errors.url && <span className="text-xs text-red-400 font-mono animate-pulse">[ERROR: {errors.url.message}]</span>}
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
                                        {errors.email && <span className="text-xs text-red-400 font-mono animate-pulse">[ERROR: {errors.email.message}]</span>}
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
                                            <><span className="w-2 h-2 bg-red-500 rounded-full animate-ping"/> ANALYZING...</>
                                        ) : (
                                            <>
                                                Get My Performance Report
                                                <span className="font-mono text-sm transition-transform duration-300 group-hover/btn:translate-x-2">-&gt;</span>
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>
                        ) : (
                            <div className="relative z-10 py-12 text-center flex flex-col items-center justify-center space-y-6 animate-reveal">
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
                            </div>
                        )}

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
                            <div ref={intelRef} className={`flex items-center gap-2 mb-6 transition-all duration-1000 ${intelVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-red-500 font-mono text-xs uppercase tracking-widest">{'// TECHNICAL_DIAGNOSIS'}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-6 leading-[0.9]">
                                WordPress Was Built For <br />
                                <span className="text-gray-500">Blogs.</span> Not Ads.
                            </h2>
                            <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                                <p>The reason your current site fails Core Web Vitals isn&apos;t because of &quot;bad code&quot;—it&apos;s because of <strong className="text-white">Architecture Bloat.</strong></p>
                                <p>According to Deloitte and Google, <strong className="text-white">a 0.1s improvement in load time results in an 8% lift in conversions.</strong> You are likely leaving 30-40% of your revenue on the table due to lag.</p>
                                <div className="p-4 border-l-4 border-white/10 bg-white/5 mt-4">
                                    <h4 className="text-white font-bold uppercase italic mb-1">The &quot;Plugin Paradox&quot;</h4>
                                    <p className="font-mono text-xs text-gray-400">To add marketing features (pixels, chat, forms), you add plugins. But every plugin adds ~200ms of load time. You are effectively breaking your site to try and market it.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-8 md:mt-0">
                            <div className={`bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden font-mono text-xs shadow-2xl group hover:border-red-500/30 transition-all duration-1000 aspect-video flex items-center ${intelVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                                <ComparisonVisual />
                            </div>
                            <div className={`absolute -bottom-6 -right-6 bg-white text-black p-4 font-bold uppercase italic tracking-tighter border-2 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-700 delay-500 ${intelVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                Ad Budget <br/> Drained.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROOF SECTION */}
            <section className="w-full py-24 px-6 bg-[#050505] border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div ref={proofRef} className="text-center mb-16">
                        <h2 className={`text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-4 transition-all duration-1000 ${proofVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            The <span className="text-red-500">Speed</span> Standard.
                        </h2>
                        <p className={`text-gray-400 font-mono text-sm transition-all duration-1000 delay-200 ${proofVisible ? 'opacity-100' : 'opacity-0'}`}>
                            {' // I practice what I preach. The page you are reading right now scores a 100/100.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <PerformanceCard
                            title="Passing Core Web Vitals"
                            description="While competitors struggle with failing scores on WordPress, my architecture consistently hits the 'Green Zone'. This ensures Google treats your landing page as high-quality."
                            visual={<SpeedVisual />}
                            tags={["Score: 100", "Live Data", "Ad-Ready"]}
                        />
                        <PerformanceCard
                            title="Instant Interactive"
                            description="Visual stability prevents 'Rage Clicks' and user bounce. By minimizing layout shifts, we keep users focused on your Call-to-Action."
                            visual={<StabilityVisual />}
                            tags={["No Layout Shift", "Sub-Second Load", "Solid State"]}
                        />
                    </div>
                    <div className="mt-16 text-center flex flex-col items-center gap-4">
                        <p className="text-gray-500 text-sm font-mono">{'> ANALYSIS_COMPLETE: The data confirms high-speed sites win.'}</p>
                        <CtaButton label="Audit My Site Now" href="#audit-form"/>
                    </div>
                </div>
            </section>

            {/* PROTOCOL SECTION */}
            <section className="w-full py-24 px-6 bg-[#050505] border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 border-l-2 border-white/20 pl-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-4">Execution Protocol.</h2>
                        <p className="text-gray-400 font-mono text-sm">{'// Zero friction. No "Sales Calls" required.'}</p>
                    </div>
                    <div ref={protocolRef} className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((step, i) => (
                            <div
                                key={step}
                                className={`relative p-8 border border-white/10 bg-white/5 group hover:bg-white/10 transition-all duration-1000 ${protocolVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${i * 200}ms` }}
                            >
                                <span className="absolute top-4 right-4 font-mono text-xs text-gray-600">[ PHASE_0{step} ]</span>
                                <div className="text-6xl font-bold text-white/10 mb-6 group-hover:text-red-500/20 transition-colors">0{step}</div>
                                <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-3">
                                    {step === 1 ? "Input Target" : step === 2 ? "Manual Analysis" : "The \"Bolt-On\" Fix"}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step === 1 && "Submit your URL in the secure form above. This queues your site for a manual performance review."}
                                    {step === 2 && "I personally review your site's code structure and asset loading. I record a 3-minute video showing exactly where you are leaking ad revenue."}
                                    {step === 3 && "I propose a dedicated high-speed landing page to capture your ad traffic. This fixes the Quality Score problem instantly without touching your main site."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PILOT PROGRAM */}
            <section className="w-full py-24 px-6 bg-red-950/10 border-t border-red-900/30">
                <div ref={pilotRef} className="max-w-4xl mx-auto text-center">
                    <div className={`inline-block px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-[10px] font-mono uppercase tracking-widest mb-6 animate-pulse transition-all duration-1000 ${pilotVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Limited Access
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-6 transition-all duration-1000 delay-100 ${pilotVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Pilot Program: <span className="text-red-500">Case Study</span> Access.
                    </h2>
                    <p className={`text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${pilotVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        I am currently accepting 2 clients into my Case Study protocol. You get Senior Engineering architecture at pilot pricing in exchange for a testimonial.
                    </p>

                    <div className={`bg-black/40 border border-white/10 p-8 rounded-xl max-w-2xl mx-auto transition-all duration-1000 delay-300 ${pilotVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4 border-b border-white/10 pb-4">
                            The &quot;Green Zone&quot; Guarantee
                        </h3>
                        <p className="text-gray-300 text-sm italic">
                            &quot;If I cannot get your mobile landing page score to 90+ (Green Zone) on Google PageSpeed Insights, <strong className="text-white">I will refund 100% of your investment.</strong> No questions asked.&quot;
                        </p>
                    </div>

                    <div className="mt-12">
                        <CtaButton label="Apply For Pilot Access" href="#audit-form"/>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="w-full py-24 px-6 bg-[#050505] border-t border-white/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase italic tracking-tighter mb-4">System FAQ.</h2>
                        <p className="text-gray-400 font-mono text-sm">{'// Common queries regarding performance architecture.'}</p>
                    </div>

                    <div ref={faqRef} className="space-y-8">
                        {[
                            { q: "Will this break my current website?", a: "No. I build \"Bolt-On\" landing pages. They live on a subdomain. Your main site remains untouched." },
                            { q: "I already have a web developer. Can't they fix this?", a: "Likely not. Most agencies are \"WordPress Implementers,\" not software engineers. You cannot fix a WordPress architecture problem with more WordPress." },
                            { q: "How much does the \"Fix\" cost?", a: "The video audit is free. If you choose to hire me to build the page, packages start at $1,500. It usually pays for itself in ad savings within 90 days." }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`border border-white/10 bg-white/5 p-6 md:p-8 rounded-lg transition-all duration-1000 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${i * 150}ms` }}
                            >
                                <h3 className="text-white font-bold text-lg mb-3 flex items-start gap-3"><span className="text-red-500 font-mono mt-1">{'>'}</span>{item.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed pl-6 border-l border-white/10 ml-2">{item.a}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button onClick={(e) => { e.preventDefault(); document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white border-b border-white pb-1 hover:text-red-500 hover:border-red-500 transition-colors font-mono uppercase text-xs tracking-widest">
                            {' // Initialize Audit Sequence'}
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="w-full py-12 px-6 bg-black border-t border-white/10 text-center">
                <div className="mb-4">
                    <p className="text-white font-bold uppercase italic tracking-tighter text-xl">Brian Woodson</p>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">Performance Engineer // React Systems</p>
                </div>
                <p className="text-gray-700 text-xs">&copy; {new Date().getFullYear()} Systems Operational. All rights reserved.</p>
            </footer>
        </main>
    );
}