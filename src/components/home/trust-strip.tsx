import { Shield, Clock, DollarSign, User } from "lucide-react";

const items = [
  {
    icon: Shield,
    label: "Guaranteed Fast",
    sublabel: "Every site loads in under 3 seconds",
  },
  {
    icon: Clock,
    label: "Done in 2–3 Weeks",
    sublabel: "Fixed timeline — you'll know the delivery date upfront",
  },
  {
    icon: DollarSign,
    label: "One Fixed Price",
    sublabel: "No hourly billing, no change-order surprises",
  },
  {
    icon: User,
    label: "One Point of Contact",
    sublabel: "Brian leads every project — no account managers, no runaround",
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
