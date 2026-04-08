export type AnalyticsEventName =
  | "hire_upwork_click"
  | "intake_click"
  | "loom_click"
  | "package_click"
  | "filter_used"
  | "contact_form_submit"
  | "contact_form_success"
  | "contact_form_error"
  | "cta_click"
  | "audit_submit"
  | "audit_email_capture"
  | "phone_click";

export type AnalyticsPayload = Record<string, string | number | boolean>;

export const trackEvent = (
  name: AnalyticsEventName,
  payload?: AnalyticsPayload
): void => {
  // Send to Google Analytics if available
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }

  // Keep console logging in development
  if (process.env.NODE_ENV === "development") {
    if (payload) {
      console.info(`[analytics] ${name}`, payload);
    } else {
      console.info(`[analytics] ${name}`);
    }
  }
};
