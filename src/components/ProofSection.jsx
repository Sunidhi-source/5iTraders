import { motion } from 'framer-motion'
import PlaceholderSlot from './PlaceholderSlot'
import Testimonials from './Testimonials'

const SCREENSHOT_LABELS = [
  'Profit screenshot 1 — /src/assets/proof/screenshot-1.png',
  'Profit screenshot 2 — /src/assets/proof/screenshot-2.png',
  'Profit screenshot 3 — /src/assets/proof/screenshot-3.png',
  'Profit screenshot 4 — /src/assets/proof/screenshot-4.png',
]

export default function ProofSection() {
  return (
    <section className="section-pad border-t border-mist/10">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="eyebrow">The Proof</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            Real accounts, real screenshots
          </h2>
          <p className="mt-4 text-mist/55">
            A snapshot of live trading terminals from accounts running 5i Traders algorithms.
            Drop your own screenshots into <code className="font-mono text-xs text-signal/80">/src/assets/proof/</code> to replace these frames.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {SCREENSHOT_LABELS.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <PlaceholderSlot label={`Screenshot ${i + 1}`} aspect="aspect-[9/16]" />
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <Testimonials />
        </div>
      </div>
    </section>
  )
}
