export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "sarah-m",
    quote: "I'd been putting off redoing our website for over a year because every quote I got was $5,000 and months of back-and-forth. Brian's team scoped it clearly, gave me a fixed price, and the site was live before I expected it.",
    name: "Sarah M.",
    role: "Owner, Lakeview Dental",
  },
  {
    id: "dave-c",
    quote: "Brian was very professional and really took the time to understand our business needs before anything else. ",
    name: "Dave C.",
    role: "Media Manager",


  }
  
];
