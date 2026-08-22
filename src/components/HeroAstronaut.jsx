import { motion } from "framer-motion";

const ORBIT_DOTS = [
  { angle: 20, r: 180, size: 5, delay: "0s" },
  { angle: 100, r: 160, size: 3.5, delay: "0.6s" },
  { angle: 190, r: 185, size: 4, delay: "1.2s" },
  { angle: 260, r: 165, size: 3, delay: "1.8s" },
  { angle: 330, r: 175, size: 4.5, delay: "2.4s" },
];

export default function HeroAstronaut({ variant = "desktop" }) {
  const compact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: compact ? 0.3 : 0.1 }}
      className={
        compact
          ? "pointer-events-none relative mx-auto my-2 h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] lg:hidden"
          : "pointer-events-none absolute right-[0%] top-4 hidden h-[420px] w-[420px] lg:block xl:right-[2%] xl:top-2 xl:h-[480px] xl:w-[480px] 2xl:h-[500px] 2xl:w-[500px]"
      }
      aria-hidden="true"
    >
      <svg viewBox="40 40 440 440" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="72%"
              stopColor="rgb(var(--color-signal))"
              stopOpacity="0"
            />
            <stop
              offset="100%"
              stopColor="rgb(var(--color-signal))"
              stopOpacity="0.35"
            />
          </radialGradient>
        </defs>

        {/* Ring Glow */}
        <circle
          cx="260"
          cy="260"
          r="170"
          fill="url(#ringGlow)"
          className="animate-glowPulse"
        />

        {/* Spinning Outer Ring */}
        <g
          className="animate-spin"
          style={{ transformOrigin: "260px 260px", animationDuration: "40s" }}
        >
          <circle
            cx="260"
            cy="260"
            r="150"
            fill="none"
            stroke="rgb(var(--color-signal))"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="290 620"
            opacity="0.85"
          />
        </g>

        {/* Faint Inner Ring */}
        <circle
          cx="260"
          cy="260"
          r="150"
          fill="none"
          stroke="rgb(var(--color-signal-400))"
          strokeWidth="1"
          opacity="0.25"
        />

        {/* Orbit Dots */}
        {ORBIT_DOTS.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = 260 + d.r * Math.cos(rad);
          const y = 260 + d.r * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={d.size}
              fill="rgb(var(--color-signal-400))"
              className="animate-node-twinkle"
              style={{ animationDelay: d.delay }}
            />
          );
        })}

        {/* Astronaut - Perfectly Centered */}
        <g className="animate-float">
          <rect
            x="210"
            y="210"
            width="100"
            height="90"
            rx="16"
            fill="rgb(var(--color-mist-400))"
            opacity="0.75"
          />
          <rect
            x="200"
            y="202"
            width="120"
            height="120"
            rx="32"
            fill="rgb(var(--color-mist))"
          />
          <rect
            x="230"
            y="310"
            width="20"
            height="60"
            rx="9"
            fill="rgb(var(--color-mist-400))"
          />
          <rect
            x="270"
            y="310"
            width="20"
            height="60"
            rx="9"
            fill="rgb(var(--color-mist-400))"
          />
          <rect
            x="223"
            y="364"
            width="32"
            height="17"
            rx="7"
            fill="rgb(var(--color-mist))"
          />
          <rect
            x="265"
            y="364"
            width="32"
            height="17"
            rx="7"
            fill="rgb(var(--color-mist))"
          />
          <rect
            x="178"
            y="222"
            width="26"
            height="75"
            rx="12"
            fill="rgb(var(--color-mist-400))"
          />
          <rect
            x="316"
            y="222"
            width="26"
            height="75"
            rx="12"
            fill="rgb(var(--color-mist-400))"
          />
          <circle cx="260" cy="155" r="54" fill="rgb(var(--color-mist))" />
          <circle
            cx="270"
            cy="150"
            r="34"
            fill="rgb(var(--color-signal-900))"
          />
          <circle
            cx="283"
            cy="138"
            r="8"
            fill="rgb(var(--color-signal-400))"
            className="animate-antenna-blip"
          />
        </g>

        {/* Base Shadow */}
        <ellipse
          cx="260"
          cy="398"
          rx="85"
          ry="10"
          fill="rgb(var(--color-mist))"
          opacity="0.15"
        />
      </svg>
    </motion.div>
  );
}
