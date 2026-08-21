import { motion } from 'framer-motion'
import { Check, Megaphone } from 'lucide-react'
import { useSectionNav } from '../lib/scrollTo'
import { PREFILL_EVENT } from '../components/LeadForm'

// TODO: client to confirm final name for the third tier — "Premium" used
// as a placeholder for now.
const PLANS = [
  {
    name: 'Customised',
    tagline: 'Built around your audience',
    perks: [
      'Fully tailored offer structure',
      'Custom creative & messaging support',
      'Flexible commercial terms',
      'Priority partner support',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    tagline: 'Full-scale partnership',
    perks: [
      'White-label infrastructure',
      'Dedicated account manager',
      'Highest revenue share tier',
      'Joint marketing campaigns',
    ],
    popular: false,
  },
]

export default function InfluencerManagement() {
  const goToSection = useSectionNav()

  function choosePlan(plan) {
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { planName: `${plan.name} (Influencer Management)` } }))
    goToSection('contact')
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
            prop firms looking to scale through partner and influencer
            channels.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-3xl gap-5 sm:grid-cols-2">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-xl border p-7 ${
                plan.popular
                  ? 'border-signal/50 bg-ink-900 shadow-[0_0_0_1px_rgba(36,144,243,0.15),0_20px_60px_-20px_rgba(36,144,243,0.35)]'
                  : 'border-mist/10 bg-ink-900'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                  Most Flexible
                </span>
              )}

              <h3 className="font-display text-lg font-semibold text-mist">{plan.name}</h3>
              <p className="mt-1 text-sm text-mist/50">{plan.tagline}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-mist/60">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf" />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => choosePlan(plan)}
                className={plan.popular ? 'btn-primary mt-7 w-full' : 'btn-secondary mt-7 w-full'}
              >
                Talk to us about {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
