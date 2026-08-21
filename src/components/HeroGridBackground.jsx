import logo from "../assets/logo/logo.png";

// 24 tiles is enough to fill the rotated grid without hurting performance.
// Every 3rd tile carries the logo mark. Using 3 (not 4) matters: at
// grid-cols-4 (mobile), a step of 4 always lands the logo in column 0 —
// exactly the column the container's rightward offset pushes off-screen
// on narrow viewports, which is why it disappeared on phones. A step of
// 3 cycles through every column instead, so a logo tile always stays in
// the visible crop regardless of breakpoint.
const TILE_COUNT = 24;

export default function HeroGridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -right-1/12 -top-1/4 h-[170%] w-[160%] animate-panGrid grid grid-cols-4 gap-5 sm:-right-1/6 sm:-top-1/3 sm:h-[165%] sm:w-[150%] sm:grid-cols-5 md:-right-1/4 md:-top-1/3 md:h-[160%] md:w-[140%] md:gap-6">
        {Array.from({ length: TILE_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`hero-grid-tile flex h-28 items-center justify-center sm:h-32 md:h-36 ${
              i % 2 === 0 ? "animate-tile-pulse-slow" : "animate-tile-pulse-fast"
            }`}
          >
            {i % 3 === 0 && (
              <img
                src={logo}
                alt=""
                className="h-8 w-auto opacity-30 sm:h-9 md:h-10"
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
