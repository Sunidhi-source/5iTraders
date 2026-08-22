import logo from "../assets/logo/logo.png";

// Replaces the old tile-grid backdrop with a space/globe scene inspired by
// the brand's new hero art direction — a glowing globe carrying the 5i
// mark, orbit rings, a candlestick arc, a scattering of stars/mini-planets,
// and a small astronaut watching it all. Everything is drawn with SVG and
// themed off the same --color-* CSS variables as the rest of the site, so
// it repaints correctly for light and dark mode with zero raster assets —
// no baked-in lighting or background to fight with.

// Deterministic "random" star field so it doesn't reshuffle on every
// re-render (no Math.random in render).
const STARS = [
  [8, 12, 1.4], [18, 28, 1], [27, 8, 1.2], [40, 20, 0.9], [52, 6, 1.3],
  [63, 16, 1], [74, 9, 1.5], [85, 22, 1], [92, 12, 1.2], [6, 45, 1],
  [15, 58, 1.3], [30, 50, 0.9], [46, 60, 1.1], [58, 48, 1], [70, 55, 1.4],
  [82, 44, 1], [95, 52, 1.2], [10, 78, 1], [22, 88, 1.3], [35, 80, 0.9],
  [48, 92, 1.1], [60, 82, 1], [72, 90, 1.4], [88, 78, 1], [96, 68, 1.2],
];

const MINI_PLANETS = [
  { left: "58%", top: "14%", size: 22, delay: "0s" },
  { left: "93%", top: "58%", size: 30, delay: "1.4s" },
  { left: "48%", top: "88%", size: 14, delay: "0.7s" },
];

export default function HeroSpaceBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base wash so the globe has somewhere to glow into, matching the
          old spotlight's right-side emphasis. */}
      <div className="absolute inset-y-0 right-0 w-full bg-[radial-gradient(ellipse_65%_75%_at_78%_42%,rgb(var(--color-signal)/0.16),transparent_65%)] md:w-3/4" />

      {/* Starfield */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {STARS.map(([x, y, r], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={r}
            fill="rgb(var(--color-mist-300))"
            className="animate-node-twinkle"
            style={{ animationDelay: `${(i % 7) * 0.4}s` }}
          />
        ))}
      </svg>

      {/* Mini orbiting planets, globe, and astronaut are a fair amount of
          visual weight on the same right-hand side where HeroEcosystem's
          node graphic lives — and on narrow screens that column is where
          the headline itself sits. Keep those pieces to lg+ (same
          breakpoint HeroEcosystem's desktop variant already uses), and
          keep it to a light starfield wash below that. */}
      {MINI_PLANETS.map((p, i) => (
        <div
          key={i}
          className="absolute hidden animate-float rounded-full lg:block"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            background:
              "radial-gradient(circle at 32% 30%, rgb(var(--color-signal-400)) 0%, rgb(var(--color-signal-900)) 70%)",
            boxShadow: "0 0 14px rgb(var(--color-signal) / 0.35)",
          }}
        />
      ))}

      {/* Globe + orbit rings, right side. Sized/positioned to sit behind
          HeroEcosystem's hub-and-spoke graphic (which renders after this
          in the DOM, so it layers on top) rather than compete with it. */}
      <div className="absolute right-[-6%] top-[2%] hidden h-[360px] w-[360px] opacity-80 lg:block xl:right-[0%] xl:h-[420px] xl:w-[420px]">
        <svg viewBox="0 0 560 560" className="h-full w-full overflow-visible">
          <defs>
            <radialGradient id="globeFill" cx="35%" cy="32%" r="75%">
              <stop offset="0%" stopColor="rgb(var(--color-signal-400))" stopOpacity="0.9" />
              <stop offset="55%" stopColor="rgb(var(--color-signal))" stopOpacity="0.85" />
              <stop offset="100%" stopColor="rgb(var(--color-signal-900))" stopOpacity="0.95" />
            </radialGradient>
            <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="78%" stopColor="rgb(var(--color-signal))" stopOpacity="0" />
              <stop offset="100%" stopColor="rgb(var(--color-signal))" stopOpacity="0.45" />
            </radialGradient>
            <clipPath id="globeClip">
              <circle cx="280" cy="280" r="170" />
            </clipPath>
          </defs>

          {/* Orbit rings, rotated for a 3D feel */}
          <g className="animate-spin" style={{ transformOrigin: "280px 280px", animationDuration: "70s" }}>
            <ellipse cx="280" cy="280" rx="255" ry="90" fill="none" stroke="rgb(var(--color-signal))" strokeOpacity="0.25" strokeWidth="1.5" transform="rotate(-12 280 280)" />
          </g>
          <g className="animate-spin" style={{ transformOrigin: "280px 280px", animationDuration: "95s", animationDirection: "reverse" }}>
            <ellipse cx="280" cy="280" rx="230" ry="230" fill="none" stroke="rgb(var(--color-signal))" strokeOpacity="0.14" strokeWidth="1" />
          </g>

          {/* Outer glow */}
          <circle cx="280" cy="280" r="200" fill="url(#globeGlow)" />

          {/* Globe body */}
          <circle cx="280" cy="280" r="170" fill="url(#globeFill)" stroke="rgb(var(--color-mist))" strokeOpacity="0.15" strokeWidth="1.5" />

          {/* Dotted "continents" texture, clipped to the globe */}
          <g clipPath="url(#globeClip)" opacity="0.5">
            {Array.from({ length: 12 }).map((_, row) =>
              Array.from({ length: 18 }).map((_, col) => {
                const x = 120 + col * 20 + (row % 2 === 0 ? 10 : 0);
                const y = 120 + row * 20;
                const dist = Math.hypot(x - 280, y - 280);
                if (dist > 168) return null;
                if ((row + col) % 3 === 0) return null;
                return (
                  <circle key={`${row}-${col}`} cx={x} cy={y} r="1.4" fill="rgb(var(--color-ink-900))" fillOpacity="0.35" />
                );
              })
            )}
          </g>

          {/* Candlestick market line arcing across the globe */}
          <g clipPath="url(#globeClip)">
            <path
              d="M 90 340 Q 280 240 470 300"
              fill="none"
              stroke="rgb(var(--color-ink-900))"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            {[130, 175, 220, 265, 310, 355, 400, 445].map((x, i) => {
              const y = 340 - (Math.abs(x - 280) / 190) * 100 + (i % 2 === 0 ? -10 : 8);
              const h = 14 + (i % 3) * 6;
              return (
                <rect
                  key={x}
                  x={x - 3}
                  y={y - h / 2}
                  width="6"
                  height={h}
                  rx="1.5"
                  fill="rgb(var(--color-ink-900))"
                  opacity="0.9"
                />
              );
            })}
          </g>

          {/* 5i logo mark, centered on the globe */}
          <foreignObject x="230" y="230" width="100" height="100">
            <div className="flex h-full w-full items-center justify-center">
              <img src={logo} alt="" className="h-14 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]" />
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Small astronaut silhouette, lower-right, watching the globe */}
      <svg
        className="absolute bottom-[2%] right-[6%] hidden h-[130px] w-[80px] opacity-90 lg:block xl:right-[10%] xl:h-[160px] xl:w-[96px]"
        viewBox="0 0 90 150"
      >
        {/* Rock */}
        <ellipse cx="45" cy="142" rx="42" ry="8" fill="rgb(var(--color-ink-500))" opacity="0.5" />
        {/* Legs */}
        <rect x="34" y="108" width="9" height="30" rx="4" fill="rgb(var(--color-mist-400))" />
        <rect x="47" y="108" width="9" height="30" rx="4" fill="rgb(var(--color-mist-400))" />
        {/* Boots */}
        <rect x="31" y="134" width="14" height="8" rx="3" fill="rgb(var(--color-mist))" />
        <rect x="45" y="134" width="14" height="8" rx="3" fill="rgb(var(--color-mist))" />
        {/* Backpack */}
        <rect x="30" y="60" width="30" height="34" rx="6" fill="rgb(var(--color-mist-400))" opacity="0.8" />
        {/* Body */}
        <rect x="26" y="58" width="38" height="52" rx="14" fill="rgb(var(--color-mist))" />
        {/* Arms */}
        <rect x="16" y="66" width="11" height="34" rx="5" fill="rgb(var(--color-mist-400))" />
        <rect x="63" y="66" width="11" height="34" rx="5" fill="rgb(var(--color-mist-400))" />
        {/* Helmet */}
        <circle cx="45" cy="38" r="24" fill="rgb(var(--color-mist))" />
        <circle cx="49" cy="36" r="15" fill="rgb(var(--color-signal-900))" />
        <circle cx="54" cy="30" r="4.5" fill="rgb(var(--color-signal-400))" opacity="0.9" className="animate-antenna-blip" />
      </svg>
    </div>
  );
}
