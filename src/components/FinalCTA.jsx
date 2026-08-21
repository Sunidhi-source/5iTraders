import { motion } from 'framer-motion'
import { useGoToContact } from '../lib/scrollTo'

export default function FinalCTA() {
  const goToContact = useGoToContact()

  return (
    <section className="section-pad relative overflow-hidden border-t border-mist/10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[130px]" />
      <div className="container-xl relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mx-auto max-w-xl text-3xl font-semibold text-mist md:text-4xl">
            Ready to let the algorithm trade for you?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-mist/55">
            Start a free trial today — no pressure, no commitment, just the system running on
            your terms.
          </p>
          <button onClick={() => goToContact()} className="btn-primary mt-8">
            Get Your Free Trial
          </button>
        </motion.div>
      </div>
    </section>
  )
}
