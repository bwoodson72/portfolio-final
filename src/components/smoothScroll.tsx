"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    console.log("[Lenis] instance ready");

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Extra: confirm Lenis sees scroll changes
    const onScroll = () => {
      const anyLenis = lenis as unknown as { scroll?: number; animatedScroll?: number };
      const y = anyLenis.animatedScroll ?? anyLenis.scroll ?? 0;
      console.log("[Lenis] y =", Math.round(y));
    };

    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

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