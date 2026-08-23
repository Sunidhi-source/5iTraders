import { motion } from "framer-motion";
import { LineChart, Send, Megaphone, Handshake } from "lucide-react";

// Four glass nodes that orbit AROUND the astronaut (HeroAstronaut) rather
// than around a hub of their own — the astronaut is the center of the
// ecosystem. This component is laid out on the exact same box (same
// absolute position + size) as HeroAstronaut so the two share one
// coordinate space: node positions are percentages of that shared box,
// and the connecting lines' shared viewBox center (260,260 of 0–520)
// lines up with the astronaut's own center point. Rendered as a sibling
// *before* HeroAstronaut in the DOM so the astronaut sits visually on
// top, hiding the inner half of each line behind it.
const NODES = [
  {
    label: "Algo Trading",
    compactLabel: "Algo Trading",
    icon: LineChart,
    left: "33.75%",
    top: "5.15%",
    floatDelay: "0s",
  },
  {
    label: "Courses / Telegram",
    compactLabel: "Telegram",
    icon: Send,
    left: "94.85%",
    top: "33.75%",
    floatDelay: "0.9s",
  },
  {
    label: "Influencer Mgmt",
    compactLabel: "Influencer",
    icon: Megaphone,
    left: "66.25%",
    top: "94.85%",
    floatDelay: "1.8s",
  },
  {
    label: "Businesses / Partners",
    compactLabel: "Partners",
    icon: Handshake,
    left: "5.15%",
    top: "66.25%",
    floatDelay: "2.6s",
  },
];

// Same layout, in raw 0–520 units, for the SVG line layer (viewBox scales
// to whatever pixel size the wrapper renders at, so one set of points
// serves both variants). Lines run from the shared center (= the
// astronaut's center) out to each node.
const LINE_POINTS = [
  [175.5, 27.3],
  [491.4, 175.5],
  [344.5, 491.4],
  [27.3, 344.5],
];
const CENTER = [260, 260];

export default function HeroEcosystem({ variant = "orbit" }) {
  const compact = variant === "orbit-compact";

  // Matches HeroAstronaut's own wrapper classes exactly (compact: relative
  // + fixed size, fills its shared parent; desktop: absolute, pinned to
  // the same spot) so the two graphics occupy one shared box.
  const wrapperClass = compact
    ? "pointer-events-none absolute inset-0 h-full w-full lg:hidden"
    : "pointer-events-none absolute right-[0%] top-4 hidden h-[420px] w-[420px] lg:block xl:right-[2%] xl:top-2 xl:h-[480px] xl:w-[480px] 2xl:h-[500px] 2xl:w-[500px]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: compact ? 0.4 : 0.3 }}
      className={wrapperClass}
      aria-hidden="true"
    >
      {/* Connecting lines + traveling data dots, radiating from the
          astronaut's own center out to each floating node. */}
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full">
        {LINE_POINTS.map(([x, y], i) => (
          <line
            key={i}
            x1={CENTER[0]}
            y1={CENTER[1]}
            x2={x}
            y2={y}
            stroke="rgb(var(--color-signal))"
            strokeWidth={compact ? "1.25" : "1.5"}
            strokeLinecap="round"
            strokeDasharray="1 11"
            opacity="0.55"
            className={i % 2 === 0 ? "animate-flow-line" : "animate-flow-line-slow"}
          />
        ))}
        {/* Faint twinkling node where each line meets its card */}
        {LINE_POINTS.map(([x, y], i) => (
          <circle
            key={`n-${i}`}
            cx={x}
            cy={y}
            r={compact ? "2.5" : "3"}
            fill="rgb(var(--color-signal))"
            className="animate-node-twinkle"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </svg>

      {/* Orbiting glass nodes — the services revolving around the astronaut */}
      {NODES.map(({ label, compactLabel, icon: Icon, left, top, floatDelay }) => (
        <div
          key={label}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
          style={{ left, top, animationDelay: floatDelay }}
        >
          <div
            className={
              compact
                ? "flex items-center gap-1.5 rounded-xl border border-mist/15 bg-ink-800/70 px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md"
                : "flex items-center gap-2 rounded-2xl border border-mist/15 bg-ink-800/70 px-3.5 py-2.5 shadow-lg shadow-black/10 backdrop-blur-md"
            }
          >
            <span
              className={
                compact
                  ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal"
                  : "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-signal/10 text-signal"
              }
            >
              <Icon className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} strokeWidth={1.75} />
            </span>
            <span
              className={
                compact
                  ? "whitespace-nowrap font-mono text-[8px] uppercase tracking-wide text-mist/70"
                  : "whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-mist/70"
              }
            >
              {compact ? compactLabel : label}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
