export type AnalyticsEventName =
  | "hire_upwork_click"
  | "intake_click"
  | "loom_click"
  | "package_click"
  | "filter_used";

export type AnalyticsPayload = Record<string, string | number | boolean>;

export const trackEvent = (
  name: AnalyticsEventName,
  payload?: AnalyticsPayload
): void => {
  // TODO: Wire this to your analytics provider of choice.
  if (payload) {
    console.info(`[analytics] ${name}`, payload);
  } else {
    console.info(`[analytics] ${name}`);
  }
};
