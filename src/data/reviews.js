// Fallback data shown until the `reviews` table has rows in Supabase.
// Shape matches the `reviews` table: { id, name, quote, rating }
export const fallbackReviews = [
  {
    id: 1,
    name: 'Daniel R.',
    quote: 'Set it up on a Friday, forgot about it, came back Monday to three green trades. Exactly the hands-free execution I was after.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya M.',
    quote: 'The backtesting data actually matched live performance within a few points. That alone earned my trust.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Chidi O.',
    quote: 'I run this alongside a full-time job. The algorithm doesn\u2019t care that I\u2019m asleep at 3am — it keeps working.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Laura T.',
    quote: 'Support walked me through risk settings before I deposited a cent. No pressure, just information.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Marcus B.',
    quote: 'Six months in and the drawdown controls have done exactly what the docs said they would.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Ingrid S.',
    quote: 'Switched from manual day trading. My stress levels dropped before my returns even improved.',
    rating: 5,
  },
]
