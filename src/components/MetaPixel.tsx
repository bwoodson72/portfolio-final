'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface FacebookPixel {
  (event: 'init', pixelId: string): void;
  (event: 'track', eventName: string): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq: FacebookPixel;
  }
}

export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Debug logs to help verify pixel initialization
    // Pixel ID present at build-time
    console.log('MetaPixel - NEXT_PUBLIC_META_PIXEL_ID:', process.env.NEXT_PUBLIC_META_PIXEL_ID);

    // If fbq already exists, track page view and log
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('MetaPixel - fbq already present:', window.fbq);
      window.fbq('track', 'PageView');
      return;
    }

    // Check for fbq after a short delay in case script loads asynchronously
    const checkTimer = setTimeout(() => {
      if (window.fbq) {
        console.log('MetaPixel - fbq available after delay:', window.fbq);
        window.fbq('track', 'PageView');
      } else {
        console.warn('MetaPixel - fbq not found. Script may have been blocked or failed to load.');
      }
    }, 1500);

    return () => clearTimeout(checkTimer);
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
            console.log('MetaPixel inline script executed.');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
