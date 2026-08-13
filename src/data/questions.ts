/**
 * Quiz question bank + how each answer feeds the recommendation engine.
 *
 * Kept separate from both the shoe database (`shoes.ts`) and the scoring
 * engine (`recommendation.ts`) so questions/weights can change independently.
 *
 * Each answer can nudge numeric shoe attributes (cushioning, stability,
 * weightClass, responsiveness) via `attributeEffects`, and/or tag a
 * categorical preference (`tag`) that is matched against a shoe's
 * suitable* arrays in the scoring engine. `weight` controls how much this
 * question matters relative to others — bump it up to make a question more
 * decisive in the final match.
 */

export type AttributeKey = 'cushioning' | 'stability' | 'weightClass' | 'responsiveness'

export interface AnswerEffect {
  /** Target values this answer nudges numeric shoe attributes toward (1-5 scale). */
  attributeEffects?: Partial<Record<AttributeKey, number>>
  /** Categorical tag(s) matched against a shoe's suitable* arrays for bonus points. */
  tags?: {
    runnerType?: string
    distance?: string
    surface?: string
    purpose?: string
  }
}

export interface AnswerOption {
  id: string
  label: string
  effect: AnswerEffect
}

export interface QuizQuestion {
  id: string
  prompt: string
  helper?: string
  /** Relative importance of this question in the final score (default 1). */
  weight: number
  options: AnswerOption[]
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'runner-type',
    prompt: 'What type of runner are you?',
    weight: 1.2,
    options: [
      {
        id: 'new',
        label: 'New to running',
        effect: {
          attributeEffects: { cushioning: 4, stability: 4, responsiveness: 2 },
          tags: { runnerType: 'new' },
        },
      },
      {
        id: 'casual',
        label: 'Casual runner',
        effect: {
          attributeEffects: { cushioning: 4, stability: 3, responsiveness: 3 },
          tags: { runnerType: 'casual' },
        },
      },
      {
        id: 'regular',
        label: 'Regular runner',
        effect: {
          attributeEffects: { cushioning: 3, stability: 3, responsiveness: 4 },
          tags: { runnerType: 'regular' },
        },
      },
      {
        id: 'experienced',
        label: 'Experienced runner',
        effect: {
          attributeEffects: { cushioning: 3, stability: 2, responsiveness: 5 },
          tags: { runnerType: 'experienced' },
        },
      },
    ],
  },
  {
    id: 'frequency',
    prompt: 'How often do you run?',
    weight: 0.8,
    options: [
      {
        id: 'occasional',
        label: 'Occasionally',
        effect: { attributeEffects: { cushioning: 4, weightClass: 2 } },
      },
      {
        id: '1-2',
        label: '1-2 times a week',
        effect: { attributeEffects: { cushioning: 4, weightClass: 2 } },
      },
      {
        id: '3-4',
        label: '3-4 times a week',
        effect: { attributeEffects: { cushioning: 3, weightClass: 3 } },
      },
      {
        id: '5-plus',
        label: '5+ times a week',
        effect: { attributeEffects: { cushioning: 3, weightClass: 4, responsiveness: 4 } },
      },
    ],
  },
  {
    id: 'distance',
    prompt: 'What distances do you normally run?',
    weight: 1,
    options: [
      {
        id: '5k',
        label: '5K',
        effect: {
          attributeEffects: { weightClass: 4, responsiveness: 4, cushioning: 3 },
          tags: { distance: '5k' },
        },
      },
      {
        id: '10k',
        label: '10K',
        effect: {
          attributeEffects: { weightClass: 4, responsiveness: 4, cushioning: 3 },
          tags: { distance: '10k' },
        },
      },
      {
        id: 'half',
        label: 'Half marathon',
        effect: {
          attributeEffects: { cushioning: 4, stability: 3, responsiveness: 3 },
          tags: { distance: 'half' },
        },
      },
      {
        id: 'marathon',
        label: 'Marathon',
        effect: {
          attributeEffects: { cushioning: 5, stability: 3, weightClass: 3 },
          tags: { distance: 'marathon' },
        },
      },
      {
        id: 'mixed',
        label: 'Different distances',
        effect: {
          attributeEffects: { cushioning: 4, responsiveness: 3 },
          tags: { distance: 'mixed' },
        },
      },
    ],
  },
  {
    id: 'priority',
    prompt: 'What matters most to you in a running shoe?',
    weight: 1.3,
    options: [
      {
        id: 'max-cushion',
        label: 'Maximum cushioning',
        effect: { attributeEffects: { cushioning: 5, responsiveness: 3, stability: 3 } },
      },
      {
        id: 'lightweight-fast',
        label: 'Lightweight and fast',
        effect: { attributeEffects: { weightClass: 5, responsiveness: 5, cushioning: 3 } },
      },
      {
        id: 'balanced',
        label: 'A balance of cushioning and speed',
        effect: { attributeEffects: { cushioning: 4, responsiveness: 4, weightClass: 3 } },
      },
      {
        id: 'stability-support',
        label: 'Stability and support',
        effect: { attributeEffects: { stability: 5, cushioning: 4 } },
      },
      {
        id: 'long-run-comfort',
        label: 'Comfort for long runs',
        effect: { attributeEffects: { cushioning: 5, stability: 3, responsiveness: 3 } },
      },
    ],
  },
  {
    id: 'feel',
    prompt: 'How would you describe your preferred feel?',
    weight: 1.1,
    options: [
      {
        id: 'soft',
        label: 'Soft and cushioned',
        effect: { attributeEffects: { cushioning: 5, responsiveness: 2 } },
      },
      {
        id: 'balanced-feel',
        label: 'Balanced',
        effect: { attributeEffects: { cushioning: 3, responsiveness: 3, stability: 3 } },
      },
      {
        id: 'firm-responsive',
        label: 'Firm and responsive',
        effect: { attributeEffects: { responsiveness: 5, cushioning: 2 } },
      },
      {
        id: 'lightweight-feel',
        label: 'Lightweight and fast',
        effect: { attributeEffects: { weightClass: 5, responsiveness: 4 } },
      },
    ],
  },
  {
    id: 'surface',
    prompt: 'Where do you mainly run?',
    weight: 0.7,
    options: [
      {
        id: 'road',
        label: 'Road',
        effect: { tags: { surface: 'road' } },
      },
      {
        id: 'treadmill',
        label: 'Treadmill',
        effect: { tags: { surface: 'treadmill' } },
      },
      {
        id: 'track',
        label: 'Track',
        effect: { attributeEffects: { weightClass: 4, responsiveness: 4 }, tags: { surface: 'track' } },
      },
      {
        id: 'mixed-surface',
        label: 'Mixed surfaces',
        effect: { tags: { surface: 'mixed' } },
      },
    ],
  },
  {
    id: 'stability-need',
    prompt: 'Do you want additional stability or support?',
    weight: 1,
    options: [
      {
        id: 'yes',
        label: 'Yes',
        effect: { attributeEffects: { stability: 5 } },
      },
      {
        id: 'no',
        label: 'No',
        effect: { attributeEffects: { stability: 2 } },
      },
      {
        id: 'not-sure',
        label: "I'm not sure",
        effect: { attributeEffects: { stability: 3 } },
      },
    ],
  },
  {
    id: 'training-purpose',
    prompt: 'What are you mainly training for?',
    weight: 1.2,
    options: [
      {
        id: 'general-fitness',
        label: 'General fitness',
        effect: {
          attributeEffects: { cushioning: 4, stability: 3 },
          tags: { purpose: 'general-fitness' },
        },
      },
      {
        id: 'first-5k',
        label: 'My first 5K',
        effect: {
          attributeEffects: { cushioning: 4, stability: 3 },
          tags: { purpose: 'first-5k' },
        },
      },
      {
        id: 'training-10k',
        label: '10K',
        effect: {
          attributeEffects: { responsiveness: 4, weightClass: 4 },
          tags: { purpose: '10k' },
        },
      },
      {
        id: 'half-marathon',
        label: 'Half marathon',
        effect: {
          attributeEffects: { cushioning: 4, stability: 3, responsiveness: 3 },
          tags: { purpose: 'half-marathon' },
        },
      },
      {
        id: 'marathon',
        label: 'Marathon',
        effect: {
          attributeEffects: { cushioning: 5, stability: 3 },
          tags: { purpose: 'marathon' },
        },
      },
      {
        id: 'speed',
        label: 'Improving my speed',
        effect: {
          attributeEffects: { responsiveness: 5, weightClass: 5 },
          tags: { purpose: 'speed' },
        },
      },
      {
        id: 'enjoyment',
        label: 'Just enjoying running',
        effect: {
          attributeEffects: { cushioning: 4, responsiveness: 3 },
          tags: { purpose: 'enjoyment' },
        },
      },
    ],
  },
]
