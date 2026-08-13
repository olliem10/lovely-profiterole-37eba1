import { motion } from 'motion/react'

interface LandingProps {
  onStart: () => void
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-noise flex flex-col">
      {/* Decorative running-line graphic */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <svg className="absolute -right-24 top-0 h-full w-[70%]" viewBox="0 0 400 800" fill="none">
          <path
            d="M420 -20 C 300 120, 340 220, 220 300 C 100 380, 140 480, 40 560 C -20 610, -40 700, -60 820"
            stroke="var(--nb-accent)"
            strokeWidth="2"
            strokeOpacity="0.25"
          />
          <path
            d="M460 40 C 340 180, 380 280, 260 360 C 140 440, 180 540, 80 620 C 20 670, 0 760, -20 880"
            stroke="var(--nb-accent)"
            strokeWidth="1.5"
            strokeOpacity="0.15"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--nb-line)] bg-[var(--nb-surface)] px-5 py-2"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--nb-accent)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nb-text-dim)]">
            New Balance &middot; Shoe Finder
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display max-w-4xl text-[13vw] leading-[0.95] tracking-tight text-[var(--nb-text)] sm:text-6xl md:text-7xl"
        >
          FIND YOUR
          <br />
          <span className="text-[var(--nb-accent)]">PERFECT</span> RUN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 max-w-xl text-lg text-[var(--nb-text-dim)] sm:text-xl"
        >
          Answer a few quick questions about your running and we&apos;ll match you with the
          New Balance shoe that&apos;s right for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="tap-target mt-12 rounded-full bg-[var(--nb-accent)] px-14 py-6 text-lg font-bold uppercase tracking-[0.15em] text-[#0b0d10] shadow-[0_0_60px_rgba(215,255,63,0.25)] transition-transform active:scale-95 sm:text-xl"
        >
          Start Quiz
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-sm uppercase tracking-[0.2em] text-[var(--nb-text-dim)]"
        >
          Takes about 60 seconds
        </motion.p>
      </div>

      <div className="relative z-10 flex justify-center gap-10 pb-10 text-center text-[var(--nb-text-dim)]">
        <div>
          <div className="font-display text-2xl text-[var(--nb-text)]">8</div>
          <div className="text-xs uppercase tracking-[0.15em]">Questions</div>
        </div>
        <div className="w-px bg-[var(--nb-line)]" />
        <div>
          <div className="font-display text-2xl text-[var(--nb-text)]">1</div>
          <div className="text-xs uppercase tracking-[0.15em]">Perfect Match</div>
        </div>
        <div className="w-px bg-[var(--nb-line)]" />
        <div>
          <div className="font-display text-2xl text-[var(--nb-text)]">0</div>
          <div className="text-xs uppercase tracking-[0.15em]">Sign-ups</div>
        </div>
      </div>
    </div>
  )
}
