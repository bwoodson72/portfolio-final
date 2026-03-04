import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import {SpeedInsights} from "@vercel/speed-insights/next";

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
    title: "Brian Woodson // Frontend Engineer",
    description: "Specializing in high-performance, immersive digital experiences with React and Next.js.",
    keywords: ["Frontend Engineer", "React Developer", "Next.js", "Web Performance"],
    authors: [{ name: "Brian Woodson" }],
    openGraph: {
        title: "Brian Woodson // Frontend Engineer",
        description: "Building high-performance, immersive digital experiences.",
        url: "https://brianwoodson.dev/",
        siteName: "Brian Woodson Portfolio",
        images: [],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brian Woodson // Frontend Engineer",
        description: "Building high-performance, immersive digital experiences.",
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
        <SpeedInsights/>
        </body>
        </html>
    );
}