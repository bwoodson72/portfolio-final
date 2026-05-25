export type PrivacyItem = {
  label: string;
  description: string;
};

export type PrivacySection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: PrivacyItem[];
};

export type PrivacyContent = {
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
};

export const privacyContent: PrivacyContent = {
  lastUpdated: "May 25, 2026",
  intro:
    'Brian Woodson Web Development ("we," "us," or "our") operates brianwoodson.dev. This policy explains what information we collect, how we use it, and what rights you have. We do not sell your data.',

  sections: [
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      paragraphs: [
        "We collect information in two ways: directly from you when you fill out a form, and automatically through analytics tools when you browse the site.",
        "When you submit the contact form or request an audit, we collect your name, email address, phone number (if provided), and the message you write. This information is transmitted to us via Resend, our email delivery provider.",
        "When you visit the site, Google Analytics and Vercel Speed Insights automatically collect information such as your IP address, browser type, device type, pages visited, time spent on pages, and click events. This data is aggregated and does not personally identify you.",
      ],
    },
    {
      id: "how-we-use-it",
      heading: "How We Use Your Information",
      paragraphs: [
        "Form submissions are used solely to respond to your inquiry or deliver the requested report. We will not add you to a mailing list or contact you for marketing purposes without your explicit consent.",
        "Analytics data is used to understand how visitors interact with the site so we can improve it. We do not use analytics data to build individual profiles or target advertising.",
      ],
    },
    {
      id: "third-party-services",
      heading: "Third-Party Services",
      paragraphs: [
        "We use the following third-party services. Each has its own privacy policy governing how it handles data.",
      ],
      items: [
        {
          label: "Resend",
          description:
            "Handles delivery of form submissions to our inbox. Your contact information passes through Resend's servers. See resend.com/legal/privacy-policy.",
        },
        {
          label: "Google Analytics",
          description:
            "Tracks site usage through cookies and browser signals. Data is processed by Google and subject to Google's privacy policy at policies.google.com/privacy.",
        },
        {
          label: "Vercel Speed Insights",
          description:
            "Collects anonymous performance metrics (page load times, Web Vitals) to help us monitor site health. No personally identifiable information is collected. See vercel.com/legal/privacy-policy.",
        },
        {
          label: "Google Fonts",
          description:
            "Fonts used on this site are served from Google's servers. Your browser may send your IP address to Google when loading fonts. See policies.google.com/privacy.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "Cookies",
      paragraphs: [
        "We do not set any first-party cookies. Google Analytics sets cookies in your browser to distinguish returning visitors and track session data. These cookies persist for up to two years.",
        "You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on (tools.google.com/dlpage/gaoptout) or by blocking cookies in your browser settings.",
      ],
    },
    {
      id: "data-retention",
      heading: "Data Retention",
      paragraphs: [
        "We do not store form submissions in our own database. Once a message is delivered to our inbox via Resend, it exists only in our email. We retain emails for as long as is reasonably necessary to respond and follow up.",
        "Analytics data is retained by Google Analytics for 26 months by default. Vercel Speed Insights data is retained per Vercel's data retention policy.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your Rights",
      paragraphs: [
        "You have the right to request that we delete any personal information you have submitted to us. To make a request, use our contact form and let us know what you'd like us to remove. We will respond within a reasonable timeframe.",
        "For data held by third-party services (Google, Vercel, Resend), you will need to contact those providers directly under their respective privacy policies.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to This Policy",
      paragraphs: [
        "We may update this policy from time to time. The 'Last updated' date at the top of the page reflects when the most recent changes were made. Continued use of the site after changes constitutes acceptance of the updated policy.",
      ],
    },
  ],
};