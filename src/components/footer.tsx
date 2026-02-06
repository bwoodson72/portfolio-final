'use client'

import Link from "next/link";
import { INTAKE_URL, UPWORK_PROFILE_URL } from "@/content/portfolio";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-bold text-[color:var(--color-text)]">Services</h3>
                        <ul className="mt-4 space-y-2 text-sm text-[color:var(--color-text-muted-2)]">
                            <li><a href="#packages" className="hover:text-[color:var(--color-text)]">MVP</a></li>
                            <li><a href="#packages" className="hover:text-[color:var(--color-text)]">Bugfix</a></li>
                            <li><a href="#packages" className="hover:text-[color:var(--color-text)]">Landing</a></li>
                            <li><a href="#packages" className="hover:text-[color:var(--color-text)]">Figma</a></li>
                            <li><a href="#packages" className="hover:text-[color:var(--color-text)]">Ecom</a></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-bold text-[color:var(--color-text)]">Links</h3>
                        <ul className="mt-4 space-y-2 text-sm text-[color:var(--color-text-muted-2)]">
                            <li><Link href={UPWORK_PROFILE_URL} className="hover:text-[color:var(--color-text)]">Upwork</Link></li>
                            <li><Link href={INTAKE_URL} className="hover:text-[color:var(--color-text)]">Intake</Link></li>
                            <li><a href="mailto:hello@brianwoodson.com" className="hover:text-[color:var(--color-text)]">Email</a></li>
                        </ul>
                    </div>

                    {/* Location (if present) */}
                    <div>
                        <h3 className="text-sm font-bold text-[color:var(--color-text)]">Location</h3>
                        <p className="mt-4 text-sm text-[color:var(--color-text-muted-2)]">Athens, Greece</p>
                    </div>
                </div>

                <div className="mt-12 border-t border-[color:var(--color-border)] pt-6 text-xs text-[color:var(--color-text-muted-2)]">
                    © {currentYear} Brian Woodson
                </div>
            </div>
        </footer>
    );
}