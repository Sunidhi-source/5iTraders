import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

// Small icon button that copies `value` to the clipboard and shows a
// brief "copied" confirmation. Falls back gracefully if the Clipboard
// API isn't available (older browsers / non-secure contexts).
export default function CopyButton({ value, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!value || value === '—') return

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        // Fallback for environments without the async Clipboard API.
        const textarea = document.createElement('textarea')
        textarea.value = value
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // eslint-disable-next-line no-console
      console.error('[5i Traders] copy failed')
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!value || value === '—'}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied!' : label}
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-mist/35 transition-colors hover:bg-signal/10 hover:text-signal disabled:pointer-events-none disabled:opacity-30 ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-leaf" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}
