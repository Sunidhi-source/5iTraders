import { ImageIcon } from "lucide-react";

export default function PlaceholderSlot({
  label,
  aspect = "aspect-square",
  rounded = "rounded-xl",
  className = "",
  src,
  glow = false,
}) {
  const frame = (
    <div
      className={`relative flex ${aspect} ${rounded} w-full items-center justify-center overflow-hidden border ${
        src ? "border-mist/10" : "border-dashed border-mist/20"
      } bg-ink-700/60 ${className}`}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={label}
            className={`h-full w-full object-cover ${glow ? "saturate-[0.9] contrast-[1.03]" : ""}`}
          />
          {/* Subtle, uniform vignette so photos taken in different rooms with
              different lighting/backgrounds still read as one consistent
              set, rather than each looking pasted in from somewhere else. */}
          {glow && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_-18px_26px_-8px_rgba(8,12,22,0.5)]"
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <ImageIcon className="h-6 w-6 text-mist/30" strokeWidth={1.5} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-mist/30">
            {label}
          </span>
        </div>
      )}
    </div>
  );

  if (!glow) return frame;

  return (
    <div className="relative">
      {/* Soft brand-colored halo behind the photo — gives every avatar the
          same backdrop regardless of what's actually behind the person in
          their source photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-110 rounded-full bg-signal/20 blur-xl"
      />
      {frame}
    </div>
  );
}
