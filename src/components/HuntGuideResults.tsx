import type { HuntableCategory, CaughtState } from '../types'
import { CATEGORY_ACCENTS } from '../constants'
import { StarRating } from './StarRating'
import type { TaggedItem } from '../utils/huntGuideFilter'
import type { HuntCaughtFilter } from '../utils/huntGuideFilter'

interface HuntGuideResultsProps {
  activeCategory: HuntableCategory
  items: TaggedItem[]
  caughtState: CaughtState
  onToggleStar: (category: HuntableCategory, itemId: string, star: number) => void
  caughtFilter: HuntCaughtFilter
  viewMode: 'list' | 'cards'
  onViewModeChange: (mode: 'list' | 'cards') => void
}

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="1" y1="3" x2="13" y2="3" />
      <line x1="1" y1="7" x2="13" y2="7" />
      <line x1="1" y1="11" x2="13" y2="11" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="5" height="5" rx="1" />
      <rect x="8" y="1" width="5" height="5" rx="1" />
      <rect x="1" y="8" width="5" height="5" rx="1" />
      <rect x="8" y="8" width="5" height="5" rx="1" />
    </svg>
  )
}

export function HuntGuideResults({
  activeCategory,
  items,
  caughtState,
  onToggleStar,
  caughtFilter,
  viewMode,
  onViewModeChange,
}: HuntGuideResultsProps) {
  const accent = CATEGORY_ACCENTS[activeCategory]

  // No matches
  if (items.length === 0) {
    const isFiltering = caughtFilter !== 'all'
    return (
      <div className="storybook-card p-8 text-center">
        <div className="text-3xl mb-3">{isFiltering ? '\u{1F389}' : '\u{1F343}'}</div>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          {isFiltering
            ? "You've caught everything available right now!"
            : 'Nothing available with these conditions'}
        </p>
        {isFiltering && (
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Try switching the filter to "Show all" to review your collection
          </p>
        )}
      </div>
    )
  }

  const viewToggle = (
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
        {items.length} item{items.length !== 1 ? 's' : ''}
      </span>
      <div
        className="flex rounded-lg overflow-hidden"
        style={{
          border: '1px solid var(--color-border-secondary)',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        {([['list', ListIcon], ['cards', GridIcon]] as const).map(([mode, Icon]) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className="p-1.5 cursor-pointer flex items-center justify-center"
            style={{
              backgroundColor: viewMode === mode ? 'var(--color-bg-card)' : 'transparent',
              color: viewMode === mode ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              border: 'none',
              transition: 'all 0.2s ease',
              width: 28,
              height: 28,
            }}
            title={mode === 'list' ? 'List view' : 'Card view'}
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  )

  if (viewMode === 'cards') {
    return (
      <div key={`${activeCategory}-cards`} className="animate-page-reveal">
        {viewToggle}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map(({ item, category }, index) => {
            const stars = caughtState[item.id] || [false, false, false, false, false]
            const hasSomeStars = stars.some(Boolean)

            return (
              <div
                key={item.id}
                className="storybook-card p-3 flex flex-col gap-2 animate-row-fade-in"
                style={{
                  '--row-index': index,
                  backgroundColor: hasSomeStars ? 'var(--color-bg-table-row-caught)' : 'var(--color-bg-card)',
                } as React.CSSProperties}
              >
                {/* Top row: level badge + name */}
                <div className="flex items-start gap-2">
                  <span
                    className="text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: `color-mix(in srgb, ${accent} 15%, var(--color-bg-secondary))`,
                      color: accent,
                      border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                    }}
                  >
                    {item.level}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {item.location}
                </div>

                {/* Stars */}
                <div className="mt-auto pt-1">
                  <StarRating
                    stars={stars}
                    onToggle={(star) => onToggleStar(category, item.id, star)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div key={`${activeCategory}-list`} className="animate-page-reveal">
      {viewToggle}
      <div className="storybook-card overflow-hidden">
        {items.map(({ item, category }, index) => {
          const stars = caughtState[item.id] || [false, false, false, false, false]
          const hasSomeStars = stars.some(Boolean)

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 px-5 py-2.5 animate-row-fade-in"
              style={{
                '--row-index': index,
                backgroundColor: hasSomeStars
                  ? 'var(--color-bg-table-row-caught)'
                  : index % 2 === 1
                    ? 'var(--color-bg-table-row-alt)'
                    : 'transparent',
                borderBottom: index < items.length - 1 ? '1px solid var(--color-border-secondary)' : 'none',
              } as React.CSSProperties}
            >
              {/* Level badge */}
              <span
                className="text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: `color-mix(in srgb, ${accent} 15%, var(--color-bg-secondary))`,
                  color: accent,
                  border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                }}
              >
                {item.level}
              </span>

              {/* Name + location */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {item.name}
                </div>
                <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                  {item.location}
                </div>
              </div>

              {/* Star rating */}
              <StarRating
                stars={stars}
                onToggle={(star) => onToggleStar(category, item.id, star)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
