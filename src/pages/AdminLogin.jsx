import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockKeyhole, Loader2, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin/dashboard', { replace: true })
    })
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (signInError) {
      setError('Invalid email or password.')
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-6">
      <div className="pointer-events-none fixed inset-0 bg-grid bg-grid opacity-40" />
      <div className="relative w-full max-w-sm">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-mist/40 transition-colors hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>

        <div className="card p-8">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-signal/10 text-signal">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h1 className="font-display text-xl font-semibold text-mist">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-mist/45">
            Access is restricted to 5i Traders admin accounts.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-mist/50">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@5itraders.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-mist/50">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-xs text-loss">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-mist/30">
          Admin accounts are created directly in Supabase — there is no public sign-up.
        </p>
      </div>
    </div>
  )
}
