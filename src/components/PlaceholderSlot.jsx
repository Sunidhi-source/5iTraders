import { ImageIcon } from 'lucide-react'

/**
 * Marked placeholder for an image asset that will be dropped in later.
 * Drop the real file into /src/assets/ and swap the <img> back in —
 * every usage below documents the exact path + aspect ratio expected.
 */
export default function PlaceholderSlot({
  label,
  aspect = 'aspect-square',
  rounded = 'rounded-xl',
  className = '',
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex ${aspect} ${rounded} w-full items-center justify-center overflow-hidden border border-dashed border-mist/20 bg-ink-700/60 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="h-6 w-6 text-mist/30" strokeWidth={1.5} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-mist/30">
          {label}
        </span>
      </div>
    </div>
  )
}
