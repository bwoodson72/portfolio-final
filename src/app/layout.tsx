import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smoothScroll";
import "./globals.css";
import React from "react";
import {Footer} from "@/components/footer";
import LoadingScreen from "@/components/loadingScreen";
import CustomCursor from "@/components/customCursor";

export const metadata: Metadata = {
    title: "Brian Woodson - Full Stack Web Developer",
    description: "High-performance, interactive digital experiences crafted with React and Next.js.",
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
            <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] bg-blue-600/[0.03] blur-[150px] rounded-full" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-blue-600/[0.03] blur-[150px] rounded-full" />
        </div>
        <CustomCursor />
        <LoadingScreen />
        <SmoothScroll>
            {/* Ensure the wrapper is transparent so the body color shows through */}
            <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
                <Nav />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </SmoothScroll>
        </body>
        </html>
    );
}