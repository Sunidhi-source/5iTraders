import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut,
  ChevronDown,
  ChevronUp,
  Loader2,
  ArrowUpDown,
  Send,
  Trash2,
  X,
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const STATUS_OPTIONS = ['New', 'Contacted', 'Interested', 'Converted', 'Not Interested']

const STATUS_STYLES = {
  New: 'bg-mist/10 text-mist/70',
  Contacted: 'bg-gilt/10 text-gilt',
  Interested: 'bg-signal/10 text-signal',
  Converted: 'bg-signal/20 text-signal',
  'Not Interested': 'bg-loss/10 text-loss',
}

function normalizeStatus(s) {
  if (!s) return 'New'
  // DB default is lowercase 'new' — display-case it for the UI.
  const found = STATUS_OPTIONS.find((opt) => opt.toLowerCase() === String(s).toLowerCase())
  return found ?? 'New'
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [notesByLead, setNotesByLead] = useState({})
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortDir, setSortDir] = useState('desc')
  const [pendingDelete, setPendingDelete] = useState(null) // lead object awaiting confirmation
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setLeads(data)
    setLoading(false)
  }

  async function fetchNotes(leadId) {
    const { data, error } = await supabase
      .from('lead_notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })
    if (!error && data) {
      setNotesByLead((prev) => ({ ...prev, [leadId]: data }))
    }
  }

  function toggleExpand(lead) {
    const next = expandedId === lead.id ? null : lead.id
    setExpandedId(next)
    setNoteDraft('')
    if (next && !notesByLead[lead.id]) fetchNotes(lead.id)
  }

  async function handleAddNote(leadId) {
    if (!noteDraft.trim()) return
    setSavingNote(true)
    const { error } = await supabase
      .from('lead_notes')
      .insert({ lead_id: leadId, note: noteDraft.trim() })
    setSavingNote(false)
    if (!error) {
      setNoteDraft('')
      fetchNotes(leadId)
    }
  }

  async function handleStatusChange(leadId, newStatus) {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus.toLowerCase() } : l)))
    await supabase.from('leads').update({ status: newStatus.toLowerCase() }).eq('id', leadId)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  async function confirmDelete() {
    if (!pendingDelete) return
    setDeleting(true)
    const { error } = await supabase.from('leads').delete().eq('id', pendingDelete.id)
    setDeleting(false)
    if (!error) {
      setLeads((prev) => prev.filter((l) => l.id !== pendingDelete.id))
      if (expandedId === pendingDelete.id) setExpandedId(null)
      setPendingDelete(null)
    }
  }

  const visibleLeads = useMemo(() => {
    let list = [...leads]
    if (statusFilter !== 'All') {
      list = list.filter((l) => normalizeStatus(l.status) === statusFilter)
    }
    list.sort((a, b) => {
      const da = new Date(a.created_at).getTime()
      const db = new Date(b.created_at).getTime()
      return sortDir === 'desc' ? db - da : da - db
    })
    return list
  }, [leads, statusFilter, sortDir])

  return (
    <div className="min-h-screen bg-ink-900">
      <header className="border-b border-mist/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-semibold text-mist">Lead dashboard</h1>
            <p className="text-xs text-mist/40">5i Traders admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md border border-mist/15 px-4 py-2 text-sm text-mist/60 transition-colors hover:border-loss/40 hover:text-loss"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-auto font-mono text-xs"
          >
            <option value="All">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-1.5 rounded-md border border-mist/15 px-3 py-2.5 font-mono text-xs text-mist/60 transition-colors hover:border-signal/40 hover:text-signal"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            Date {sortDir === 'desc' ? 'newest' : 'oldest'}
          </button>

          <span className="ml-auto font-mono text-xs text-mist/35">
            {visibleLeads.length} lead{visibleLeads.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-signal" />
          </div>
        ) : visibleLeads.length === 0 ? (
          <div className="card p-12 text-center text-sm text-mist/40">
            No leads match this filter yet.
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="hidden grid-cols-[1.2fr_1.4fr_1fr_0.9fr_1fr_0.9fr_auto] gap-3 border-b border-mist/10 px-5 py-3 font-mono text-[10px] uppercase tracking-wide text-mist/35 md:grid">
              <span>Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>City</span>
              <span>Submitted</span>
              <span>Status</span>
              <span></span>
            </div>

            {visibleLeads.map((lead) => (
              <div key={lead.id} className="border-b border-mist/5 last:border-b-0">
                <div className="grid grid-cols-1 items-center gap-2 px-5 py-4 text-sm md:grid-cols-[1.2fr_1.4fr_1fr_0.9fr_1fr_0.9fr_auto] md:gap-3">
                  <span className="font-medium text-mist/90">{lead.name}</span>
                  <span className="truncate text-mist/55">{lead.email}</span>
                  <span className="font-mono text-xs text-mist/55">{lead.phone}</span>
                  <span className="text-mist/55">{lead.city}</span>
                  <span className="font-mono text-xs text-mist/40">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                  <select
                    value={normalizeStatus(lead.status)}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className={`rounded-md border-0 px-2 py-1.5 font-mono text-[11px] font-medium ${STATUS_STYLES[normalizeStatus(lead.status)]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-ink-800 text-mist">
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-3 md:justify-self-end">
                    <button
                      onClick={() => toggleExpand(lead)}
                      className="flex w-fit items-center gap-1 font-mono text-xs text-mist/50 transition-colors hover:text-signal"
                    >
                      Notes {expandedId === lead.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => setPendingDelete(lead)}
                      aria-label={`Delete ${lead.name}`}
                      className="flex w-fit items-center gap-1 font-mono text-xs text-mist/40 transition-colors hover:text-loss"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {expandedId === lead.id && (
                  <div className="bg-ink-900/60 px-5 pb-5">
                    {lead.note && (
                      <p className="mb-4 rounded-md border border-mist/10 bg-ink-800/60 p-3 text-xs text-mist/50">
                        <span className="font-mono text-[10px] uppercase text-mist/30">Original note: </span>
                        {lead.note}
                        {lead.plan_interest && (
                          <span className="ml-2 rounded bg-signal/10 px-1.5 py-0.5 font-mono text-[10px] text-signal">
                            {lead.plan_interest}
                          </span>
                        )}
                        {lead.service_interest && (
                          <span className="ml-2 rounded bg-leaf/10 px-1.5 py-0.5 font-mono text-[10px] text-leaf">
                            {lead.service_interest}
                          </span>
                        )}
                      </p>
                    )}

                    <div className="flex flex-col gap-2">
                      {(notesByLead[lead.id] ?? []).map((n) => (
                        <div key={n.id} className="rounded-md border border-mist/10 bg-ink-800/40 p-3">
                          <p className="text-xs text-mist/70">{n.note}</p>
                          <p className="mt-1 font-mono text-[10px] text-mist/30">
                            {new Date(n.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                      {(notesByLead[lead.id] ?? []).length === 0 && (
                        <p className="text-xs text-mist/30">No follow-up notes yet.</p>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="e.g. Call back at 5 PM"
                        className="input-field text-xs"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNote(lead.id)}
                      />
                      <button
                        onClick={() => handleAddNote(lead.id)}
                        disabled={savingNote}
                        className="btn-secondary px-3"
                        aria-label="Save note"
                      >
                        {savingNote ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {pendingDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-mist/40 px-6 backdrop-blur-sm"
          onClick={() => !deleting && setPendingDelete(null)}
        >
          <div
            className="card w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-loss/10 text-loss">
                <Trash2 className="h-4.5 w-4.5" />
              </div>
              <button
                onClick={() => !deleting && setPendingDelete(null)}
                aria-label="Cancel"
                className="text-mist/40 transition-colors hover:text-mist"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <h3 className="font-display text-base font-semibold text-mist">
              Delete this lead?
            </h3>
            <p className="mt-2 text-sm text-mist/55">
              This will permanently remove <span className="font-medium text-mist/80">{pendingDelete.name}</span>{' '}
              ({pendingDelete.email}) and any follow-up notes attached to them. This can&apos;t be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-loss px-6 py-3.5 font-display font-semibold text-white transition-all duration-200 hover:bg-loss/90 disabled:opacity-60"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
