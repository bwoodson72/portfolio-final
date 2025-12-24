import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // <--- RESTORED
import "./globals.css";
import React from "react";
import CustomCursor from "@/components/customCursor";

// 1. Configure Fonts with "swap" for performance
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Brian Woodson // Frontend Engineer",
    description: "Specializing in high-performance, immersive digital experiences with React and Next.js.",
    keywords: ["Frontend Engineer", "React Developer", "Next.js", "Web Performance"],
    authors: [{ name: "Brian Woodson" }],
    openGraph: {
        title: "Brian Woodson // Frontend Engineer",
        description: "Building high-performance, immersive digital experiences.",
        url: "https://brianwoodson.dev/",
        siteName: "Brian Woodson Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Brian Woodson Portfolio Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brian Woodson // Frontend Engineer",
        description: "Building high-performance, immersive digital experiences.",
        images: ["/og-image.png"],
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
            // 2. Inject Font Variables here so Tailwind can see them
            className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] text-white antialiased min-h-screen selection:bg-blue-500/30 selection:text-white font-sans`}
        >
        <CustomCursor />
        {children}
        </body>
        </html>
    );
}