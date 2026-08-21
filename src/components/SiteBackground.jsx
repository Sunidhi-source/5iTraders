import logo from "../assets/logo/logo.png";

// A calm, site-wide echo of the Hero's animated grid — same rotated-tile
// language and logo mark, but toned way down and held still. It's meant
// to be a background watermark that sits behind every page (visible
// mostly through padding/gaps and semi-transparent panels), not a second
// hero moment. Keeping the bold pulsing/panning version exclusive to
// Hero.jsx preserves its impact and avoids animating behind body copy,
// which hurts both readability and performance on content-heavy pages.
const TILE_COUNT = 18;

export default function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900"
      aria-hidden="true"
    >
      <div className="absolute -right-1/6 -top-1/3 h-[150%] w-[140%] -rotate-[12deg] grid grid-cols-4 gap-8 opacity-[0.5] sm:grid-cols-5 md:grid-cols-6">
        {Array.from({ length: TILE_COUNT }).map((_, i) => (
          <div key={i} className="flex h-28 items-center justify-center sm:h-32 md:h-36">
            {i % 4 === 0 && (
              <img src={logo} alt="" className="h-9 w-auto opacity-[0.06] md:h-10" />
            )}
          </div>
        ))}
      </div>
      {/* Same faint dot-grid texture used elsewhere on the site (page
          heroes, footer), so this reads as one consistent background
          rather than a new pattern. */}
      <div className="absolute inset-0 bg-grid bg-grid opacity-[0.25]" />
      {/* Fades the watermark toward the page edges so it never competes
          with the header or footer. */}
      <div className="site-bg-fade absolute inset-0" />
    </div>
  );
}
