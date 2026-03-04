import { Shield, Clock, DollarSign, User } from "lucide-react";

const items = [
  {
    icon: Shield,
    label: "98+ Lighthouse Score",
    sublabel: "Guaranteed on every build",
  },
  {
    icon: Clock,
    label: "14–21 Day Delivery",
    sublabel: "Fixed timeline, no delays",
  },
  {
    icon: DollarSign,
    label: "Fixed Price",
    sublabel: "No hourly billing, no surprises",
  },
  {
    icon: User,
    label: "Direct Communication",
    sublabel: "You talk to the developer, not a PM",
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
