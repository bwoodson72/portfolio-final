"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLenis((lenis) => {
    if (!lenis) return;

    // Avoid type headaches across environments/builds
    const anyLenis = lenis as unknown as { animatedScroll?: number; scroll?: number };
    const y = anyLenis.animatedScroll ?? anyLenis.scroll ?? 0;

    if (process.env.NODE_ENV === "production") {
      if (typeof y === "number" && Math.round(y) % 500 === 0) {
        console.log("[Lenis] scroll y =", Math.round(y));
      }
    } else {
      console.log("[Lenis] scroll y =", Math.round(y));
    }
  });

  useEffect(() => {
    console.log("[SmoothScroll] mounted", {
      env: process.env.NODE_ENV,
      hasWindow: typeof window !== "undefined",
      hasDocument: typeof document !== "undefined",
    });
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.8,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}