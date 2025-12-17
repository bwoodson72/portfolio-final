"use client";

import React  from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {


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