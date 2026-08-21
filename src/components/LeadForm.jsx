import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, Video } from 'lucide-react'
import PhoneInput from './PhoneInput'
import { supabase } from '../lib/supabaseClient'
import { COURSES, ALGO_ADDON } from '../data/courses'

const SERVICE_OPTIONS = [
  'Algo',
  'Telegram Premium',
  'Course',
  'Influencer Management',
  'Others',
]

const initialState = {
  name: '',
  email: '',
  countryCode: '+1',
  phone: '',
  city: '',
  service: '',
  note: '',
  courseId: '',
  algoAddon: false,
  wantsGoogleMeet: true,
}

// Dispatched by the pricing cards so "Choose Plan" can prefill this form
// without prop-drilling through the whole page.
export const PREFILL_EVENT = '5i:prefill-plan'

export default function LeadForm() {
  const [values, setValues] = useState(initialState)
  const [planInterest, setPlanInterest] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  useEffect(() => {
    function handlePrefill(e) {
      const planName = e.detail?.planName
      if (!planName) return
      setPlanInterest(planName)
      setValues((v) => ({
        ...v,
        note: v.note?.trim() ? v.note : `Interested in the ${planName} plan.`,
        service: e.detail?.service ?? v.service,
        courseId: e.detail?.courseId ?? v.courseId,
        algoAddon: e.detail?.algoAddon ?? v.algoAddon,
      }))
    }
    window.addEventListener(PREFILL_EVENT, handlePrefill)
    return () => window.removeEventListener(PREFILL_EVENT, handlePrefill)
  }, [])

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const next = {}
    if (!values.name.trim()) next.name = 'Enter your name.'
    if (!values.email.trim()) {
      next.email = 'Enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!values.phone.trim()) {
      next.phone = 'Enter your phone number.'
    } else if (values.phone.replace(/\D/g, '').length < 6) {
      next.phone = 'Enter a valid phone number.'
    }
    if (!values.city.trim()) next.city = 'Enter your city.'
    if (values.service === 'Course' && !values.courseId) {
      next.courseId = 'Choose a course.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const selectedCourse = COURSES.find((c) => c.id === values.courseId) ?? null
  const courseAmount = selectedCourse
    ? values.algoAddon
      ? selectedCourse.priceWithAlgo
      : selectedCourse.price
    : null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')

    const isCourse = values.service === 'Course'
    const isInfluencer = values.service === 'Influencer Management'

    const { error } = await supabase.from('leads').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: `${values.countryCode} ${values.phone.trim()}`,
      city: values.city.trim(),
      note: values.note.trim() || null,
      plan_interest: planInterest,
      service_interest: values.service || null,
      course_type: isCourse ? selectedCourse?.name ?? null : null,
      algo_addon: isCourse ? values.algoAddon : false,
      course_amount: isCourse ? courseAmount : null,
      wants_google_meet: isInfluencer ? values.wantsGoogleMeet : false,
    })

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[5i Traders] lead insert failed:', error.message)
      setStatus('error')
      return
    }

    setStatus('success')
    setValues(initialState)
    setPlanInterest(null)
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card flex flex-col items-center gap-4 px-8 py-16 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-leaf" />
        <h3 className="font-display text-xl font-semibold text-mist">Thanks — we&apos;ve got it.</h3>
        <p className="max-w-sm text-sm text-mist/60">
          Our team will get back to you soon. We usually respond within 1–2 business days.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-secondary mt-2">
          Submit another request
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 md:p-10">
      {planInterest && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-signal/25 bg-signal/5 px-3 py-2 font-mono text-xs text-signal">
          Selected plan: {planInterest}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-mist/50">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Jordan Blake"
            aria-invalid={!!errors.name}
            className="input-field"
          />
          {errors.name && <p className="mt-1.5 text-xs text-loss">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-mist/50">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className="input-field"
          />
          {errors.email && <p className="mt-1.5 text-xs text-loss">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist/50">Phone Number</label>
          <PhoneInput
            countryCode={values.countryCode}
            phone={values.phone}
            onCountryChange={(v) => update('countryCode', v)}
            onPhoneChange={(v) => update('phone', v)}
            error={errors.phone}
          />
        </div>

        <div>
          <label htmlFor="city" className="mb-1.5 block text-xs font-medium text-mist/50">
            City
          </label>
          <input
            id="city"
            type="text"
            value={values.city}
            onChange={(e) => update('city', e.target.value)}
            placeholder="Toronto"
            aria-invalid={!!errors.city}
            className="input-field"
          />
          {errors.city && <p className="mt-1.5 text-xs text-loss">{errors.city}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="service" className="mb-1.5 block text-xs font-medium text-mist/50">
            Which service are you interested in?
          </label>
          <select
            id="service"
            value={values.service}
            onChange={(e) => update('service', e.target.value)}
            className="input-field"
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Course sub-fields — only shown once "Course" is selected above */}
        {values.service === 'Course' && (
          <div className="md:col-span-2 rounded-lg border border-mist/10 bg-ink-800/40 p-4">
            <p className="mb-3 text-xs font-medium text-mist/50">Which course?</p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {COURSES.map((course) => (
                <label
                  key={course.id}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                    values.courseId === course.id
                      ? 'border-signal/50 bg-signal/5 text-mist'
                      : 'border-mist/15 text-mist/60 hover:border-mist/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="courseId"
                      value={course.id}
                      checked={values.courseId === course.id}
                      onChange={(e) => update('courseId', e.target.value)}
                      className="h-3.5 w-3.5 text-signal focus:ring-signal"
                    />
                    {course.name}
                  </span>
                  <span className="font-mono text-xs text-mist/50">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                </label>
              ))}
            </div>
            {errors.courseId && <p className="mt-1.5 text-xs text-loss">{errors.courseId}</p>}

            <label className="mt-3 flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={values.algoAddon}
                onChange={(e) => update('algoAddon', e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-mist/30 text-signal focus:ring-signal"
              />
              <span className="text-xs text-mist/60">
                Add {ALGO_ADDON.label} (${ALGO_ADDON.priceUSD} / ₹
                {ALGO_ADDON.priceINR.toLocaleString('en-IN')})
              </span>
            </label>

            {selectedCourse && (
              <p className="mt-3 font-mono text-xs text-signal">
                Total: ₹{courseAmount.toLocaleString('en-IN')}
              </p>
            )}
          </div>
        )}

        {/* Influencer Management sub-section — only shown once selected above */}
        {values.service === 'Influencer Management' && (
          <div className="md:col-span-2 rounded-lg border border-mist/10 bg-ink-800/40 p-4">
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={values.wantsGoogleMeet}
                onChange={(e) => update('wantsGoogleMeet', e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-mist/30 text-signal focus:ring-signal"
              />
              <span className="flex items-start gap-2 text-xs text-mist/60">
                <Video className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
                Schedule a Google Meet with our partnerships team — we&apos;ll
                confirm a time and send the meeting link to your email.
              </span>
            </label>
          </div>
        )}

        <div className="md:col-span-2">
          <label htmlFor="note" className="mb-1.5 block text-xs font-medium text-mist/50">
            Additional Note <span className="text-mist/30">(optional)</span>
          </label>
          <textarea
            id="note"
            rows={4}
            value={values.note}
            onChange={(e) => update('note', e.target.value)}
            placeholder="Tell us about your trading experience or goals..."
            className="input-field resize-none"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-loss">
          Something went wrong submitting your request. Please try again in a moment.
        </p>
      )}

      <div className="mt-7 flex flex-col items-start gap-3">
        <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            'Get in Touch'
          )}
        </button>
        <p className="text-xs text-mist/40">We usually respond within 1–2 business days.</p>
      </div>
    </form>
  )
}
