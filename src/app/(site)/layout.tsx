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