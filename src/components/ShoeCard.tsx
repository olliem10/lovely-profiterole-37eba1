import type { Shoe } from '../data/shoes'

interface ShoeCardProps {
  shoe: Shoe
  matchPercent: number
  size?: 'large' | 'compact'
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[var(--nb-text-dim)]">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= value ? 'bg-[var(--nb-accent)]' : 'bg-[var(--nb-surface-hi)]'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ShoeCard({ shoe, matchPercent, size = 'large' }: ShoeCardProps) {
  const isLarge = size === 'large'

  return (
    <div
      className={`rounded-3xl border border-[var(--nb-line)] bg-[var(--nb-surface)] ${
        isLarge ? 'p-6 sm:p-8' : 'p-5'
      }`}
    >
      <div className={`flex ${isLarge ? 'flex-col items-center text-center' : 'flex-row items-center gap-4 text-left'}`}>
        <div
          className={`overflow-hidden rounded-2xl bg-[var(--nb-bg-soft)] ${
            isLarge ? 'mb-6 h-56 w-56 sm:h-64 sm:w-64' : 'h-20 w-20 flex-none'
          }`}
        >
          <img src={shoe.imageUrl} alt={shoe.name} className="h-full w-full object-cover" />
        </div>

        <div className={isLarge ? 'w-full' : 'flex-1'}>
          <div className="flex items-center justify-between gap-2">
            <p className={`uppercase tracking-[0.15em] text-[var(--nb-text-dim)] ${isLarge ? 'text-xs' : 'text-[10px]'}`}>
              {shoe.category}
            </p>
            <span
              className={`flex-none rounded-full bg-[var(--nb-accent)] font-bold text-[#0b0d10] ${
                isLarge ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'
              }`}
            >
              {matchPercent}%
            </span>
          </div>
          <h3 className={`font-display mt-1 text-[var(--nb-text)] ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
            New Balance {shoe.name}
          </h3>
          {isLarge && <p className="mt-2 text-[var(--nb-text-dim)]">{shoe.tagline}</p>}
        </div>
      </div>

      {isLarge && (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <StatBar label="Cushion" value={shoe.cushioning} />
          <StatBar label="Stability" value={shoe.stability} />
          <StatBar label="Weight" value={shoe.weightClass} />
          <StatBar label="Response" value={shoe.responsiveness} />
        </div>
      )}
    </div>
  )
}
