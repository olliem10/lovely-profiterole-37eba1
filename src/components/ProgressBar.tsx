interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nb-text-dim)]">
          Question {current} of {total}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nb-accent)]">
          {percent}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--nb-surface-hi)]">
        <div
          className="h-full rounded-full bg-[var(--nb-accent)] transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
