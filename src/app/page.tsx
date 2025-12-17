import Image from "next/image";
import {Hero} from "../components/hero";
import {CtaButton} from "@/components/ctaButton";
import {ProjectCard} from "@/components/projectCard";
import{ContactForm} from "@/components/contactForm";

export default function Home() {
  return (
   <div className="flex flex-col items-center w-screen">

       <Hero/>
       <section id="about" className="flex flex-col md:flex-row items-center justify-between gap-10 p-10 w-full min-h-screen">
           {/* Text Content: order-2 moves this below the image on mobile,
        md:order-1 moves it to the left on desktop */}
           <div className="flex flex-col order-2 md:order-1 w-full lg:w-1/2">
               <h2 className="text-4xl font-bold">I&#39;m Brian Woodson, a Full-Stack Engineer</h2>
               <p className="text-2xl my-3">
                   I specialize in building resilient, structured applications using the Next.js, React, and PostgreSQL stack.
               </p>
               <p className="text-2xl my-3">
                   My core focus is on transforming complex business ideas into clean, efficient architecture,
                   driven by a commitment to ownership and meticulous execution.
               </p>
               <CtaButton label="Get Your Project Started" href="#contact"/>
           </div>

           {/* Image Content: order-1 moves this to the top on mobile */}
           <div className="order-1 md:order-2 w-full lg:w-1/2 rounded-2xl flex justify-center">
               <Image
                   className='object-cover rounded-2xl'
                   src="/brianwoodson.jpg"
                   alt="Brian Woodson"
                   width={500}
                   height={500}
                   priority // Good practice for "above the fold" images
               />
           </div>
       </section>
       <section id="projects" className="flex flex-col items-center gap-10 p-10 w-full min-h-screen ">
          <h2 className="text-4xl font-bold mt-24">Projects</h2>
           <p className="text-2xl my-3">I specialize in building resilient, structured applications using the Next.js, React, and PostgreSQL stack. My core focus is on transforming complex business ideas into clean, efficient architecture, driven by a commitment to ownership and meticulous execution.</p>
           <div className="flex flex-col items-center justify-center w-full gap-6 md:flex-row md:flex-wrap md:items-start md:justify-center">
               <ProjectCard />
               <ProjectCard />
               <ProjectCard />
           </div>
       </section>

       <section id="contact" className="flex flex-col items-center gap-10 p-10 w-full min-h-screen">
           <h2 className="text-4xl font-bold mt-24">Contact</h2>
           <p className="text-2xl my-3">Ready to bring your vision to life? Let&#39;s connect and discuss how I can help you achieve your goals. Feel free to reach out via email or schedule a call.</p>
          <ContactForm/>
       </section>

   </div>
  );
}
