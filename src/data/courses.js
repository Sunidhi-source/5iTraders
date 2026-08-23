// Algo add-on: 3 months of algo access, priced in USD but billed to
// Indian customers at its INR equivalent alongside the course fee.
export const ALGO_ADDON = {
  label: '3-Month Algo Add-on',
  priceINR: 6900,
  priceUSD: 69,
}

// Free Telegram channel — sits alongside the two paid courses. Everything
// on it is included at ₹0, so it skips the algo add-on / price toggle
// that the paid course cards use.
export const TELEGRAM_CHANNEL = {
  id: 'telegram',
  name: 'Telegram Channel',
  tagline: 'Everything, on the house',
  price: 0,
  link: 'https://t.me/the5i_support',
  perks: [
    'Daily live market analysis',
    'Intraday & positional chart analysis',
    'Trade calls & setups shared in real time',
    'Algo performance & result updates',
    'Course previews and webinar alerts',
  ],
}

export const COURSES = [
  {
    id: 'recorded',
    name: 'Recorded Course',
    tagline: 'Learn at your own pace',
    price: 4999,
    priceWithAlgo: 4999 + ALGO_ADDON.priceINR, // 11,899
    perks: [
      'Full recorded video curriculum',
      'Lifetime access to course material',
      'Downloadable resources & cheat sheets',
      'Community support group',
    ],
  },
  {
    id: 'live',
    name: 'Live Course',
    tagline: 'Learn live with a mentor',
    price: 24999,
    priceWithAlgo: 24999 + ALGO_ADDON.priceINR, // 31,899
    perks: [
      'Live, instructor-led sessions',
      'Real-time Q&A and doubt-clearing',
      'Recordings of every live class',
      'Priority mentor support',
    ],
  },
]
