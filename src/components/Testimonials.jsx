import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { fallbackReviews } from '../data/reviews'

function ReviewCard({ review }) {
  return (
    <div className="card mx-3 flex w-[320px] shrink-0 flex-col gap-4 p-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < (review.rating ?? 5) ? 'fill-gilt text-gilt' : 'fill-transparent text-mist/20'
            }`}
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-mist/70">&ldquo;{review.quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3 pt-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-700 font-mono text-xs text-mist/50">
          {review.name?.charAt(0) ?? '?'}
        </div>
        <span className="font-display text-sm font-medium text-mist/80">{review.name}</span>
      </div>
    </div>
  )
}

function MarqueeRow({ reviews, reverse = false }) {
  // Duplicate the list so the translateX(-50%) loop wraps seamlessly.
  const looped = [...reviews, ...reviews]
  return (
    <div className="group overflow-hidden">
      <div
        className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
      >
        {looped.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(fallbackReviews)

  useEffect(() => {
    let active = true
    supabase
      .from('reviews')
      .select('id, name, quote, rating')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (!error && data && data.length > 0) setReviews(data)
      })
    return () => {
      active = false
    }
  }, [])

  const mid = Math.ceil(reviews.length / 2)
  const rowA = reviews.slice(0, mid).length ? reviews.slice(0, mid) : reviews
  const rowB = reviews.slice(mid).length ? reviews.slice(mid) : reviews

  return (
    <div id="reviews" className="scroll-mt-24">
      <div className="mb-10 text-center">
        <span className="eyebrow">Reviews</span>
        <h3 className="mt-3 text-2xl font-semibold text-mist md:text-3xl">
          Traders running the algorithm right now
        </h3>
      </div>
      <div className="flex flex-col gap-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
        <MarqueeRow reviews={rowA} />
        <MarqueeRow reviews={rowB} reverse />
      </div>
    </div>
  )
}
