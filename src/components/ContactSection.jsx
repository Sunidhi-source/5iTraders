import { motion } from 'framer-motion'
import LeadForm from './LeadForm'

export default function ContactSection({ bordered = true, compactTop = false }) {
  return (
    <section
      id="contact"
      className={`section-pad relative ${bordered ? 'border-t border-mist/10' : ''} ${compactTop ? 'pt-10 md:pt-14' : ''}`}
    >
      <div className="container-xl grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Get in Touch</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-md text-mist/55">
            Whether you&apos;re trading solo, running a desk, or building a revenue
            stream around us — tell us what you&apos;re after and we&apos;ll point you
            to the right service.
          </p>
          <p className="mt-3 max-w-md text-mist/55">
            One form, real people on the other end — usually back to you within
            1–2 business days.
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
