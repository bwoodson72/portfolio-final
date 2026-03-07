import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";


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
        images: [],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brian Woodson // Websites for Small Businesses",
        description: "Fast, modern websites for small businesses. Fixed price, no monthly fees, built to rank on Google.",
        images: [],
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
            className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] text-white antialiased min-h-screen selection:bg-blue-500/30 selection:text-white font-sans`}
        >
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}

        <SpeedInsights/>
        </body>
        </html>
    );
}