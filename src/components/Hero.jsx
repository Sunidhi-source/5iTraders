import { motion } from "framer-motion";
import { useSectionNav } from "../lib/scrollTo";
import HeroGridBackground from "./HeroGridBackground";
import HeroAstronaut from "./HeroAstronaut";

export default function Hero() {
  const goToSection = useSectionNav();

  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <HeroGridBackground />
      <div className="container-xl relative z-10 px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
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

            <HeroAstronaut variant="compact" />
        </div>

        {/* Desktop orbit: anchored to this container (= the text block's own
            height), not the section — so it centers against the headline
            and copy instead of drifting down when the section's bottom
            padding stretches past a shorter browser viewport. */}
        <HeroAstronaut variant="desktop" />
      </div>
    </section>
  );
}
