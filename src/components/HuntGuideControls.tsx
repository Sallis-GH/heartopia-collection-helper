import type { TimeOfDay, Weather, HuntableCategory } from '../types'
import { TIME_COLORS, WEATHER_COLORS, WEATHER_ICONS, CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_ACCENTS } from '../constants'
import { SELECTABLE_TIMES, TIME_ICONS } from '../utils/timeDetection'
import type { HuntCaughtFilter } from '../utils/huntGuideFilter'

interface HuntGuideControlsProps {
  activeCategory: HuntableCategory
  onCategoryChange: (cat: HuntableCategory) => void
  categoryCounts: Record<HuntableCategory, number>
  selectedTime: TimeOfDay
  autoTime: TimeOfDay
  onTimeChange: (time: TimeOfDay) => void
  onResetTime: () => void
  selectedWeather: Weather
  onWeatherChange: (weather: Weather) => void
  caughtFilter: HuntCaughtFilter
  onCaughtFilterChange: (filter: HuntCaughtFilter) => void
  hobbyLevel: number | null
  onHobbyLevelChange: (level: number | null) => void
}

const huntCategories: HuntableCategory[] = ['fishing', 'birdwatching', 'insects']
const weathers: Weather[] = ['Sunny', 'Rainy', 'Rainbow']

const caughtFilterOptions: { key: HuntCaughtFilter; label: string }[] = [
  { key: 'all', label: 'Show all' },
  { key: 'hide-caught', label: 'Hide caught' },
  { key: 'hide-fully-caught', label: 'Hide fully caught' },
]

export function HuntGuideControls({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  selectedTime,
  autoTime,
  onTimeChange,
  onResetTime,
  selectedWeather,
  onWeatherChange,
  caughtFilter,
  onCaughtFilterChange,
  hobbyLevel,
  onHobbyLevelChange,
}: HuntGuideControlsProps) {
  const isAutoTime = selectedTime === autoTime

  return (
    <div className="storybook-card p-5">
      <div className="flex flex-col gap-4">
        {/* Category medallions */}
        <div className="flex justify-center gap-4">
          {huntCategories.map(cat => {
            const isActive = cat === activeCategory
            const accent = CATEGORY_ACCENTS[cat]
            const count = categoryCounts[cat]

            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl cursor-pointer"
                style={{
                  backgroundColor: isActive ? 'var(--color-bg-card)' : 'var(--color-bg-secondary)',
                  border: isActive
                    ? `2px solid ${accent}`
                    : '1px solid var(--color-border-secondary)',
                  boxShadow: isActive ? `0 2px 10px color-mix(in srgb, ${accent} 20%, transparent)` : 'none',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  outline: 'none',
                  minWidth: 80,
                }}
              >
                <div className="category-medallion" style={{
                  borderColor: isActive ? accent : 'var(--color-border-decorative)',
                  boxShadow: isActive ? `0 0 12px color-mix(in srgb, ${accent} 30%, transparent)` : undefined,
                }}>
                  <span style={{ filter: !isActive ? 'grayscale(0.4)' : 'none' }}>
                    {CATEGORY_ICONS[cat]}
                  </span>
                </div>
                <span className="text-xs font-bold" style={{
                  color: isActive ? accent : 'var(--color-text-secondary)',
                  fontFamily: isActive ? "'Fraunces', Georgia, serif" : "'Nunito', sans-serif",
                }}>
                  {CATEGORY_LABELS[cat]}
                </span>
                <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                  {count} available
                </span>
              </button>
            )
          })}
        </div>

        {/* Decorative divider */}
        <div className="journal-divider">
          <span className="journal-divider-dot" />
        </div>

        {/* Time selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Time of Day
            </span>
            {!isAutoTime && (
              <button
                onClick={onResetTime}
                className="text-xs cursor-pointer"
                style={{
                  color: 'var(--color-accent-sage)',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Reset to auto
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {SELECTABLE_TIMES.map(time => {
              const isActive = selectedTime === time
              const isNow = autoTime === time
              return (
                <button
                  key={time}
                  onClick={() => onTimeChange(time)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${TIME_COLORS[time]}`}
                  style={{
                    opacity: isActive ? 1 : 0.5,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  {TIME_ICONS[time]} {time}{isNow ? ' (now)' : ''}
                </button>
              )
            })}
          </div>
        </div>

        {/* Weather selector */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            Weather
          </span>
          <div className="flex flex-wrap gap-2">
            {weathers.map(weather => {
              const isActive = selectedWeather === weather
              return (
                <button
                  key={weather}
                  onClick={() => onWeatherChange(weather)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${WEATHER_COLORS[weather]}`}
                  style={{
                    opacity: isActive ? 1 : 0.5,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  {WEATHER_ICONS[weather]} {weather}
                </button>
              )
            })}
          </div>
        </div>

        {/* Hobby level + caught filter row */}
        <div className="flex flex-wrap items-end gap-6">
          {/* Hobby level */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              {CATEGORY_LABELS[activeCategory]} Level
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                value={hobbyLevel ?? ''}
                placeholder="All"
                onChange={e => {
                  const val = e.target.value
                  if (val === '') {
                    onHobbyLevelChange(null)
                  } else {
                    const num = parseInt(val, 10)
                    if (num >= 1 && num <= 10) onHobbyLevelChange(num)
                  }
                }}
                className="w-16 px-2 py-1.5 rounded-lg text-xs font-semibold text-center"
                style={{
                  backgroundColor: 'var(--color-bg-input)',
                  border: '1px solid var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                  outline: 'none',
                }}
              />
              {hobbyLevel !== null && (
                <button
                  onClick={() => onHobbyLevelChange(null)}
                  className="text-xs cursor-pointer"
                  style={{
                    color: 'var(--color-accent-sage)',
                    background: 'none',
                    border: 'none',
                    textDecoration: 'underline',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Caught filter */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Filter
            </span>
            <div className="flex flex-wrap gap-2">
              {caughtFilterOptions.map(({ key, label }) => {
                const isActive = caughtFilter === key
                return (
                  <button
                    key={key}
                    onClick={() => onCaughtFilterChange(key)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
                    style={{
                      backgroundColor: isActive ? 'var(--color-bg-card)' : 'var(--color-bg-secondary)',
                      color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                      border: isActive ? '1px solid var(--color-border-primary)' : '1px solid var(--color-border-secondary)',
                      boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
