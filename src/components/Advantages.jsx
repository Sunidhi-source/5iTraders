import { motion } from 'framer-motion'
import { Zap, Clock, ShieldCheck, LineChart } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Maximized Profits',
    desc: 'Automation removes hesitation and emotion, executing the strategy exactly as backtested — every session, without exception.',
  },
  {
    icon: Clock,
    title: '24/5 Hands-Free Execution',
    desc: 'The algorithm watches the market so you don\u2019t have to. No missed opens, no overnight gaps left unmanaged.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk-Managed Strategies',
    desc: 'Every system ships with position sizing and drawdown limits baked in, tested across years of historical data.',
  },
  {
    icon: LineChart,
    title: 'Transparent Tracking',
    desc: 'Real-time performance reporting means you always know exactly how the algorithm is trading your account.',
  },
]

export default function Advantages() {
  return (
    <section className="section-pad border-t border-mist/10">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Why 5i Traders</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            Empowering traders to achieve financial freedom
          </h2>
          <p className="mt-4 text-mist/55">
            Unlock the potential of forex trading with algorithms built for consistency, not
            guesswork.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card group p-6 transition-colors hover:border-signal/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-signal/10 text-signal">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-mist">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/50">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
