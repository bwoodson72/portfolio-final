'use client'
import { motion } from "motion/react"
import Image from "next/image"

export function ProjectCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }} // Increased 'y' for a more noticeable slide
            whileInView={{ opacity: 1, y: 0 }}

            // 'once: true' prevents it from re-hiding when you scroll away
            // 'amount: 0.1' triggers as soon as the top 10% enters
            // 'margin: "0px 0px -100px 0px"' ensures it triggers 100px BEFORE it hits the bottom
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -50px 0px" }}

            transition={{
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98] // Custom "cubic-bezier" for a premium feel
            }}

            className="flex flex-col gap-3 max-w-96 md:w-[calc(33.33%-1.5rem)] min-w-75 mx-auto md:mx-0"
        >
            <Image
                className='object-cover rounded-2xl shadow-lg'
                src="/brianwoodson.jpg"
                alt="Project Thumbnail"
                width={350}
                height={350}
            />
            <div className="px-1">
                <h3 className="text-xl font-bold">Project Name</h3>
                <p className="text-gray-300">Project Description</p>
            </div>
        </motion.div>
    )
}