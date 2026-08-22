import logo from "../assets/logo/logo.png";

// 32 tiles (up from 24) so the logo mark repeats across several rows
// instead of just the top line. Every other tile carries the logo now —
// a step of 2 still cycles through every column at both grid-cols-4
// (mobile) and grid-cols-5 (desktop), since both are coprime-adjacent
// enough not to always land in the offset-hidden column.
const TILE_COUNT = 32;

export default function HeroGridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft spotlight so the grid reads stronger on the right, where the
          card used to anchor attention — keeps the eye moving that way on
          every breakpoint instead of just centered. */}
      <div className="absolute inset-y-0 right-0 w-full bg-[radial-gradient(ellipse_60%_70%_at_80%_45%,rgb(var(--color-signal)/0.18),transparent_65%)] md:w-3/4" />

      <div className="absolute -right-1/12 -top-1/4 h-[170%] w-[160%] animate-panGrid grid grid-cols-4 gap-5 sm:-right-1/6 sm:-top-1/3 sm:h-[165%] sm:w-[150%] sm:grid-cols-5 md:-right-1/6 md:-top-1/3 md:h-[160%] md:w-[145%] md:gap-6">
        {Array.from({ length: TILE_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`hero-grid-tile flex h-28 items-center justify-center sm:h-32 md:h-36 ${
              i % 2 === 0 ? "animate-tile-pulse-slow" : "animate-tile-pulse-fast"
            }`}
          >
            {i % 2 === 0 && (
              <img
                src={logo}
                alt=""
                className="h-8 w-auto opacity-[0.16] sm:h-9 md:h-10"
              />
            )}
          </div>
        ))}
      </div>
      {/* Fades the grid into the page background on every edge */}
      <div className="hero-grid-fade absolute inset-0" />
    </div>
  );
}
