import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { plans } from '../data/pricing'
import { useSectionNav } from '../lib/scrollTo'
import { PREFILL_EVENT } from './LeadForm'

const PERKS = [
  'Full algorithm access',
  'Real-time performance dashboard',
  'Risk & drawdown controls',
  'Priority support',
]

export default function Pricing() {
  const goToSection = useSectionNav()

  function choosePlan(plan) {
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { planName: plan.name } }))
    goToSection('contact')
  }

  return (
    <section id="pricing" className="section-pad border-t border-mist/10 bg-ink-800/40">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            Pick a term, start the trial
          </h2>
          <p className="mt-4 text-mist/55">
            Every plan runs the same algorithm — longer terms simply cost less per month.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`relative flex flex-col rounded-xl border p-6 ${
                plan.popular
                  ? 'border-signal/50 bg-ink-900 shadow-[0_0_0_1px_rgba(36,144,243,0.25),0_20px_60px_-20px_rgba(36,144,243,0.35)]'
                  : 'border-mist/10 bg-ink-900/60'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-sm font-semibold text-mist/70">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-mono text-3xl font-semibold text-mist">${plan.price}</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-xs text-mist/50">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => choosePlan(plan)}
                className={plan.popular ? 'btn-primary mt-7 w-full' : 'btn-secondary mt-7 w-full'}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
