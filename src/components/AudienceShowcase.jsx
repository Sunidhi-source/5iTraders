import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, Handshake } from "lucide-react";

const AUDIENCES = [
  {
    icon: User,
    title: "Individuals",
    stat: "1-click MT5 setup",
    desc: "Plug into a backtested algorithm and trade with a professional edge from day one.",
  },
  {
    icon: Building2,
    title: "Businesses",
    stat: "White-label ready",
    desc: "Scalable infrastructure your brand can run on without building it from scratch.",
  },
  {
    icon: Handshake,
    title: "Partners",
    stat: "Turnkey revenue",
    desc: "Resell access and earn recurring commission — zero infrastructure to maintain.",
  },
];

const ROTATE_MS = 3200;

// Fanned-deck offsets for each position in the stack (0 = front/active).
const DECK_STYLE = [
  { x: 0, y: 0, scale: 1, rotate: 0, zIndex: 30, opacity: 1 },
  { x: 22, y: 16, scale: 0.94, rotate: 4, zIndex: 20, opacity: 0.7 },
  { x: -18, y: 28, scale: 0.88, rotate: -5, zIndex: 10, opacity: 0.45 },
];

export default function AudienceShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % AUDIENCES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card relative overflow-hidden p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs text-mist/40">
          5i Traders · Who it&apos;s for
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-leaf">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-blink" />
          live
        </span>
      </div>

      <div className="relative h-56 md:h-64">
        {AUDIENCES.map((a, i) => {
          const offset = (i - active + AUDIENCES.length) % AUDIENCES.length;
          const style = DECK_STYLE[offset];
          const Icon = a.icon;

          return (
            <motion.div
              key={a.title}
              animate={style}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-signal/20 bg-ink-800/70 p-5 backdrop-blur-sm md:p-6"
              style={{ pointerEvents: offset === 0 ? "auto" : "none" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-signal/20 bg-signal/10 text-signal">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-mist">
                    {a.title}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-signal">
                    {a.stat}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-mist/60">{a.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-mist/10 pt-5">
        <span className="font-mono text-xs text-mist/40">
          Now showing <span className="text-signal">{AUDIENCES[active].title}</span>
        </span>
        <div className="flex items-center gap-2">
          {AUDIENCES.map((a, i) => (
            <button
              key={a.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${a.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-signal" : "w-1.5 bg-mist/20 hover:bg-mist/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
