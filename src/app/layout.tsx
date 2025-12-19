import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smoothScroll";
import "./globals.css";
import React from "react";
import {Footer} from "@/components/footer";
import LoadingScreen from "@/components/loadingScreen";
import CustomCursor from "@/components/customCursor";



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
                url: "/og-image.png", // Create a 1200x630 image and place in /public
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
            className="bg-[#050505] text-white antialiased min-h-screen selection:bg-blue-500/30 selection:text-white"
        >
        {/* Global Brand Atmosphere - Lowered opacity to keep the black deep */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] bg-blue-600/3 blur-[150px] rounded-full" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-blue-600/3 blur-[150px] rounded-full" />
        </div>
        <CustomCursor />
        <LoadingScreen />
        <SmoothScroll>
            {/* Ensure the wrapper is transparent so the body color shows through */}
            <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
                <Nav />
                <main className="grow">
                    {children}
                </main>
                <Footer />
            </div>
        </SmoothScroll>
        </body>
        </html>
    );
}