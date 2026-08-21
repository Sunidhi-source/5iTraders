import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { KeyRound, DollarSign, Sparkles, ExternalLink } from "lucide-react";
import { useSectionNav } from "../lib/scrollTo";
import ProofSection from "../components/ProofSection";
import CopyButton from "../components/CopyButton";
import AlgoBot from "../components/AlgoBot";

const BOXES = [
  {
    icon: KeyRound,
    title: "Get Investor ID & Password",
    desc: "Jump straight to your MT5 credentials — issued once you\u2019re set up on the algorithm.",
    action: {
      type: "anchor",
      target: "mt5-credentials",
      label: "View credentials",
    },
  },
  {
    icon: DollarSign,
    title: "Pricing",
    desc: "Every plan runs the same algorithm — pick the term that fits.",
    action: { type: "link", to: "/pricing", label: "See pricing" },
  },
  {
    icon: Sparkles,
    title: "Get Free Trial",
    desc: "Talk to the team and we\u2019ll get you set up on a trial run.",
    action: { type: "link", to: "/contact", label: "Contact us" },
  },
];

const MT5_ACCOUNTS = [
  {
    label: "MT5 Account 1",
    id: "34117652",
    password: "Mayank@123",
    server: "vantageMarket-Live 11",
  },
  {
    label: "MT5 Account 2",
    id: "86304373",
    password: "5i@MAAKMX1M",
    server: "XMGlobal-MT5 4",
  },
  {
    label: "MT5 Account 3",
    id: "34117650",
    password: "Mayank@123",
    server: "vantageMarket-Live 11",
  },
  {
    label: "MT5 Account 4",
    id: "33869475",
    password: "Mayank@123",
    server: "vantageMarket-Live 11",
  },
];

// TODO: client to provide broker name + real "Open your account" links.
const BROKERS = [
  {
    name: "Broker Partner 1",
    desc: "Our primary recommended broker for algo execution.",
    href: "#",
  },
  {
    name: "Broker Partner 2",
    desc: "An alternative broker option for regional availability.",
    href: "#",
  },
];

export default function AlgoTrading() {
  const goToSection = useSectionNav();

  return (
    <>
      <section className="relative overflow-hidden border-b border-mist/10 pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-60" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" />
        <div className="container-xl relative px-6 md:px-10 lg:px-16">
          <AlgoBot className="pointer-events-none absolute right-6 top-8 hidden h-40 w-40 md:right-10 lg:block lg:h-48 lg:w-48 xl:right-16 xl:h-56 xl:w-56" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="eyebrow">Algo Trading</span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mist md:text-5xl">
              Our Algo
            </h1>
            <p className="mt-5 max-w-xl text-mist/60">
              Backtested, risk-managed forex algorithms running live on your MT5
              account — no hesitation, no emotion, no missed sessions.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BOXES.map((box, i) => (
              <motion.div
                key={box.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card flex flex-col p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-signal/10 text-signal">
                  <box.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-mist">
                  {box.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist/50">
                  {box.desc}
                </p>
                {box.action.type === "anchor" ? (
                  <button
                    onClick={() => goToSection(box.action.target)}
                    className="btn-secondary mt-6"
                  >
                    {box.action.label}
                  </button>
                ) : (
                  <Link
                    to={box.action.to}
                    className="btn-secondary mt-6 text-center"
                  >
                    {box.action.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MT5 investor credentials */}
      <section
        id="mt5-credentials"
        className="section-pad scroll-mt-24 border-b border-mist/10"
      >
        <div className="container-xl">
          <div className="max-w-2xl">
            <span className="eyebrow">Get Investor ID &amp; Password</span>
            <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
              MT5 investor credentials
            </h2>
            <p className="mt-4 text-mist/55">
              Use these read-only investor logins to follow the algorithm live
              in your own MT5 terminal. Credentials below are placeholders until
              the client provides live account details.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {MT5_ACCOUNTS.map((acc) => (
              <div key={acc.label} className="card p-6">
                <h4 className="font-display text-sm font-semibold text-mist">
                  {acc.label}
                </h4>
                <dl className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 font-mono text-xs text-mist/60">
                  <dt className="text-mist/35">Investor ID</dt>
                  <dd className="truncate">{acc.id}</dd>
                  <CopyButton value={acc.id} label="Copy investor ID" />

                  <dt className="text-mist/35">Password</dt>
                  <dd className="truncate">{acc.password}</dd>
                  <CopyButton value={acc.password} label="Copy password" />

                  <dt className="text-mist/35">Server</dt>
                  <dd className="truncate">{acc.server}</dd>
                  <CopyButton value={acc.server} label="Copy server" />
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Trusted Broker */}
      <section className="section-pad border-b border-mist/10 bg-ink-800/40">
        <div className="container-xl">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Trusted Broker</span>
            <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">
              Where we execute
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {BROKERS.map((broker) => (
              <div key={broker.name} className="card flex flex-col p-6">
                <h4 className="font-display text-base font-semibold text-mist">
                  {broker.name}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist/50">
                  {broker.desc}
                </p>
                <a
                  href={broker.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-6 w-fit"
                >
                  Open your account <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Reviews — reuse the same proof section as Home */}
      <ProofSection />
    </>
  );
}
