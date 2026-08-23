import { motion } from "framer-motion";
import { Check, Megaphone, X } from "lucide-react";
import { useGoToContact } from "../lib/scrollTo";

const PLANS = [
  {
    name: "Preset 1",
    tagline: "Get started with a focused package",
    price: "$999",
    priceNote: "per campaign",
    popular: false,
    features: [
      { label: "Instagram reels", value: "6–10 reels", included: true },
      { label: "Instagram stories", value: "Included", included: true },
      { label: "Telegram promotions", value: "Not included", included: false },
      {
        label: "YouTube dedicated videos",
        value: "Not included",
        included: false,
      },
      { label: "Performance reports", value: "Monthly", included: true },
    ],
  },
  {
    name: "Customised",
    tagline: "Built around your audience",
    price: "Discussed in meeting",
    priceNote: null,
    popular: true,
    features: [
      { label: "Instagram reels", value: "Unlimited", included: true },
      { label: "Instagram stories", value: "Unlimited", included: true },
      { label: "Telegram promotions", value: "Unlimited", included: true },
      { label: "YouTube dedicated videos", value: "Included", included: true },
      {
        label: "Performance reports",
        value: "Weekly & monthly",
        included: true,
      },
    ],
  },
  {
    name: "Preset 2",
    tagline: "Full-scale partnership",
    price: "$1,499",
    priceNote: "per campaign",
    popular: false,
    ctaLabel: "Talk to us about Preset 2",
    features: [
      { label: "Instagram reels", value: "15-20 reels", included: true },
      { label: "Instagram stories", value: "Included", included: true },
      { label: "Telegram promotions", value: "Included", included: true },
      { label: "YouTube dedicated videos", value: "Included", included: true },
      {
        label: "Performance reports",
        value: "Monthly & weekly",
        included: true,
      },
    ],
  },
];

export default function InfluencerManagement() {
  const goToContact = useGoToContact();

  function choosePlan(plan) {
    goToContact({
      planName: `${plan.name} (Influencer Management)`,
      service: "Influencer Management",
    });
  }

  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-60" />
      <div className="container-xl relative px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow inline-flex items-center gap-2 justify-center">
            <Megaphone className="h-3.5 w-3.5" /> For Brokers &amp; Prop Firms
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mist md:text-5xl">
            Influencer Management
          </h1>
          <p className="mt-5 text-mist/60">
            Turnkey revenue infrastructure built exclusively for brokers and
            prop firms looking to scale through partner and influencer channels.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-xl border p-7 ${
                plan.popular
                  ? "border-signal/50 bg-ink-900 shadow-[0_0_0_1px_rgba(36,144,243,0.15),0_20px_60px_-20px_rgba(36,144,243,0.35)] lg:scale-[1.03]"
                  : "border-mist/10 bg-ink-900"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                  Most Flexible
                </span>
              )}

              <h3 className="font-display text-lg font-semibold text-mist">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-mist/50">{plan.tagline}</p>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span
                  className={
                    plan.priceNote
                      ? "font-mono text-3xl font-semibold text-mist"
                      : "font-mono text-xl font-semibold text-mist"
                  }
                >
                  {plan.price}
                </span>
                {plan.priceNote && (
                  <span className="text-xs text-mist/40">{plan.priceNote}</span>
                )}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature.label}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <span className="flex items-start gap-2 text-mist/70">
                      {feature.included ? (
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf" />
                      ) : (
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mist/30" />
                      )}
                      {feature.label}
                    </span>
                    <span
                      className={`shrink-0 text-right text-xs ${
                        feature.included ? "text-mist/50" : "text-mist/30"
                      }`}
                    >
                      {feature.value}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => choosePlan(plan)}
                className={
                  plan.popular
                    ? "btn-primary mt-7 w-full"
                    : "btn-secondary mt-7 w-full"
                }
              >
                {plan.ctaLabel ?? `Talk to us about ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
