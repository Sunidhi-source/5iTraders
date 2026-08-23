import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, GraduationCap, Radio, Send } from 'lucide-react'
import { COURSES, ALGO_ADDON, TELEGRAM_CHANNEL } from '../data/courses'
import { useGoToContact } from '../lib/scrollTo'

const ICONS = {
  recorded: GraduationCap,
  live: Radio,
  telegram: Send,
}

function CourseCard({ course, index }) {
  const isTelegram = course.id === 'telegram'
  const [withAlgo, setWithAlgo] = useState(false)
  const goToContact = useGoToContact()
  const Icon = ICONS[course.id] ?? GraduationCap

  const total = withAlgo ? course.priceWithAlgo : course.price

  function enroll() {
    if (isTelegram) {
      window.open(course.link, '_blank', 'noopener,noreferrer')
      return
    }
    goToContact({
      planName: `${course.name}${withAlgo ? ' + Algo Add-on' : ''}`,
      service: 'Course',
      courseId: course.id,
      algoAddon: withAlgo,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`relative flex flex-col p-7 ${
        isTelegram
          ? 'card border-leaf/40 shadow-[0_0_0_1px_rgba(22,163,74,0.12),0_20px_60px_-20px_rgba(22,163,74,0.3)]'
          : 'card'
      }`}
    >
      {isTelegram && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-leaf px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
          All at ₹0
        </span>
      )}

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${
          isTelegram ? 'bg-leaf/10 text-leaf' : 'bg-signal/10 text-signal'
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-mist">{course.name}</h3>
      <p className="mt-1 text-sm text-mist/50">{course.tagline}</p>

      <div className="mt-4 flex items-baseline gap-1">
        {isTelegram ? (
          <span className="font-mono text-3xl font-semibold text-leaf">Free</span>
        ) : (
          <>
            <span className="font-mono text-3xl font-semibold text-mist">
              ₹{total.toLocaleString('en-IN')}
            </span>
            {withAlgo && (
              <span className="ml-2 font-mono text-xs text-mist/35 line-through">
                ₹{course.price.toLocaleString('en-IN')}
              </span>
            )}
          </>
        )}
      </div>

      <ul className="mt-6 flex flex-col gap-2.5">
        {course.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-mist/60">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf" />
            {perk}
          </li>
        ))}
      </ul>

      {!isTelegram && (
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-mist/10 bg-ink-800/40 p-4 transition-colors hover:border-signal/30">
          <input
            type="checkbox"
            checked={withAlgo}
            onChange={(e) => setWithAlgo(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-mist/30 text-signal focus:ring-signal"
          />
          <span className="text-xs text-mist/60">
            <span className="font-medium text-mist/80">
              Add {ALGO_ADDON.label} (${ALGO_ADDON.priceUSD})
            </span>
            <br />
            Bundle in the algorithm for ₹{ALGO_ADDON.priceINR.toLocaleString('en-IN')} more — total ₹
            {course.priceWithAlgo.toLocaleString('en-IN')}.
          </span>
        </label>
      )}

      <button
        onClick={enroll}
        className={`mt-7 w-full ${isTelegram ? 'btn-primary !bg-leaf hover:!bg-leaf-600' : 'btn-primary'}`}
      >
        {isTelegram ? 'Join Free on Telegram' : `Enroll in ${course.name}`}
      </button>
    </motion.div>
  )
}

export default function CoursesTelegram() {
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
          <span className="eyebrow">Courses</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mist md:text-5xl">
            Courses &amp; Telegram Premium
          </h1>
          <p className="mt-5 text-mist/60">
            Learn the strategy behind the algorithm — go at your own pace with
            the recorded course, or learn live with a mentor. Add the 3-month
            algo along with either course at a bundled price. Or just join
            the Telegram channel — live analysis, chart breakdowns, and
            trade calls, all at ₹0.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
          <CourseCard course={TELEGRAM_CHANNEL} index={COURSES.length} />
        </div>
      </div>
    </section>
  )
}
