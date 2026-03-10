import type { Testimonial } from "@/content/testimonials";
import Image from "next/image";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 space-y-4">
      <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)] italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-[color:var(--color-border)]" />
        )}
        <div>
          <p className="text-xs font-bold text-[color:var(--color-text)]">{testimonial.name}</p>
          <p className="text-[10px] text-[color:var(--color-text-muted)]">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
