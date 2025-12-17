'use client'
import {motion} from "motion/react"

export function CtaButton({label, href}:{label:string, href:string}) {

    return (
    <motion.div
        whileHover={{scale: 1.05}}
        // 1. Define the wiggle animation using keyframes
        animate={{
            rotate: [0, -10, 10, -10, 10, 0],
        }}
        // 2. Set the delay and repeat behavior
        transition={{
            delay: 5,           // Wait 5 seconds
            duration: 0.5,      // Speed of the wiggle
            repeat: Infinity,   // Keeps wiggling (optional)
            repeatDelay: 5      // Wait another 5s between wiggles
        }}


        className="flex justify-center gap-3 bg-blue-900 text-gray-300 hover:bg-blue-700 p-3 rounded-xl m-6 max-w-fit">
        <a className='decoration-0 font-bold text-gray-300' href={href}>{label}</a>
    </motion.div>
    )
}