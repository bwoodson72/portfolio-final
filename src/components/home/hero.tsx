import Link from "next/link";
import Image from "next/image";
import {ConsultButton} from '../ConsultButton'
import { siteContent } from "@/content/portfolio";

export const Hero = () => {
  const { hero } = siteContent;

  return (
    <section
      id="top"
      className="relative flex flex-col items-center w-full h-dvh  justify-center px-6 py-24 text-center md:py-32 overflow-hidden"
    >
      <Image
        src="/bg-hero.avif"
        alt=""
        fill
        quality={50}
        loading="eager"
        className="object-cover brightness-40  pointer-events-none select-none"
        aria-hidden
      />
      <div className="relative max-w-240 space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-6xl md:text-7xl">
          {hero.headline}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
          {hero.subheadline}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
         <ConsultButton />
          <Link
            href="/services"
            className="rounded-full border border-border bg-surface px-8 py-4 text-sm font-bold text-text transition hover:bg-surface-hover"
          >
            {hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};
