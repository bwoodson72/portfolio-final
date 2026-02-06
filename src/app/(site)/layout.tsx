import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smoothScroll";
import { Footer } from "@/components/footer";
import LoadingScreen from "@/components/loadingScreen";
import React from "react";

export default function SiteLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LoadingScreen />
            {/* Global Brand Atmosphere - Accent Blobs (Cyan) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] bg-cyan-500/5 blur-[150px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-cyan-500/5 blur-[150px] rounded-full" />
            </div>

            <SmoothScroll>
                <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
                    <Nav />
                    <main className="grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            </SmoothScroll>
        </>
    );
}