import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone, Linkedin, Instagram, LogIn } from 'lucide-react'
import { useSectionNav } from '../lib/scrollTo'
import logo from '../assets/logo/logo.png'

const NAV_LINKS = [
  { label: 'Our Products', id: 'products' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Contact Us', id: 'contact' },
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
  const goToSection = useSectionNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    setOpen(false)
    goToSection(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-mist/10 bg-ink-900/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-xl flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
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
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="font-body text-sm font-medium text-mist/70 transition-colors hover:text-signal"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-3 text-mist/50">
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
            className="flex items-center gap-1.5 font-mono text-xs text-mist/60 transition-colors hover:text-signal"
          >
            <Phone className="h-3.5 w-3.5" />
            +1 (000) 000-0000
          </a>
          <Link
            to="/admin/login"
            aria-label="Admin sign in"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-mist/15 text-mist/50 transition-colors hover:border-signal/50 hover:text-signal"
          >
            <LogIn className="h-4 w-4" />
          </Link>
        </div>

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

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-mist/10 bg-ink-900 px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="rounded-md px-2 py-3 text-left font-body text-base font-medium text-mist/80 transition-colors hover:bg-ink-800 hover:text-signal"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-md px-2 py-3 text-left font-body text-base font-medium text-mist/60"
            >
              <LogIn className="h-4 w-4" /> Admin sign in
            </Link>
          </nav>
          <div className="mt-6 flex items-center justify-between border-t border-mist/10 pt-6">
            <div className="flex items-center gap-4 text-mist/50">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)"><XIcon className="h-4 w-4" /></a>
            </div>
            <a href="tel:+10000000000" className="flex items-center gap-1.5 font-mono text-xs text-mist/60">
              <Phone className="h-3.5 w-3.5" /> Call us
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
