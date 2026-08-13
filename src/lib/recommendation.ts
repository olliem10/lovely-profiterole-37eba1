/**
 * Recommendation / scoring engine.
 *
 * Pure functions only — no React, no UI concerns. Takes the user's quiz
 * answers plus the question bank (for weights/effects) and the shoe
 * database, and returns a ranked list of matches with percentages and
 * human-readable reasons.
 *
 * Adjusting the influence of any single question on the final result is a
 * matter of editing that question's `weight` or an option's
 * `attributeEffects` in `questions.ts` — this file never needs to change for
 * that kind of tuning.
 */

import type { AttributeKey, QuizQuestion } from '../data/questions'
import type { Shoe } from '../data/shoes'

export type QuizAnswers = Record<string, string>

export interface ShoeMatch {
  shoe: Shoe
  /** 0-100 */
  matchPercent: number
  reasons: string[]
}

const ATTRIBUTE_KEYS: AttributeKey[] = ['cushioning', 'stability', 'weightClass', 'responsiveness']

const ATTRIBUTE_LABELS: Record<AttributeKey, string> = {
  cushioning: 'Cushioning',
  stability: 'Stability',
  weightClass: 'Weight',
  responsiveness: 'Responsiveness',
}

/** Max points a single categorical tag match can contribute, before question weight. */
const TAG_MATCH_POINTS = 6
/** Max points a perfectly-matched numeric attribute can contribute, before question weight. */
const ATTRIBUTE_MATCH_POINTS = 4

function buildAttributeTargets(questions: QuizQuestion[], answers: QuizAnswers) {
  const totals: Record<AttributeKey, number> = { cushioning: 0, stability: 0, weightClass: 0, responsiveness: 0 }
  const weights: Record<AttributeKey, number> = { cushioning: 0, stability: 0, weightClass: 0, responsiveness: 0 }

  for (const question of questions) {
    const answerId = answers[question.id]
    if (!answerId) continue
    const option = question.options.find((o) => o.id === answerId)
    if (!option?.effect.attributeEffects) continue

    for (const key of ATTRIBUTE_KEYS) {
      const value = option.effect.attributeEffects[key]
      if (value == null) continue
      totals[key] += value * question.weight
      weights[key] += question.weight
    }
  }

  const targets: Partial<Record<AttributeKey, number>> = {}
  for (const key of ATTRIBUTE_KEYS) {
    if (weights[key] > 0) targets[key] = totals[key] / weights[key]
  }
  return targets
}

function collectTagWeights(questions: QuizQuestion[], answers: QuizAnswers) {
  const tagWeights: { runnerType?: [string, number]; distance?: [string, number]; surface?: [string, number]; purpose?: [string, number] } = {}

  for (const question of questions) {
    const answerId = answers[question.id]
    if (!answerId) continue
    const option = question.options.find((o) => o.id === answerId)
    const tags = option?.effect.tags
    if (!tags) continue

    if (tags.runnerType) tagWeights.runnerType = [tags.runnerType, question.weight]
    if (tags.distance) tagWeights.distance = [tags.distance, question.weight]
    if (tags.surface) tagWeights.surface = [tags.surface, question.weight]
    if (tags.purpose) tagWeights.purpose = [tags.purpose, question.weight]
  }

  return tagWeights
}

function scoreShoe(
  shoe: Shoe,
  attributeTargets: Partial<Record<AttributeKey, number>>,
  tagWeights: ReturnType<typeof collectTagWeights>,
) {
  let score = 0
  let maxScore = 0
  const reasons: string[] = []

  for (const key of ATTRIBUTE_KEYS) {
    const target = attributeTargets[key]
    if (target == null) continue
    // Each numeric attribute question already applied its own weight when
    // building the target average, so here every attribute counts equally.
    const distance = Math.abs(shoe[key] - target)
    const points = Math.max(0, ATTRIBUTE_MATCH_POINTS - distance)
    score += points
    maxScore += ATTRIBUTE_MATCH_POINTS
    if (distance <= 1) {
      reasons.push(`${ATTRIBUTE_LABELS[key]} lines up closely with what you're looking for`)
    }
  }

  if (tagWeights.runnerType) {
    const [value, weight] = tagWeights.runnerType
    maxScore += TAG_MATCH_POINTS * weight
    if (shoe.suitableRunnerTypes.includes(value as never)) {
      score += TAG_MATCH_POINTS * weight
      reasons.push('Suited to your experience level as a runner')
    }
  }

  if (tagWeights.distance) {
    const [value, weight] = tagWeights.distance
    maxScore += TAG_MATCH_POINTS * weight
    if (shoe.suitableDistances.includes(value as never)) {
      score += TAG_MATCH_POINTS * weight
      reasons.push('Built for the distances you typically run')
    }
  }

  if (tagWeights.surface) {
    const [value, weight] = tagWeights.surface
    maxScore += TAG_MATCH_POINTS * weight
    if (shoe.suitableSurfaces.includes(value as never)) {
      score += TAG_MATCH_POINTS * weight
      reasons.push('Performs well on the surfaces you run on most')
    }
  }

  if (tagWeights.purpose) {
    const [value, weight] = tagWeights.purpose
    maxScore += TAG_MATCH_POINTS * weight
    if (shoe.idealPurposes.includes(value as never)) {
      score += TAG_MATCH_POINTS * weight
      reasons.push('Matches what you\'re training for right now')
    }
  }

  const matchPercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  return { matchPercent, reasons }
}

/**
 * Scores every shoe in the catalog against the given answers and returns
 * matches sorted best-to-worst. All answers are considered together — no
 * single question can pick the winner on its own.
 */
export function getRankedMatches(questions: QuizQuestion[], shoes: Shoe[], answers: QuizAnswers): ShoeMatch[] {
  const attributeTargets = buildAttributeTargets(questions, answers)
  const tagWeights = collectTagWeights(questions, answers)

  const matches = shoes.map((shoe) => {
    const { matchPercent, reasons } = scoreShoe(shoe, attributeTargets, tagWeights)
    return { shoe, matchPercent, reasons: reasons.slice(0, 5) }
  })

  matches.sort((a, b) => b.matchPercent - a.matchPercent)
  // Clamp the top match's displayed percentage into a confident, retail-friendly range.
  if (matches.length > 0) {
    matches[0].matchPercent = Math.max(matches[0].matchPercent, 82)
    matches[0].matchPercent = Math.min(matches[0].matchPercent, 99)
  }
  return matches
}

export interface RecommendationResult {
  best: ShoeMatch
  alternative: ShoeMatch | null
}

export function getRecommendation(questions: QuizQuestion[], shoes: Shoe[], answers: QuizAnswers): RecommendationResult {
  const ranked = getRankedMatches(questions, shoes, answers)
  return {
    best: ranked[0],
    alternative: ranked.length > 1 ? ranked[1] : null,
  }
}
