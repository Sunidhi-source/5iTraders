import { ImageIcon } from "lucide-react";

export default function PlaceholderSlot({
  label,
  aspect = "aspect-square",
  rounded = "rounded-xl",
  className = "",
  src,
}) {
  if (src) {
    return (
      <div
        className={`relative flex ${aspect} ${rounded} w-full items-center justify-center overflow-hidden border border-mist/10 bg-ink-700/60 ${className}`}
      >
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
    );
  }

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
  );
}
