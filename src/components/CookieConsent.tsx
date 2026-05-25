'use client';

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const CONSENT_KEY = 'cookie_consent';
type ConsentState = 'accepted' | 'declined' | null;
type ConsentStateWithSentinel = ConsentState | 'uninitialized';

export function CookieConsent() {
    const [consent, setConsent] = useState<ConsentStateWithSentinel>(() => {
        if (typeof window === 'undefined') return 'uninitialized';
        return localStorage.getItem(CONSENT_KEY) as ConsentState;
    });

    const accept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setConsent('accepted');
    };

    const decline = () => {
        localStorage.setItem(CONSENT_KEY, 'declined');
        setConsent('declined');
    };

    const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    return (
        <>
            {consent === 'accepted' && GA_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="lazyOnload"
                    />
                    <Script id="ga-init" strategy="lazyOnload">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `}
                    </Script>
                </>
            )}

            {consent === null && (
                <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg px-6 py-5">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-text-muted">
                            This site uses cookies for analytics.{' '}
                            <Link href="/privacy" className="underline hover:text-text transition-colors">
                                Privacy Policy
                            </Link>
                        </p>
                        <div className="flex shrink-0 gap-3">
                            <button
                                onClick={decline}
                                className="rounded-full border border-border px-5 py-2 text-sm font-bold text-text-muted transition hover:border-border-strong hover:text-text"
                            >
                                Decline
                            </button>
                            <button
                                onClick={accept}
                                className="rounded-full bg-text px-5 py-2 text-sm font-bold text-bg transition hover:opacity-90"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
