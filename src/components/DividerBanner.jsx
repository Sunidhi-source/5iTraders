export default function DividerBanner() {
  return (
    <div className="relative h-16 w-full overflow-hidden bg-ink-800 md:h-20">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-40" />
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <polyline
          points="0,55 80,50 160,58 240,35 320,45 400,20 480,30 560,15 640,25 720,10 800,22 880,12 960,28 1040,18 1120,26 1200,14"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
