// A small, friendly bot mascot for the Algo Trading hero — built as plain
// SVG (no image asset) so it inherits the theme's CSS variables and stays
// crisp at any size. Purely decorative.
export default function AlgoBot({ className = "" }) {
  return (
    <div className={`animate-float ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 220"
        className="h-full w-full drop-shadow-[0_12px_30px_rgba(36,144,243,0.25)]"
      >
        {/* Soft glow behind the bot */}
        <ellipse
          cx="100"
          cy="120"
          rx="70"
          ry="70"
          fill="rgb(var(--color-signal))"
          opacity="0.12"
        />

        {/* Antenna */}
        <line x1="100" y1="30" x2="100" y2="52" stroke="rgb(var(--color-signal))" strokeWidth="3" strokeLinecap="round" />
        <circle
          cx="100"
          cy="24"
          r="7"
          fill="rgb(var(--color-signal))"
          className="origin-center animate-antenna-blip"
        />

        {/* Head */}
        <rect
          x="46"
          y="50"
          width="108"
          height="82"
          rx="24"
          fill="rgb(var(--color-ink-800))"
          stroke="rgb(var(--color-signal))"
          strokeWidth="2.5"
          opacity="0.97"
        />

        {/* Visor */}
        <rect x="62" y="72" width="76" height="38" rx="14" fill="rgb(var(--color-signal))" opacity="0.14" />

        {/* Eyes (blink together) */}
        <g className="origin-center animate-bot-blink" style={{ transformBox: "fill-box" }}>
          <circle cx="82" cy="91" r="8" fill="rgb(var(--color-signal))" />
          <circle cx="118" cy="91" r="8" fill="rgb(var(--color-signal))" />
        </g>

        {/* Ears / side nodes */}
        <circle cx="42" cy="90" r="7" fill="rgb(var(--color-ink-800))" stroke="rgb(var(--color-signal))" strokeWidth="2" />
        <circle cx="158" cy="90" r="7" fill="rgb(var(--color-ink-800))" stroke="rgb(var(--color-signal))" strokeWidth="2" />

        {/* Neck */}
        <rect x="90" y="132" width="20" height="12" fill="rgb(var(--color-signal))" opacity="0.5" />

        {/* Body */}
        <rect
          x="58"
          y="144"
          width="84"
          height="62"
          rx="18"
          fill="rgb(var(--color-ink-800))"
          stroke="rgb(var(--color-signal))"
          strokeWidth="2.5"
          opacity="0.97"
        />

        {/* Chart glyph on chest — ties the mascot to "algo trading" */}
        <polyline
          points="76,182 90,168 102,178 116,158 128,166"
          fill="none"
          stroke="rgb(var(--color-signal))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <circle cx="128" cy="166" r="3.5" fill="rgb(var(--color-signal))" />
      </svg>
    </div>
  );
}
