'use client'
import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.8,         // Speed of interpolation (0 to 1)
            duration: 1.5,      // Duration of the smooth scroll
            smoothWheel: true
        }}>
            {children}
        </ReactLenis>
    )
}