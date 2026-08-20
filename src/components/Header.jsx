import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Linkedin, Instagram, Sun, Moon } from 'lucide-react'
import logo from '../assets/logo/logo.png'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Algo Trading', to: '/algo' },
  { label: 'Courses/Telegram', to: '/courses' },
  { label: 'Influencer Management', to: '/influencer-management' },
]

// Simple inline X (Twitter) glyph — lucide's Twitter icon was deprecated
// in favor of a generic brand set, so we draw the mark directly.
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `font-body text-sm font-medium transition-colors hover:text-signal ${
      isActive ? 'text-signal' : 'text-mist/70'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `rounded-md px-2 py-3 text-left font-body text-base font-medium transition-colors hover:bg-ink-800 hover:text-signal ${
      isActive ? 'text-signal' : 'text-mist/80'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-mist/10 bg-ink-900/90 backdrop-blur-md'
          : 'border-b border-transparent bg-ink-900/60 backdrop-blur-sm'
      }`}
    >
      <div className="container-xl flex items-center justify-between gap-4 px-6 py-4 md:px-10 lg:px-16">
        {/* Logo slot */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="5i Traders home">
          <img src={logo} alt="5i Traders" className="h-9 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight text-mist">
            5i Traders
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-3 md:gap-5">
          <div className="hidden items-center gap-3 text-mist/50 lg:flex">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-signal">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-signal">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="transition-colors hover:text-signal">
              <XIcon className="h-4 w-4" />
            </a>
          </div>
          <a
            href="tel:+10000000000"
            className="hidden items-center gap-1.5 font-mono text-xs text-mist/60 transition-colors hover:text-signal lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            +1 (000) 000-0000
          </a>

          {/* Light/dark mode toggle */}
          <ThemeToggle />

          {/* Persistent Contact Us — always visible at every breakpoint,
              never collapsed into the mobile menu. */}
          <Link to="/contact" className="btn-primary !px-4 !py-2.5 text-sm md:!px-6 md:!py-3">
            Contact us
          </Link>

          {/* Mobile toggle */}
          <button
            className="flex items-center justify-center text-mist lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
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
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={mobileNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between border-t border-mist/10 pt-6">
            <div className="flex items-center gap-4 text-mist/50">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)"><XIcon className="h-4 w-4" /></a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a href="tel:+10000000000" className="flex items-center gap-1.5 font-mono text-xs text-mist/60">
                <Phone className="h-3.5 w-3.5" /> Call us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
