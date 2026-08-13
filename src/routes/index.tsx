import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Landing from '../components/Landing'
import Quiz from '../components/Quiz'
import Results from '../components/Results'
import { QUESTIONS } from '../data/questions'
import { SHOES } from '../data/shoes'
import { getRecommendation, type QuizAnswers, type RecommendationResult } from '../lib/recommendation'
import type { AppStage } from '../lib/types'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [stage, setStage] = useState<AppStage>('landing')
  const [result, setResult] = useState<RecommendationResult | null>(null)

  const handleComplete = (answers: QuizAnswers) => {
    setResult(getRecommendation(QUESTIONS, SHOES, answers))
    setStage('results')
  }

  const handleRestart = () => {
    setResult(null)
    setStage('landing')
  }

  if (stage === 'quiz') {
    return <Quiz onComplete={handleComplete} onExit={() => setStage('landing')} />
  }

  if (stage === 'results' && result) {
    return <Results result={result} onRestart={handleRestart} />
  }

  return <Landing onStart={() => setStage('quiz')} />
}
