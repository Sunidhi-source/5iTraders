import { motion } from "framer-motion";
import { LineChart, Send, Megaphone, Handshake } from "lucide-react";
import logo from "../assets/logo/logo.png";

// A hub-and-spoke composition. Center = the 5i mark. Four glass nodes orbit
// it, each tied back with a thin animated line. Positions are laid out as
// percentages, rotated off the plain N/E/S/W axis so it reads as an organic
// ecosystem rather than a grid/dashboard. Both variants below share these
// same percentages, so the compact (mobile) version is a faithful shrink of
// the desktop one rather than a different layout.
const NODES = [
  {
    label: "Algo Trading",
    compactLabel: "Algo Trading",
    icon: LineChart,
    left: "37.5%",
    top: "15.5%",
    floatDelay: "0s",
  },
  {
    label: "Courses / Telegram",
    compactLabel: "Telegram",
    icon: Send,
    left: "84%",
    top: "37.5%",
    floatDelay: "0.9s",
  },
  {
    label: "Influencer Mgmt",
    compactLabel: "Influencer",
    icon: Megaphone,
    left: "62.5%",
    top: "84%",
    floatDelay: "1.8s",
  },
  {
    label: "Businesses / Partners",
    compactLabel: "Partners",
    icon: Handshake,
    left: "15.5%",
    top: "62.5%",
    floatDelay: "2.6s",
  },
];

// Same layout, in raw 0–520 units, for the SVG line layer (viewBox scales
// to whatever pixel size the wrapper renders at, so one set of points
// serves both variants).
const LINE_POINTS = [
  [195, 81],
  [438, 195],
  [325, 438],
  [81, 325],
];
const CENTER = [260, 260];

export default function HeroEcosystem({ variant = "desktop" }) {
  const compact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: compact ? 0.5 : 0.2 }}
      className={
        compact
          ? "pointer-events-none relative mx-auto mt-16 h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] lg:hidden"
          : "pointer-events-none absolute right-[6%] top-[36%] hidden h-[280px] w-[280px] -translate-y-1/2 lg:block xl:right-[8%] xl:h-[330px] xl:w-[330px]"
      }
      aria-hidden="true"
    >
      {/* Connecting lines + traveling data dots */}
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

      {/* Central hub */}
      <div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={compact ? { width: 64, height: 64 } : { width: 108, height: 108 }}
      >
        <div className="absolute inset-0 rounded-full bg-signal/25 blur-2xl animate-glowPulse" />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-signal/30 bg-ink-800/80 shadow-[0_0_0_1px_rgba(36,144,243,0.08)] backdrop-blur">
          <img
            src={logo}
            alt=""
            className={compact ? "h-6 w-auto opacity-90" : "h-11 w-auto opacity-90"}
          />
        </div>
      </div>

      {/* Orbiting glass nodes */}
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
