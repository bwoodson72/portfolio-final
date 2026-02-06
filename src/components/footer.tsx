'use client'

import { siteContent, UPWORK_PROFILE_URL, INTAKE_URL } from "@/content/portfolio";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { packages } = siteContent;

    return (
        <footer className="w-full border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text)]">Services</h3>
                        <ul className="space-y-2 text-sm text-[color:var(--color-text-muted)]">
                            {packages.map((pkg) => (
                                <li key={pkg.name}>
                                    <a href="#packages" className="hover:text-[color:var(--color-text)] transition-colors">
                                        {pkg.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text)]">Links</h3>
                        <ul className="space-y-2 text-sm text-[color:var(--color-text-muted)]">
                            <li><a href={UPWORK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--color-text)] transition-colors">Upwork</a></li>
                            <li><a href={INTAKE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--color-text)] transition-colors">Intake Form</a></li>
                            <li><a href={`mailto:${siteContent.cta.email}`} className="hover:text-[color:var(--color-text)] transition-colors">Email</a></li>
                        </ul>
                    </div>

                    {/* Branding */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text)]">Brian Woodson</h3>
                        <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                            Senior Next.js Partner specializing in high-performance digital experiences.
                        </p>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-[color:var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                    <div>© {currentYear} Brian Woodson. All rights reserved.</div>
                    <div className="flex gap-6">
                        <a href="#top" className="hover:text-[color:var(--color-text)] transition-colors">Back to top</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}