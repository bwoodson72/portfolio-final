"use client";

import * as React from "react";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics/events";

export type AnalyticsLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: AnalyticsEventName;
};

export const AnalyticsLink = ({
  eventName,
  onClick,
  ...props
}: AnalyticsLinkProps): JSX.Element => {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    trackEvent(eventName);
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
};
