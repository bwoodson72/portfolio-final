
import {ConsultButton} from "@/components/ConsultButton";

interface ctaProps {
    title?: string;
    description?: string;
}
export function FinalCta(props:ctaProps) {


    const {title = 'Ready to move forward?',description = "Book a consultation now. No obligation. No sales pitch. Let's see if we're a good fit together."
    } = props;
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
            <div className="rounded-3xl border border-border bg-surface p-12 text-center space-y-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-4xl">
                    {title}
                </h2>
                <p className="mx-auto max-w-xl text-lg text-text-muted">
                    {description}
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <ConsultButton/>

                </div>
            </div>
        </section>

    )
}

