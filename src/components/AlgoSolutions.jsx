import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, LineChart, Send, GraduationCap, Megaphone } from 'lucide-react'

const SERVICES = [
  {
    title: 'Algo',
    desc: 'Backtested, risk-managed forex algorithms running live on your account.',
    icon: LineChart,
    to: '/algo',
  },
  {
    title: 'Telegram Premium',
    desc: 'Real-time signals and market calls delivered straight to your phone.',
    icon: Send,
    to: '/courses',
  },
  {
    title: 'Course',
    desc: 'Learn the systems and thinking behind the strategies we trade.',
    icon: GraduationCap,
    to: '/courses',
  },
  {
    title: 'Influencer Management',
    desc: 'Turnkey partnership infrastructure for brokers and prop firms.',
    icon: Megaphone,
    to: '/influencer-management',
  },
]

export default function AlgoSolutions() {
  return (
    <section id="products" className="section-pad border-t border-mist/10 bg-ink-800/40">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">Our Products</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            Four ways to work with 5i Traders
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card flex flex-col p-6 transition-colors hover:border-signal/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-signal/10 text-signal">
                <service.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-mist">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-mist/50">
                {service.desc}
              </p>
              <Link
                to={service.to}
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-signal transition-colors hover:text-signal-600"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
