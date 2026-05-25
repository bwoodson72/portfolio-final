export type TermsItem = {
  label: string;
  description: string;
};

export type TermsSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: TermsItem[];
};

export type TermsContent = {
  lastUpdated: string;
  intro: string;
  sections: TermsSection[];
};

export const termsContent: TermsContent = {
  lastUpdated: "May 25, 2026",
  intro:
    'These Terms of Service govern all work performed by Brian Woodson Web Development ("we," "us," or "our") for clients ("you"). By engaging our services, you agree to these terms.',

  sections: [
    {
      id: "services",
      heading: "Services",
      paragraphs: [
        "We provide web design, development, copywriting, SEO, and related services for small businesses. The specific scope of work for each project is agreed upon in writing before work begins. Services not listed in the agreed scope are not included.",
        "We reserve the right to decline or discontinue work that conflicts with our values or capacity.",
      ],
    },
    {
      id: "payment",
      heading: "Payment",
      paragraphs: [
        "Payment terms are specified in the project agreement. Unless otherwise agreed, a deposit is required before work begins, with the remaining balance due prior to final delivery. Work will not be delivered or launched until payment is received in full.",
        "All fees are non-refundable once work on the agreed scope has begun. If a project is cancelled mid-way, you owe payment for all work completed up to the cancellation date.",
        "Invoices not paid within the agreed timeframe may incur a late fee and pause active work until the balance is cleared.",
      ],
    },
    {
      id: "project-scope",
      heading: "Project Scope & Changes",
      paragraphs: [
        "Scope is defined at the start of each project and locked before development begins. Requests for features, pages, or functionality outside the agreed scope are treated as change orders and quoted separately.",
        "Changes to scope after work has started may affect the timeline and final cost. All scope changes must be agreed upon in writing.",
      ],
    },
    {
      id: "revisions",
      heading: "Revisions",
      paragraphs: [
        "Each project includes a defined number of revision rounds based on the agreed scope — typically one round for landing pages and two rounds for full website builds.",
        "A revision round means changes to existing pages or content within the current scope. Adding new pages, features, or substantially reworking completed sections counts as a scope change, not a revision.",
      ],
    },
    {
      id: "client-responsibilities",
      heading: "Client Responsibilities",
      paragraphs: [
        "You are responsible for providing materials we request (logos, brand assets, reference sites, service details) in a timely manner. Delays caused by late feedback or missing materials will extend project timelines accordingly.",
        "You are responsible for reviewing and approving all deliverables. Approval — whether explicit or implied by continued project progression — signifies acceptance of that deliverable.",
        "You warrant that any materials you provide (images, text, trademarks) are owned by you or that you have the right to use them. We are not liable for claims arising from client-provided content.",
      ],
    },
    {
      id: "timelines",
      heading: "Timelines",
      paragraphs: [
        "Estimated timelines begin once we have received the project deposit and all required materials from you. We will communicate progress and any changes to the timeline promptly.",
        "We are not liable for delays caused by factors outside our control, including delayed client feedback, third-party platform outages, or changes to project scope.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property",
      paragraphs: [
        "Upon receipt of full payment, you own all final deliverables produced for your project, including design files and code specific to your site.",
        "We retain the right to display completed work in our portfolio, case studies, and marketing materials unless you request otherwise in writing before project completion.",
        "We retain ownership of any proprietary tools, frameworks, or code libraries we use that are not specific to your project. Open-source components used in your project are subject to their respective licenses.",
      ],
    },
    {
      id: "warranties",
      heading: "Warranties & Disclaimers",
      paragraphs: [
        "We warrant that work will be completed with reasonable skill and care and will function as described in the agreed scope at the time of delivery.",
        "We do not guarantee specific search engine rankings, traffic levels, conversion rates, or business outcomes. SEO and marketing work improves the conditions for visibility — results depend on your market, competition, and factors outside our control.",
        "Except as stated above, services are provided as-is without warranties of any kind, express or implied.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of Liability",
      paragraphs: [
        "Our total liability to you for any claim arising from services provided shall not exceed the total amount you paid us for the specific project giving rise to the claim.",
        "We are not liable for any indirect, incidental, or consequential damages, including lost revenue, lost data, or loss of business opportunity, even if we have been advised of the possibility of such damages.",
      ],
    },
    {
      id: "termination",
      heading: "Termination",
      paragraphs: [
        "Either party may terminate a project with written notice. If you terminate, you owe payment for all work completed to date. If we terminate due to non-payment or a breach of these terms, the same applies.",
        "Upon termination, we will deliver all completed work to you once outstanding balances are paid.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing Law",
      paragraphs: [
        "These terms are governed by and construed in accordance with applicable law. Any disputes arising under these terms will be resolved in good faith between both parties before pursuing formal legal action.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to These Terms",
      paragraphs: [
        "We may update these terms from time to time. The 'Last updated' date at the top of the page reflects the most recent revision. Terms in effect at the time a project agreement is signed govern that project.",
      ],
    },
  ],
};
