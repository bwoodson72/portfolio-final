import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import StructuredData from "@/components/StructuredData";


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
    metadataBase: new URL("https://brianwoodson.dev/"),
    title: "Brian Woodson // Websites for Small Businesses",
    description: "Fast, modern websites for small businesses. Fixed price, no monthly fees, built to rank on Google.",
    keywords: ["small business website", "website developer", "fast website", "Next.js developer", "fixed price website"],
    authors: [{ name: "Brian Woodson" }],
    openGraph: {
        title: "Brian Woodson // Websites for Small Businesses",
        description: "Fast, modern websites for small businesses. Fixed price, no monthly fees, built to rank on Google.",
        url: "https://brianwoodson.dev/",
        siteName: "Brian Woodson",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brian Woodson // Websites for Small Businesses",
        description: "Fast, modern websites for small businesses. Fixed price, no monthly fees, built to rank on Google.",
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
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                    strategy="lazyOnload"
                />
                <Script id="ga-init" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                    `}
                </Script>
            </>
        )}

        <SpeedInsights/>
        </body>
        </html>
    );
}