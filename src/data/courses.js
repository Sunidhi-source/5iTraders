// Algo add-on: 3 months of algo access, priced in USD but billed to
// Indian customers at its INR equivalent alongside the course fee.
export const ALGO_ADDON = {
  label: '3-Month Algo Add-on',
  priceINR: 6900,
  priceUSD: 69,
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
