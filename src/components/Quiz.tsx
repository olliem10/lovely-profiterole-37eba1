import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { QUESTIONS } from '../data/questions'
import type { QuizAnswers } from '../lib/recommendation'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'

interface QuizProps {
  onComplete: (answers: QuizAnswers) => void
  onExit: () => void
}

export default function Quiz({ onComplete, onExit }: QuizProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [direction, setDirection] = useState<1 | -1>(1)

  const question = QUESTIONS[step]
  const total = QUESTIONS.length

  const handleSelect = (optionId: string) => {
    const next = { ...answers, [question.id]: optionId }
    setAnswers(next)

    window.setTimeout(() => {
      if (step === total - 1) {
        onComplete(next)
      } else {
        setDirection(1)
        setStep((s) => s + 1)
      }
    }, 220)
  }

  const goBack = () => {
    setDirection(-1)
    if (step === 0) {
      onExit()
    } else {
      setStep((s) => s - 1)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-noise px-6 py-8 sm:px-12 md:px-20">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <div className="mb-8 flex items-center gap-6">
          <button
            onClick={goBack}
            className="tap-target flex h-14 w-14 flex-none items-center justify-center rounded-full border border-[var(--nb-line)] bg-[var(--nb-surface)] text-[var(--nb-text)] active:border-[var(--nb-accent)]"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 5L7 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1">
            <ProgressBar current={step + 1} total={total} />
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full"
            >
              <QuestionCard
                question={question}
                selectedOptionId={answers[question.id]}
                onSelect={handleSelect}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
