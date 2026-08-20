import { motion } from "framer-motion";
import { useSectionNav } from "../lib/scrollTo";

const CANDLES = [
  { o: 40, c: 55, h: 62, l: 36, up: true },
  { o: 55, c: 48, h: 58, l: 44, up: false },
  { o: 48, c: 66, h: 70, l: 45, up: true },
  { o: 66, c: 60, h: 68, l: 55, up: false },
  { o: 60, c: 78, h: 82, l: 58, up: true },
  { o: 78, c: 72, h: 80, l: 68, up: false },
  { o: 72, c: 90, h: 95, l: 70, up: true },
  { o: 90, c: 100, h: 108, l: 86, up: true },
  { o: 100, c: 94, h: 104, l: 90, up: false },
  { o: 94, c: 118, h: 122, l: 92, up: true },
  { o: 118, c: 112, h: 120, l: 108, up: false },
  { o: 112, c: 134, h: 138, l: 110, up: true },
];

function CandlestickMotif() {
  const width = 640;
  const height = 200;
  const gap = width / CANDLES.length;
  const bodyW = gap * 0.42;
  const scale = height / 150;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {CANDLES.map((c, i) => {
        const x = i * gap + gap / 2;
        const yO = height - c.o * scale;
        const yC = height - c.c * scale;
        const yH = height - c.h * scale;
        const yL = height - c.l * scale;
        const bodyTop = Math.min(yO, yC);
        const bodyH = Math.max(Math.abs(yC - yO), 2);
        const color = c.up ? "rgb(var(--color-signal))" : "rgb(var(--color-signal-400))";

        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.07,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <line
              x1={x}
              y1={yH}
              x2={x}
              y2={yL}
              stroke={color}
              strokeWidth={1.5}
              opacity={0.7}
            />
            <rect
              x={x - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={bodyH}
              fill={color}
              rx={1.5}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

export default function Hero() {
  const goToSection = useSectionNav();

  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="container-xl relative z-10 px-6 md:px-10 lg:px-16">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6 inline-flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-blink" />
              Individuals · Businesses · Partners
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-mist md:text-5xl lg:text-[3.2rem]"
            >
              Built for traders. Scaled for business. Optimized for partners.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-md text-base leading-relaxed text-mist/60 md:text-lg"
            >
              5i Traders has built a complete market ecosystem that gives
              professional edge to individuals, scalable infrastructure to
              businesses, and turnkey revenue to resellers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => goToSection("contact")}
                className="btn-primary"
              >
                Contact Us
              </button>
              {/* TODO: swap href for the client's YouTube walkthrough link */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                See how it works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-mist/10 pt-8"
            >
              {[
                ["24/7", "Market coverage"],
                ["100%", "Rule-based execution"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <div className="font-mono text-2xl font-medium text-signal">
                    {stat}
                  </div>
                  <div className="mt-1 text-xs text-mist/45">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Signature: self-drawing candlestick chart */}
          <div className="relative">
            <div className="card relative overflow-hidden p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs text-mist/40">
                  XAU/USD · 5i-ALGO-04
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-leaf">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-blink" />
                  live
                </span>
              </div>
              <div className="h-52 md:h-64">
                <CandlestickMotif />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-mist/10 pt-5 font-mono text-xs text-mist/40">
                <span>
                  +12.4% <span className="text-signal">this session</span>
                </span>
                <span>Drawdown cap: 4.0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
