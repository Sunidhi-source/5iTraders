import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  ChevronDown,
  ChevronUp,
  Loader2,
  ArrowUpDown,
  Send,
  Search,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Interested",
  "Converted",
  "Not Interested",
];

const STATUS_STYLES = {
  New: "bg-mist/10 text-mist/70 border border-mist/15",
  Contacted: "bg-gilt/10 text-gilt border border-gilt/25",
  Interested: "bg-signal/10 text-signal border border-signal/25",
  Converted: "bg-signal/20 text-signal border border-signal/40",
  "Not Interested": "bg-loss/10 text-loss border border-loss/25",
};

const STATUS_DOT = {
  New: "bg-mist/50",
  Contacted: "bg-gilt",
  Interested: "bg-signal",
  Converted: "bg-signal",
  "Not Interested": "bg-loss",
};

function normalizeStatus(s) {
  if (!s) return "New";
  // DB default is lowercase 'new' — display-case it for the UI.
  const found = STATUS_OPTIONS.find(
    (opt) => opt.toLowerCase() === String(s).toLowerCase(),
  );
  return found ?? "New";
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [notesByLead, setNotesByLead] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDir, setSortDir] = useState("desc");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  }

  async function fetchNotes(leadId) {
    const { data, error } = await supabase
      .from("lead_notes")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });
    if (!error && data) {
      setNotesByLead((prev) => ({ ...prev, [leadId]: data }));
    }
  }

  function toggleExpand(lead) {
    const next = expandedId === lead.id ? null : lead.id;
    setExpandedId(next);
    setNoteDraft("");
    if (next && !notesByLead[lead.id]) fetchNotes(lead.id);
  }

  async function handleAddNote(leadId) {
    if (!noteDraft.trim()) return;
    setSavingNote(true);
    const { error } = await supabase
      .from("lead_notes")
      .insert({ lead_id: leadId, note: noteDraft.trim() });
    setSavingNote(false);
    if (!error) {
      setNoteDraft("");
      fetchNotes(leadId);
    }
  }

  async function handleStatusChange(leadId, newStatus) {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, status: newStatus.toLowerCase() } : l,
      ),
    );
    await supabase
      .from("leads")
      .update({ status: newStatus.toLowerCase() })
      .eq("id", leadId);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const statusCounts = useMemo(() => {
    const counts = { All: leads.length };
    STATUS_OPTIONS.forEach((s) => {
      counts[s] = leads.filter((l) => normalizeStatus(l.status) === s).length;
    });
    return counts;
  }, [leads]);

  const visibleLeads = useMemo(() => {
    let list = [...leads];
    if (statusFilter !== "All") {
      list = list.filter((l) => normalizeStatus(l.status) === statusFilter);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q) ||
          l.city?.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      const da = new Date(a.created_at).getTime();
      const db = new Date(b.created_at).getTime();
      return sortDir === "desc" ? db - da : da - db;
    });
    return list;
  }, [leads, statusFilter, sortDir, query]);

  return (
    <div className="min-h-screen bg-ink-900">
      <header className="border-b border-mist/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-semibold text-mist">
              Lead dashboard
            </h1>
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
        {/* Status filter chips */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {["All", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1.5 font-mono text-[11px] font-medium transition-colors ${
                statusFilter === s
                  ? "bg-signal text-ink-900"
                  : "border border-mist/15 text-mist/50 hover:border-signal/40 hover:text-signal"
              }`}
            >
              {s} <span className="opacity-60">({statusCounts[s] ?? 0})</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mist/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone, city..."
              className="input-field pl-9 text-xs"
            />
          </div>

          <button
            onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
            className="flex items-center gap-1.5 rounded-md border border-mist/15 px-3 py-2.5 font-mono text-xs text-mist/60 transition-colors hover:border-signal/40 hover:text-signal"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            Date {sortDir === "desc" ? "newest" : "oldest"}
          </button>

          <span className="ml-auto font-mono text-xs text-mist/35">
            {visibleLeads.length} lead{visibleLeads.length === 1 ? "" : "s"}
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
            <div className="max-h-[70vh] overflow-auto">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-ink-800">
                  <tr className="border-b border-mist/10 font-mono text-[10px] uppercase tracking-wide text-mist/35">
                    <th className="px-5 py-3 text-left font-medium">Name</th>
                    <th className="px-5 py-3 text-left font-medium">Email</th>
                    <th className="px-5 py-3 text-left font-medium">Phone</th>
                    <th className="px-5 py-3 text-left font-medium">City</th>
                    <th className="px-5 py-3 text-left font-medium">
                      Submitted
                    </th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                    <th className="px-5 py-3 text-left font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLeads.map((lead, i) => {
                    const status = normalizeStatus(lead.status);
                    const isOpen = expandedId === lead.id;
                    return (
                      <Fragment key={lead.id}>
                        <tr
                          className={`border-b border-mist/5 transition-colors last:border-b-0 hover:bg-mist/[0.03] ${
                            i % 2 === 1 ? "bg-mist/[0.015]" : ""
                          }`}
                        >
                          <td className="px-5 py-3.5 font-medium text-mist/90">
                            {lead.name}
                          </td>
                          <td className="max-w-[220px] truncate px-5 py-3.5 text-mist/55">
                            {lead.email}
                          </td>
                          <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-mist/55">
                            {lead.phone}
                          </td>
                          <td className="px-5 py-3.5 text-mist/55">
                            {lead.city}
                          </td>
                          <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-mist/40">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="relative inline-block">
                              <select
                                value={status}
                                onChange={(e) =>
                                  handleStatusChange(lead.id, e.target.value)
                                }
                                className={`cursor-pointer appearance-none rounded-full py-1.5 pl-6 pr-7 font-mono text-[11px] font-medium ${STATUS_STYLES[status]}`}
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option
                                    key={s}
                                    value={s}
                                    className="bg-ink-800 text-mist"
                                  >
                                    {s}
                                  </option>
                                ))}
                              </select>
                              <span
                                className={`pointer-events-none absolute left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${STATUS_DOT[status]}`}
                              />
                              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 opacity-50" />
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <button
                              onClick={() => toggleExpand(lead)}
                              className="flex w-fit items-center gap-1 whitespace-nowrap font-mono text-xs text-mist/50 transition-colors hover:text-signal"
                            >
                              Notes{" "}
                              {isOpen ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </td>
                        </tr>

                        {isOpen && (
                          <tr className="border-b border-mist/5 bg-ink-900/60">
                            <td colSpan={7} className="px-5 pb-5 pt-1">
                              {lead.note && (
                                <p className="mb-4 rounded-md border border-mist/10 bg-ink-800/60 p-3 text-xs text-mist/50">
                                  <span className="font-mono text-[10px] uppercase text-mist/30">
                                    Original note:{" "}
                                  </span>
                                  {lead.note}
                                  {lead.plan_interest && (
                                    <span className="ml-2 rounded bg-signal/10 px-1.5 py-0.5 font-mono text-[10px] text-signal">
                                      {lead.plan_interest}
                                    </span>
                                  )}
                                </p>
                              )}

                              <div className="flex flex-col gap-2">
                                {(notesByLead[lead.id] ?? []).map((n) => (
                                  <div
                                    key={n.id}
                                    className="rounded-md border border-mist/10 bg-ink-800/40 p-3"
                                  >
                                    <p className="text-xs text-mist/70">
                                      {n.note}
                                    </p>
                                    <p className="mt-1 font-mono text-[10px] text-mist/30">
                                      {new Date(n.created_at).toLocaleString()}
                                    </p>
                                  </div>
                                ))}
                                {(notesByLead[lead.id] ?? []).length === 0 && (
                                  <p className="text-xs text-mist/30">
                                    No follow-up notes yet.
                                  </p>
                                )}
                              </div>

                              <div className="mt-3 flex gap-2">
                                <input
                                  type="text"
                                  value={noteDraft}
                                  onChange={(e) => setNoteDraft(e.target.value)}
                                  placeholder="e.g. Call back at 5 PM"
                                  className="input-field text-xs"
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && handleAddNote(lead.id)
                                  }
                                />
                                <button
                                  onClick={() => handleAddNote(lead.id)}
                                  disabled={savingNote}
                                  className="btn-secondary px-3"
                                  aria-label="Save note"
                                >
                                  {savingNote ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Send className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
