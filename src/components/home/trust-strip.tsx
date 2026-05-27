import { Shield, Clock, DollarSign, User } from "lucide-react";

const items = [
    {
        icon: Shield,
        label: "95+ Lighthouse Score",
        sublabel: "Every site scores 95 or better on Google's performance audit at launch.",
    },
    {
        icon: Clock,
        label: "Fixed Scope, Fixed Price",
        sublabel: "Every project is scoped and priced before work begins. No hourly billing, no surprise invoices.",
    },
    {
        icon: DollarSign,
        label: "You Own the Site",
        sublabel: "No platform subscriptions, no vendor lock-in. Your domain, your code, your asset.",
    },
    {
        icon: User,
        label: "One Point of Contact",
        sublabel: "Brian leads every project. No account managers, no handoffs, no runaround.",
    },
];

export function TrustStrip() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {items.map(({ icon: Icon, label, sublabel }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <Icon size={20} className="text-text-muted" />
            <span className="text-sm font-bold text-text">{label}</span>
            <span className="text-xs text-text-muted">{sublabel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
