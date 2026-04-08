'use client'

import { PHONE_DISPLAY, PHONE_HREF, PHONE_ARIA_LABEL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics/events";

export function PhoneNumber() {
  return (
    <a
      href={PHONE_HREF}
      aria-label={PHONE_ARIA_LABEL}
      onClick={() => trackEvent("phone_click", { placement: "nav" })}
      className="bg-blue-900 text-lg border p-3 justify-center w-fit border-accent rounded-3xl hover:bg-blue-800 transition-colors"
    >
      {PHONE_DISPLAY}
    </a>
  );
}
