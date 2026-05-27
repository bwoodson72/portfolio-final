'use client'

import Link from "next/link";

const services = [
    {
        title: "Business Websites",
        summary: "Custom multi-page websites built to rank on Google, load fast on mobile, and convert visitors into calls and leads.",
        href: "/services/business-websites",
    },
    {
        title: "Landing Pages",
        summary: "Single-page builds for ad campaigns, new service areas, and single-offer lead generation.",
        href: "/services/landing-pages",
    },
    {
        title: "Local SEO Management",
        summary: "Monthly local SEO for small businesses built on our stack. GBP management, rank tracking, content, and reporting.",
        href: "/services/local-seo-management",
    },
    // {
    //     title: "Ongoing Support",
    //     summary: "Hosting, security, content updates, and monthly performance reporting for sites we build.",
    //     href: "/services/ongoing-support",
    // },
];

export const ServicePackages = () => {
    return (
        <section id="services" className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border ">
            <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
                    Website Design and Local SEO for Small Businesses in the DFW Area
                </h2>
                <p className="max-w-2xl text-lg text-text-muted">
                    Every service is scoped and priced before work begins. No generic packages, no guesswork about what you are getting.
                </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <div
                        key={service.title}
                        className="flex flex-col rounded-3xl border border-border bg-surface p-8 space-y-4"
                    >
                        <h3 className="text-lg font-bold text-text">{service.title}</h3>
                        <p className="text-sm leading-relaxed text-text-muted">{service.summary}</p>
                        <Link
                            href={service.href}
                            className="mt-auto text-sm font-semibold text-text underline underline-offset-4 hover:opacity-70 transition-opacity"
                        >
                            Learn more<span className="sr-only"> about {service.title}</span>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
                <Link
                    href="/services"
                    className="rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                >
                    View all services
                </Link>
                <Link
                    href="/contact"
                    className="rounded-full border border-border px-8 py-3 text-sm font-bold text-text transition hover:border-border-strong"
                >
                    Start a conversation
                </Link>
            </div>
        </section>
    );
};
