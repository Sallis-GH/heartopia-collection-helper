import type { Category } from '../types'
import { CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_ACCENTS } from '../constants'
import { ProgressBar } from './ProgressBar'

interface OverallProgressProps {
  progress: { caught: number; total: number }
  categoryProgress: Record<Category, { caught: number; total: number }>
  activeTab: Category
  onTabChange: (tab: Category) => void
}

const categories: Category[] = ['fishing', 'gardening', 'cooking', 'birdwatching', 'insects']

const categoryAccents = CATEGORY_ACCENTS

export function OverallProgress({ progress, categoryProgress, activeTab, onTabChange }: OverallProgressProps) {
  const overallPct = progress.total > 0 ? Math.round((progress.caught / progress.total) * 100) : 0

  return (
    <div className="storybook-card p-4 sm:p-6">
      {/* Title row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-accent-pink)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Collection Progress
        </h2>
        <span className="text-2xl font-bold font-display" style={{ color: 'var(--color-accent-gold)' }}>
          {overallPct}%
        </span>
      </div>

      <ProgressBar caught={progress.caught} total={progress.total} />

      {/* Decorative divider */}
      <div className="journal-divider my-5">
        <span className="journal-divider-dot" />
      </div>

      {/* Category grid - clickable tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map(cat => {
          const p = categoryProgress[cat]
          const pct = p.total > 0 ? p.caught / p.total : 0
          const accent = categoryAccents[cat]
          const isActive = cat === activeTab

          return (
            <button
              key={cat}
              onClick={() => onTabChange(cat)}
              className="hobby-card flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer"
              style={{
                backgroundColor: isActive ? 'var(--color-bg-card)' : 'var(--color-bg-secondary)',
                border: isActive
                  ? `2px solid ${accent}`
                  : pct >= 1
                    ? `1px solid ${accent}`
                    : '1px solid var(--color-border-secondary)',
                boxShadow: isActive ? `0 2px 10px color-mix(in srgb, ${accent} 20%, transparent)` : 'none',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                outline: 'none',
                '--hobby-accent': accent,
              } as React.CSSProperties}
            >
              <div className="category-medallion" style={{
                borderColor: isActive ? accent : pct >= 1 ? accent : 'var(--color-border-decorative)',
                boxShadow: isActive || pct >= 1 ? `0 0 12px color-mix(in srgb, ${accent} 30%, transparent)` : undefined,
              }}>
                <span style={{ filter: !isActive && pct === 0 ? 'grayscale(0.6)' : 'none' }}>
                  {CATEGORY_ICONS[cat]}
                </span>
              </div>
              <span className="text-xs font-bold" style={{
                color: isActive ? accent : pct >= 1 ? accent : 'var(--color-text-secondary)',
                fontFamily: isActive ? "'Fraunces', Georgia, serif" : "'Nunito', sans-serif",
              }}>
                {CATEGORY_LABELS[cat]}
              </span>
              <span className="text-xs font-semibold tabular-nums" style={{
                color: 'var(--color-text-muted)',
              }}>
                {p.caught}/{p.total}
              </span>
              {/* Mini progress bar */}
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-progress-track)' }}>
                <div className="h-full rounded-full" style={{
                  width: `${pct * 100}%`,
                  backgroundColor: accent,
                  transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
