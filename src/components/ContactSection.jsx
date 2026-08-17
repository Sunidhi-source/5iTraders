import { motion } from 'framer-motion'
import LeadForm from './LeadForm'

export default function ContactSection() {
  return (
    <section id="contact" className="section-pad relative border-t border-mist/10">
      <div className="container-xl grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Start Your Free Trial</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            See the algorithm trade before you commit.
          </h2>
          <p className="mt-4 max-w-md text-mist/55">
            Tell us a little about you and we&apos;ll set up a free trial on your preferred
            plan — no card required to start.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  )
}
