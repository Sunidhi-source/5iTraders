import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import PhoneInput from './PhoneInput'
import { supabase } from '../lib/supabaseClient'

const initialState = {
  name: '',
  email: '',
  countryCode: '+1',
  phone: '',
  city: '',
  note: '',
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
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')

    const { error } = await supabase.from('leads').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: `${values.countryCode} ${values.phone.trim()}`,
      city: values.city.trim(),
      note: values.note.trim() || null,
      plan_interest: planInterest,
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
        <CheckCircle2 className="h-10 w-10 text-signal" />
        <h3 className="font-display text-xl font-semibold text-mist">Thanks — you&apos;re in.</h3>
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
            'Get Your Free Trial'
          )}
        </button>
        <p className="text-xs text-mist/40">We usually respond within 1–2 business days.</p>
      </div>
    </form>
  )
}
