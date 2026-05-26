import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_ARIA_LABEL } from "@/lib/constants";
import { LocationLinks } from '@/components/footer/LocationLinks'
import { FooterYear } from '@/components/footer/FooterYear'
import { ALL_SERVICE_CARDS_QUERY } from '@/lib/sanity/queries'
import type { ServiceCard } from '@/lib/sanity/types'

export async function Footer() {
    let serviceCards: ServiceCard[] = []
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        try {
            const { client } = await import('@/lib/sanity/client')
            serviceCards = await client.fetch<ServiceCard[]>(ALL_SERVICE_CARDS_QUERY)
        } catch {
            serviceCards = []
        }
    }

    return (
        <footer className="w-full border-t border-border bg-bg">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text">Services</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            {serviceCards.map((service) => (
                                <li key={service._id}>
                                    <Link
                                        href={`/services/${service.slug.current}`}
                                        className="hover:text-text transition-colors"
                                    >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text">Links</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li><Link href="/services" className="hover:text-text transition-colors">Services</Link></li>
                            <li><Link href="/faq" className="hover:text-text transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-text transition-colors">Email</Link></li>
                            <li><Link href="/privacy" className="hover:text-text transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-text transition-colors">Terms of Service</Link></li>
                            <li>
                                <a
                                    href={PHONE_HREF}
                                    aria-label={PHONE_ARIA_LABEL}
                                    className="hover:text-text transition-colors"
                                >
                                    {PHONE_DISPLAY}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Locations */}
                    <LocationLinks />

                    {/* Branding */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text">Brian Woodson Web Development</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            We build websites for small businesses that get found on Google and bring in customers. Copy, SEO, and ongoing support included.
                        </p>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    <div>© <FooterYear /> Brian Woodson Web Development. All rights reserved.</div>
                    <div className="flex gap-6">
                        <Link href="#top" className="hover:text-text transition-colors">Back to top</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
