import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, X } from "lucide-react";
import logo from "../assets/logo/logo.png";

// Storage key + how long to wait before showing it again after a dismissal
// or a successful signup, so returning visitors aren't nagged on every
// visit. "Closed" (X / backdrop) waits SNOOZE_DAYS before asking again;
// a successful submit sets it far in the future (effectively "never").
const STORAGE_KEY = "5i:community-popup";
const SNOOZE_DAYS = 14;
const SHOW_AFTER_MS = 1200; // small delay so it doesn't slam the page load

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function shouldShow() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const until = Number(raw);
    return Number.isFinite(until) ? Date.now() > until : true;
  } catch {
    // localStorage unavailable (privacy mode etc.) — just don't show it
    // rather than risk throwing on every render.
    return false;
  }
}

function snooze(days) {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + days * 24 * 60 * 60 * 1000));
  } catch {
    /* ignore */
  }
}

export default function CommunityPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shouldShow()) return;
    const t = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    if (status !== "success") snooze(SNOOZE_DAYS);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "community_popup" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
      snooze(365); // don't ask again for a subscribed visitor
      setTimeout(() => setOpen(false), 2200);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Join the 5i Traders community"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-mist/15 bg-ink-800 shadow-2xl shadow-black/30"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-mist/50 transition hover:bg-mist/10 hover:text-mist"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgb(var(--color-signal)/0.18),transparent_65%)] px-8 pb-2 pt-9">
              <img src={logo} alt="5i Traders" className="h-9 w-auto" />
            </div>

            <div className="px-8 pb-8 pt-3">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <CheckCircle2 className="h-10 w-10 text-leaf" />
                  <p className="font-medium text-mist">You're in!</p>
                  <p className="text-sm text-mist/60">
                    Watch your inbox — we'll be in touch with community updates.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold leading-snug text-mist">
                    Join the 5i Traders community
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-mist/60">
                    Get market insights, algo updates, and early access to new
                    tools — straight to your inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={status === "submitting"}
                        className="w-full rounded-xl border border-mist/15 bg-ink-900/60 py-2.5 pl-10 pr-3 text-sm text-mist placeholder:text-mist/35 outline-none transition focus:border-signal/50 focus:ring-2 focus:ring-signal/20"
                      />
                    </div>
                    {error && <p className="text-xs text-loss">{error}</p>}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                      {status === "submitting" ? "Joining..." : "Join the community"}
                    </button>
                  </form>

                  <p className="mt-4 text-center text-[11px] text-mist/40">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
