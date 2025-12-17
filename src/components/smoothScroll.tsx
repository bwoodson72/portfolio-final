"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Logs when Lenis fires scroll updates (good proof it’s running)
  useLenis((lenis) => {
    // Avoid spam: log only occasionally
    if (process.env.NODE_ENV === "production") {
      // Lenis emits a lot; keep it light:
      // @ts-expect-error lenis.animatedScroll exists at runtime
      const y = lenis?.animatedScroll ?? lenis?.scroll ?? 0;
      if (typeof y === "number" && Math.round(y) % 500 === 0) {
        console.log("[Lenis] scroll y =", Math.round(y));
      }
    } else {
      console.log("[Lenis] scroll event");
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