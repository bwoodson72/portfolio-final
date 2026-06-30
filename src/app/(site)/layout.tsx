import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import React from "react";
import {FinalCta} from "@/components/FinalCta";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
            <Nav />
            <main className="grow">
                {children}
            </main>
            <FinalCta/>
            <Footer />
        </div>
    );
}
