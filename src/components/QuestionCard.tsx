import { motion } from 'motion/react'
import type { QuizQuestion } from '../data/questions'

interface QuestionCardProps {
  question: QuizQuestion
  selectedOptionId?: string
  onSelect: (optionId: string) => void
}

export default function QuestionCard({ question, selectedOptionId, onSelect }: QuestionCardProps) {
  return (
    <div className="w-full">
      <h2 className="font-display mb-8 text-3xl leading-tight text-[var(--nb-text)] sm:text-4xl md:text-5xl">
        {question.prompt}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const isSelected = option.id === selectedOptionId
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(option.id)}
              className={`tap-target group relative flex min-h-[92px] items-center justify-between rounded-2xl border px-7 py-6 text-left text-lg font-semibold transition-colors sm:text-xl ${
                isSelected
                  ? 'border-[var(--nb-accent)] bg-[var(--nb-accent)] text-[#0b0d10]'
                  : 'border-[var(--nb-line)] bg-[var(--nb-surface)] text-[var(--nb-text)] active:border-[var(--nb-accent)]'
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`ml-4 flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? 'border-[#0b0d10] bg-[#0b0d10]' : 'border-[var(--nb-line)] group-active:border-[var(--nb-accent)]'
                }`}
              >
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12.5L9 17.5L20 6.5" stroke="var(--nb-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
