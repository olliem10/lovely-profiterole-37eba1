import { motion } from 'motion/react'
import type { RecommendationResult } from '../lib/recommendation'
import ShoeCard from './ShoeCard'

interface ResultsProps {
  result: RecommendationResult
  onRestart: () => void
}

const REASON_ICONS = ['🎯', '⚡', '🏃', '💪', '✨']

export default function Results({ result, onRestart }: ResultsProps) {
  const { best, alternative } = result

  return (
    <div className="min-h-screen w-full bg-noise px-6 py-14 sm:px-12 md:px-20">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--nb-accent)]">
            Your Perfect Match
          </span>
          <h1 className="font-display mt-3 text-4xl text-[var(--nb-text)] sm:text-5xl">
            New Balance {best.shoe.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          <ShoeCard shoe={best.shoe} matchPercent={best.matchPercent} size="large" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-3xl border border-[var(--nb-line)] bg-[var(--nb-surface)] p-6 sm:p-8"
        >
          <h2 className="font-display text-xl text-[var(--nb-text)] sm:text-2xl">
            Why this shoe is a great match
          </h2>
          <p className="mt-2 text-[var(--nb-text-dim)]">
            Based on your answers, here&apos;s what makes the {best.shoe.name} right for you.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {best.reasons.map((reason, i) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl bg-[var(--nb-bg-soft)] p-4"
              >
                <span className="text-2xl">{REASON_ICONS[i % REASON_ICONS.length]}</span>
                <p className="text-sm text-[var(--nb-text)] sm:text-base">{reason}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 border-t border-[var(--nb-line)] pt-6">
            <p className="text-[var(--nb-text)]">{best.shoe.description}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {best.shoe.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-[var(--nb-line)] bg-[var(--nb-bg-soft)] px-4 py-2 text-sm text-[var(--nb-text-dim)]"
              >
                {h}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href={best.shoe.productUrl}
            target="_blank"
            rel="noreferrer"
            className="tap-target flex-1 rounded-full bg-[var(--nb-accent)] px-8 py-5 text-center text-lg font-bold uppercase tracking-[0.1em] text-[#0b0d10] active:scale-95"
          >
            View Shoe
          </a>
          <button
            onClick={onRestart}
            className="tap-target flex-1 rounded-full border border-[var(--nb-line)] bg-[var(--nb-surface)] px-8 py-5 text-center text-lg font-bold uppercase tracking-[0.1em] text-[var(--nb-text)] active:scale-95"
          >
            Start Again
          </button>
        </motion.div>

        {alternative && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--nb-line)]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--nb-text-dim)]">
                Alternative Match
              </span>
              <div className="h-px flex-1 bg-[var(--nb-line)]" />
            </div>
            <ShoeCard shoe={alternative.shoe} matchPercent={alternative.matchPercent} size="compact" />
          </motion.div>
        )}
      </div>
    </div>
  )
}
