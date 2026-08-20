import { useState } from "react";
import { motion } from "framer-motion";
import Testimonials from "./Testimonials";

import screenshot1 from "../assets/proof/screenshot-1.jpg";
import screenshot2 from "../assets/proof/screenshot-2.jpg";
import screenshot3 from "../assets/proof/screenshot-3.jpg";
import screenshot4 from "../assets/proof/screenshot-4.jpg";
import screenshot5 from "../assets/proof/screenshot-5.jpg";
import screenshot6 from "../assets/proof/screenshot-6.jpg";

const SCREENSHOTS = [
  screenshot1,
  screenshot2,
  screenshot3,
  screenshot4,
  screenshot5,
  screenshot6,
];

// Duplicate the list so the loop can wrap seamlessly at -50%
const MARQUEE_ITEMS = [...SCREENSHOTS, ...SCREENSHOTS];

export default function ProofSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="section-pad border-t border-mist/10 overflow-hidden">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="eyebrow">The Proof</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
            Straight from our traders
          </h2>
          <p className="mt-4 text-mist/55">
            Real chats, real accounts, real profits. This is what our clients
            send us — their account balance alongside their own words, unedited.
          </p>
        </motion.div>
      </div>

      <div
        className="container-xl relative overflow-hidden px-6 md:px-10 lg:px-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges so the row doesn't cut off harshly — and the row now
            stays within the same container width as every other section,
            instead of bleeding to the browser edge. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-28" />

        <motion.div
          className="flex w-max gap-5"
          animate={isPaused ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {MARQUEE_ITEMS.map((src, i) => (
            <div
              key={i}
              className="relative h-[420px] w-[210px] flex-shrink-0 overflow-hidden rounded-2xl border border-mist/10 bg-ink-700/60 shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={src}
                alt={`Client chat and profit screenshot ${(i % SCREENSHOTS.length) + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container-xl mt-24">
        <Testimonials />
      </div>
    </section>
  );
}
