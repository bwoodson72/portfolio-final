import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import CustomCursor from "@/components/customCursor";

export const metadata: Metadata = {
    title: "Brian Woodson // Frontend Engineer",
    description: "Specializing in high-performance, immersive digital experiences with React and Next.js.",
    // ... keep your existing OpenGraph/Twitter config here ...
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
        {/* CustomCursor stays global so the audit page feels branded,
                    but without the heavy Nav/Footer */}
        <CustomCursor />

        {/* Children will be either (site)/layout.tsx OR (landing)/audit/page.tsx */}
        {children}
        </body>
        </html>
    );
}