import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "@/components/StructuredData";
import { CookieConsent } from "@/components/CookieConsent";
import { MetaPixel } from "@/components/MetaPixel";


// 1. Configure Fonts with "swap" for performance
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: true,
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: true,
});

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
    display: "swap",
    weight: ["700", "800"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://brianwoodson.dev"),
    title: "Brian Woodson | Web Design & Development in Granbury, TX",
    description: "Custom web design and development for small businesses in Granbury and DFW. No WordPress, no page builders, no templates. Fixed price, built by one developer.",
    keywords: ["Granbury web design", "web design and development", "custom website development", "local SEO Granbury TX", "small business website", "DFW web developer", "fixed price website", "no WordPress web design"],
    authors: [{ name: "Brian Woodson" }],
    openGraph: {
        title: " Web Design & Development in Granbury, TX",
        description: "Custom web design and development for small businesses in Granbury and DFW. No WordPress, no page builders, no templates.",
        url: "https://brianwoodson.dev",
        siteName: "Brian Woodson Web Development",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brian Woodson | Web Design & Development in Granbury, TX",
        description: "Custom web design and development for small businesses in Granbury and DFW. No WordPress, no page builders, no templates. Fixed price, built by one developer.",
    },
    icons: {
        icon: "/favicon.ico",
    },
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} bg-[#050505] text-white antialiased min-h-screen selection:bg-blue-500/30 selection:text-white font-sans`}
        >
        <StructuredData />
        <MetaPixel />
        {children}
        <CookieConsent />
        <SpeedInsights />
        </body>
        </html>
    );
}