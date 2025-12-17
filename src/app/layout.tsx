import type { Metadata } from "next";
import {Nav} from "@/components/nav";
import {SmoothScroll} from "@/components/smoothScroll";

import "./globals.css";
import React from "react";



export const metadata: Metadata = {
  title: "Brian Woodson - Full stack Web Developer",
  description: "Premium web solutions for businesses and individuals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

        className={`dark:bg-[#121212] dark:text-white light:bg-white light:text-black font-family-inter font-sans`}
      >
      <SmoothScroll>
      <Nav/>

        {children}
      </SmoothScroll>
      </body>
    </html>
  );
}
