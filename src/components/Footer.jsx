import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail } from "lucide-react";
import logo from "../assets/logo/logo.png";

const LINKS = [
  { label: "Algo Trading", to: "/algo" },
  { label: "Courses/Telegram", to: "/courses" },
  { label: "Influencer Management", to: "/influencer-management" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact Us", to: "/contact" },
];

// Inline Telegram glyph — lucide has no brand icon for this.
function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.94 3.6a1.55 1.55 0 0 0-1.63-.27L2.7 10.44a1.5 1.5 0 0 0 .1 2.8l4.53 1.53 1.75 5.6a1.4 1.4 0 0 0 2.36.55l2.56-2.55 4.44 3.28a1.5 1.5 0 0 0 2.39-.9l3.06-15.06a1.55 1.55 0 0 0-.95-1.9zM9.1 14.5l-1.4-.47 9.94-6.16-8.13 7.6zm.8 4.53-1.06-3.4 1.03.36zm1.3-1.2 1.42-1.34 1.7 1.26-1.83 1.83zm7.63.3-4.1-3.03 5.03-8.5z" />
    </svg>
  );
}

// Inline WhatsApp glyph — lucide has no brand icon for this.
function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.16-.24-.58-.48-.5-.66-.5-.17-.01-.37-.01-.56-.01a1.08 1.08 0 0 0-.78.37c-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.03.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z" />
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.02 22C17.54 22 22 17.52 22 12S17.54 2 12.02 2zm0 18.2c-1.66 0-3.2-.47-4.5-1.27l-.32-.19-3.02.79.81-2.94-.21-.3A8.16 8.16 0 0 1 3.82 12c0-4.53 3.68-8.2 8.2-8.2 4.53 0 8.2 3.67 8.2 8.2s-3.67 8.2-8.2 8.2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-mist/10 bg-ink-800/60">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-40" />
      <div className="container-xl relative grid gap-12 px-6 py-16 md:px-10 md:grid-cols-[1.4fr_1fr_1fr] lg:px-16">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <img src={logo} alt="5i Traders" className="h-8 w-auto" />
            <span className="font-display text-base font-semibold text-mist">
              5i Traders
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist/55">
            5i Traders has built a complete market ecosystem that gives
            professional edge to individuals, scalable infrastructure to
            businesses, and turnkey revenue to resellers.
          </p>
          <div className="mt-6 flex items-center gap-4 text-mist/45">
            <a
              href="https://www.linkedin.com/in/mayank-goswami-645600404?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-signal"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/5i_traders"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-signal"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://t.me/the5i_support"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="transition-colors hover:text-signal"
            >
              <TelegramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-mist/60 transition-colors hover:text-signal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-mist/60">
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-mist/35" />
              <a
                href="mailto:hello@5itraders.com"
                className="transition-colors hover:text-signal"
              >
                hello@5itraders.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon className="h-3.5 w-3.5 text-mist/35" />
              <a
                href="https://wa.me/971501106476"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-signal"
              >
                +971 50 110 6476
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-mist/10">
        <div className="container-xl flex flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-mist/35 md:flex-row md:px-10 lg:px-16">
          <p>
            &copy; {new Date().getFullYear()} 5i Traders. All rights reserved.
          </p>
          <p className="font-mono">
            Trading forex involves risk. Past performance does not guarantee
            future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
