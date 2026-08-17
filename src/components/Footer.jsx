import { Linkedin, Instagram, Mail, Phone } from 'lucide-react'
import { useSectionNav } from '../lib/scrollTo'
import logo from '../assets/logo/logo.png'

const LINKS = [
  { label: 'Our Products', id: 'products' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Contact Us', id: 'contact' },
]

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
    </svg>
  )
}

export default function Footer() {
  const goToSection = useSectionNav()

  return (
    <footer className="border-t border-mist/10 bg-ink-900">
      <div className="container-xl grid gap-12 px-6 py-16 md:px-10 md:grid-cols-[1.4fr_1fr_1fr] lg:px-16">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <img src={logo} alt="5i Traders" className="h-8 w-auto" />
            <span className="font-display text-base font-semibold text-mist">5i Traders</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist/50">
            Algorithmic forex systems built to trade the plan, not the panic — backtested,
            risk-managed, and running whether you&apos;re at your desk or not.
          </p>
          <div className="mt-6 flex items-center gap-4 text-mist/40">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-signal"><Linkedin className="h-4 w-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-signal"><Instagram className="h-4 w-4" /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="transition-colors hover:text-signal"><XIcon className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => goToSection(link.id)}
                  className="text-sm text-mist/60 transition-colors hover:text-signal"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm text-mist/60">
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-mist/40" />
              <a href="mailto:hello@5itraders.com" className="transition-colors hover:text-signal">
                hello@5itraders.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-mist/40" />
              <a href="tel:+10000000000" className="transition-colors hover:text-signal">
                +1 (000) 000-0000
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mist/10">
        <div className="container-xl flex flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-mist/35 md:flex-row md:px-10 lg:px-16">
          <p>&copy; {new Date().getFullYear()} 5i Traders. All rights reserved.</p>
          <p className="font-mono">Trading forex involves risk. Past performance does not guarantee future results.</p>
        </div>
      </div>
    </footer>
  )
}
