import { motion } from 'framer-motion'
import { ArrowRight, Globe2 } from 'lucide-react'
import { useSectionNav } from '../lib/scrollTo'

export default function AlgoSolutions() {
  const goToSection = useSectionNav()

  return (
    <section id="products" className="section-pad border-t border-mist/10 bg-ink-800/40">
      <div className="container-xl grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Our Products</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            Algorithmic trading solutions
          </h2>
          <p className="mt-5 text-mist/55">
            5i Traders builds and maintains the systems that power our clients&apos; accounts —
            from strategy design through live deployment. We help traders of every level
            compete in a market that moves faster than any single person can watch.
          </p>

          <div className="mt-8 rounded-xl border border-mist/10 bg-ink-900/60 p-6">
            <div className="flex items-center gap-2 text-signal">
              <Globe2 className="h-4 w-4" />
              <span className="font-mono text-xs uppercase tracking-wide">Forex Algorithm Development</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mist/55">
              Years spent developing high-performance trading algorithms and the platforms that
              run them — refined alongside clients trading across more than a dozen countries,
              from first-time traders to full-time desks.
            </p>
          </div>

          <button onClick={() => goToSection('reviews')} className="btn-secondary mt-8">
            Learn more <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            ['Strategy Design', 'Rule-based systems built on historical edge, not indicators alone.'],
            ['Backtesting', 'Multi-year data runs before a single system goes live.'],
            ['Live Deployment', 'Monitored execution across your broker of choice.'],
            ['Ongoing Tuning', 'Systems reviewed and adjusted as market regimes shift.'],
          ].map(([title, desc]) => (
            <div key={title} className="card p-5">
              <h4 className="font-display text-sm font-semibold text-mist">{title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-mist/45">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
