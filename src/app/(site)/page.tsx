import {HeroSection} from "@/components/heroSection";
import {AboutSection} from "@/components/aboutSection";
import {ProjectsSection} from "@/components/projectsSection";
import {ContactSection} from "@/components/contactSection";

export default function Home() {
  return (
   <main className="flex flex-col items-center w-screen">

       <HeroSection/>

       <AboutSection/>

       <ProjectsSection/>

       <ContactSection/>




   </main>
  );
}
