import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Linkedin, Instagram, Sun, Moon } from "lucide-react";
import logo from "../assets/logo/logo.png";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Algo Trading", to: "/algo" },
  { label: "Courses/Telegram", to: "/courses" },
  { label: "Influencer Management", to: "/influencer-management" },
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `font-body text-sm font-medium transition-colors hover:text-signal ${
      isActive ? "text-signal" : "text-mist/70"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `rounded-md px-2 py-3 text-left font-body text-base font-medium transition-colors hover:bg-ink-800 hover:text-signal ${
      isActive ? "text-signal" : "text-mist/80"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-mist/10 bg-ink-900/90 backdrop-blur-md"
          : "border-b border-transparent bg-ink-900/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-xl flex items-center justify-between gap-4 px-6 py-4 md:px-10 lg:px-16">
        {/* Logo slot */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="5i Traders home"
        >
          <img src={logo} alt="5i Traders" className="h-9 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight text-mist">
            5i Traders
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-3 md:gap-5">
          <div className="hidden items-center gap-3 text-mist/50 lg:flex">
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

          <a
            href="https://wa.me/971501106476"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 font-mono text-xs text-mist/60 transition-colors hover:text-signal lg:flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            +971 50 110 6476
          </a>

          {/* Light/dark mode toggle */}
          <ThemeToggle />

          {/* Persistent Contact Us */}
          <Link
            to="/contact"
            className="btn-primary !px-4 !py-2.5 text-sm md:!px-6 md:!py-3"
          >
            Contact us
          </Link>

          {/* Mobile toggle */}
          <button
            className="flex items-center justify-center text-mist lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-mist/10 bg-ink-900 px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={mobileNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between border-t border-mist/10 pt-6">
            <div className="flex items-center gap-4 text-mist/50">
              <a
                href="https://www.linkedin.com/in/mayank-goswami-645600404?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/5i_traders"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://t.me/the5i_support"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <a
                href="https://wa.me/971501106476"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-mist/60"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
