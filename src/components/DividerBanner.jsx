// Small floating chat bubbles rising through the band, plus a "typing…"
// indicator in the middle — a literal nod to the "Let's talk" headline
// above it, instead of a generic data/network motif.
const BUBBLES = [
  { left: "5%", size: 30, delay: 0, duration: 7 },
  { left: "15%", size: 20, delay: 1.6, duration: 6 },
  { left: "26%", size: 36, delay: 0.6, duration: 8 },
  { left: "37%", size: 22, delay: 2.4, duration: 6.5 },
  { left: "63%", size: 26, delay: 0.9, duration: 7.5 },
  { left: "74%", size: 18, delay: 2, duration: 6 },
  { left: "85%", size: 34, delay: 0.3, duration: 8.5 },
  { left: "94%", size: 22, delay: 2.8, duration: 7 },
];

export default function DividerBanner() {
  return (
    <div className="relative h-24 w-full overflow-hidden bg-ink-800 md:h-32">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-30" />

      {/* Rising chat bubbles */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="animate-rise absolute bottom-0 rounded-2xl border border-signal/25 bg-signal/10"
          style={{
            left: b.left,
            width: b.size,
            height: b.size * 0.62,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* "Let's talk" — typing indicator, front and center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-1.5 rounded-full border border-signal/25 bg-ink-900/70 px-4 py-2 shadow-[0_0_20px_rgb(var(--color-signal)/0.15)] backdrop-blur-sm">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-signal animate-dot-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
