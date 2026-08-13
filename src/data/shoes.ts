/**
 * Shoe database — the single source of truth for the recommendation engine.
 *
 * This file is intentionally decoupled from quiz/scoring logic so the New Balance
 * catalog can be added to, edited or fully replaced later without touching any
 * other part of the app. Every shoe is scored the same way against quiz answers,
 * so adding a new shoe is just adding a new object to SHOES below.
 *
 * Replace `imageUrl` / `productUrl` placeholders once real assets/links exist.
 */

export type RunnerType = 'new' | 'casual' | 'regular' | 'experienced'
export type Surface = 'road' | 'treadmill' | 'track' | 'mixed'
export type Distance = '5k' | '10k' | 'half' | 'marathon' | 'mixed'
export type TrainingPurpose =
  | 'general-fitness'
  | 'first-5k'
  | '10k'
  | 'half-marathon'
  | 'marathon'
  | 'speed'
  | 'enjoyment'

export interface Shoe {
  id: string
  name: string
  /** e.g. "Max Cushion", "Racing / Speed", "Daily Trainer", "Stability" */
  category: string
  tagline: string
  description: string
  /** 1 (minimal) – 5 (maximum) */
  cushioning: number
  /** 1 (neutral) – 5 (max support) */
  stability: number
  /** 1 (heavy) – 5 (ultra-light) */
  weightClass: number
  /** 1 (soft/slow rebound) – 5 (very responsive/springy) */
  responsiveness: number
  suitableDistances: Distance[]
  suitableRunnerTypes: RunnerType[]
  suitableSurfaces: Surface[]
  idealPurposes: TrainingPurpose[]
  highlights: string[]
  imageUrl: string
  productUrl: string
}

export const SHOES: Shoe[] = [
  {
    id: 'fresh-foam-x-1080',
    name: 'Fresh Foam X 1080',
    category: 'Max Cushion Daily Trainer',
    tagline: 'Plush, premium comfort for every mile',
    description:
      'A supremely cushioned neutral trainer built for runners who want to soak up the miles in comfort. Soft underfoot without feeling unstable, it disappears beneath you on long, easy efforts.',
    cushioning: 5,
    stability: 2,
    weightClass: 2,
    responsiveness: 3,
    suitableDistances: ['10k', 'half', 'marathon', 'mixed'],
    suitableRunnerTypes: ['new', 'casual', 'regular', 'experienced'],
    suitableSurfaces: ['road', 'treadmill', 'mixed'],
    idealPurposes: ['general-fitness', 'half-marathon', 'marathon', 'enjoyment'],
    highlights: [
      'Plush Fresh Foam X midsole absorbs impact on long runs',
      'Breathable engineered knit upper keeps feet cool',
      'Smooth, forgiving ride for everyday mileage',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
  {
    id: 'fuelcell-rebel-v4',
    name: 'FuelCell Rebel v4',
    category: 'Lightweight Speed Trainer',
    tagline: 'Fast, springy and built to fly',
    description:
      'A featherweight, energetic ride designed for pace-pushers. The bouncy FuelCell foam and snappy toe spring make tempo runs and speedwork feel effortless.',
    cushioning: 3,
    stability: 2,
    weightClass: 5,
    responsiveness: 5,
    suitableDistances: ['5k', '10k', 'mixed'],
    suitableRunnerTypes: ['regular', 'experienced'],
    suitableSurfaces: ['road', 'track', 'mixed'],
    idealPurposes: ['speed', '10k', 'first-5k', 'enjoyment'],
    highlights: [
      'Ultra-responsive FuelCell foam returns energy every stride',
      'Lightweight knit upper built for speed days',
      'Snappy toe spring encourages a quicker turnover',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
  {
    id: 'fresh-foam-x-880',
    name: 'Fresh Foam X 880',
    category: 'Balanced Daily Trainer',
    tagline: 'The do-it-all everyday shoe',
    description:
      'A dependable, balanced trainer that blends cushioning with a responsive toe-off. Ideal for runners who want one versatile shoe for easy runs, tempo work and everything in between.',
    cushioning: 4,
    stability: 3,
    weightClass: 3,
    responsiveness: 4,
    suitableDistances: ['5k', '10k', 'half', 'mixed'],
    suitableRunnerTypes: ['casual', 'regular', 'experienced'],
    suitableSurfaces: ['road', 'treadmill', 'mixed'],
    idealPurposes: ['general-fitness', '10k', 'half-marathon', 'enjoyment', 'first-5k'],
    highlights: [
      'Balanced cushioning-to-responsiveness ratio suits most runs',
      'Durable rubber outsole holds up to high mileage',
      'Versatile enough for daily training and race day',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
  {
    id: '860-v14',
    name: '860v14',
    category: 'Stability Trainer',
    tagline: 'Reliable support, mile after mile',
    description:
      'Built for runners who want extra guidance underfoot. A supportive medial post and secure fit help keep every stride controlled, even as fatigue sets in late in a long run.',
    cushioning: 4,
    stability: 5,
    weightClass: 2,
    responsiveness: 3,
    suitableDistances: ['10k', 'half', 'marathon', 'mixed'],
    suitableRunnerTypes: ['new', 'casual', 'regular', 'experienced'],
    suitableSurfaces: ['road', 'treadmill', 'mixed'],
    idealPurposes: ['general-fitness', 'half-marathon', 'marathon', 'enjoyment'],
    highlights: [
      'Supportive medial post adds stability where you need it',
      'Plush cushioning stays comfortable deep into long runs',
      'Secure, structured upper locks the foot in place',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
  {
    id: 'fuelcell-supercomp-elite',
    name: 'FuelCell SuperComp Elite v4',
    category: 'Carbon Racing Shoe',
    tagline: 'Podium-ready propulsion for race day',
    description:
      'A carbon-plated racing shoe engineered for peak performance over 10K to marathon distances. Explosive energy return and a rolling ride help experienced runners chase new personal bests.',
    cushioning: 4,
    stability: 2,
    weightClass: 5,
    responsiveness: 5,
    suitableDistances: ['10k', 'half', 'marathon'],
    suitableRunnerTypes: ['experienced'],
    suitableSurfaces: ['road', 'mixed'],
    idealPurposes: ['speed', 'half-marathon', 'marathon', '10k'],
    highlights: [
      'Full-length carbon fiber plate drives an explosive toe-off',
      'High-rebound FuelCell foam built for race-day pace',
      'Ultra-light construction shaves seconds off every mile',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
  {
    id: 'fresh-foam-x-evoz',
    name: 'Fresh Foam X Evoz v4',
    category: 'Max Cushion Performance Trainer',
    tagline: 'Big cushioning with a fast, rockered ride',
    description:
      'Maximum cushioning meets a performance-oriented rocker shape, giving long-distance runners a smooth, propulsive ride without sacrificing plushness underfoot.',
    cushioning: 5,
    stability: 3,
    weightClass: 4,
    responsiveness: 4,
    suitableDistances: ['half', 'marathon', 'mixed'],
    suitableRunnerTypes: ['regular', 'experienced'],
    suitableSurfaces: ['road', 'mixed'],
    idealPurposes: ['marathon', 'half-marathon', 'enjoyment'],
    highlights: [
      'High-volume Fresh Foam X stack cushions the longest efforts',
      'Rockered geometry keeps the ride moving forward efficiently',
      'Engineered for high-mileage marathon training blocks',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
  {
    id: 'fuelcell-propel-v5',
    name: 'FuelCell Propel v5',
    category: 'Everyday Speed Trainer',
    tagline: 'Light, quick and easy to love',
    description:
      'An accessible, lightweight trainer with a lively FuelCell midsole — a great entry point for runners stepping up their pace without stepping into a full-on racing shoe.',
    cushioning: 3,
    stability: 3,
    weightClass: 4,
    responsiveness: 4,
    suitableDistances: ['5k', '10k', 'mixed'],
    suitableRunnerTypes: ['new', 'casual', 'regular'],
    suitableSurfaces: ['road', 'treadmill', 'track', 'mixed'],
    idealPurposes: ['first-5k', '10k', 'general-fitness', 'speed', 'enjoyment'],
    highlights: [
      'Lightweight FuelCell foam adds energetic pop to easy runs',
      'Approachable, flexible ride great for newer runners',
      'Breathable mesh upper for everyday comfort',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
  {
    id: '520-v8',
    name: '520v8',
    category: 'Everyday Comfort Trainer',
    tagline: 'Simple, comfortable, dependable',
    description:
      'A straightforward, well-cushioned trainer that is perfect for runners just getting started. Comfortable out of the box with a forgiving ride for building a running habit.',
    cushioning: 3,
    stability: 3,
    weightClass: 2,
    responsiveness: 2,
    suitableDistances: ['5k', '10k', 'mixed'],
    suitableRunnerTypes: ['new', 'casual'],
    suitableSurfaces: ['road', 'treadmill', 'mixed'],
    idealPurposes: ['general-fitness', 'first-5k', 'enjoyment'],
    highlights: [
      'Forgiving, comfortable ride ideal for building running habits',
      'Great value everyday trainer for shorter, easier runs',
      'Cushioned enough for treadmill and casual road miles',
    ],
    imageUrl: '/shoes/placeholder.svg',
    productUrl: 'https://www.newbalance.com/',
  },
]
