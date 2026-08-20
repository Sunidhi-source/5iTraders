import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Hourglass } from 'lucide-react'
import PlaceholderSlot from '../components/PlaceholderSlot'

export default function CoursesTelegram() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-60" />
      <div className="container-xl relative px-6 text-center md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl"
        >
          <span className="eyebrow inline-flex items-center gap-2">
            <Hourglass className="h-3.5 w-3.5" /> Coming Soon
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mist md:text-5xl">
            Courses &amp; Telegram Premium
          </h1>
          <p className="mt-5 text-mist/60">
            This page is a placeholder — final design and content for our
            trading course and Telegram Premium signals service are on the
            way.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-2xl">
          <PlaceholderSlot
            label="Courses / Telegram Premium — design to be provided"
            aspect="aspect-video"
          />
        </div>

        <Link to="/contact" className="btn-primary mt-10 inline-flex">
          Get notified — Contact us
        </Link>
      </div>
    </section>
  )
}
