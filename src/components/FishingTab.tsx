import { useState, useMemo } from 'react'
import type { FilterState, CaughtState, FishItem } from '../types'
import { fishData } from '../data/fishing'
import { SearchAndFilters } from './SearchAndFilters'
import { CollectionTable } from './CollectionTable'
import { StarRating } from './StarRating'
import { WeatherBadge } from './WeatherBadge'
import { TimeOfDayBadge } from './TimeOfDayBadge'
import { ProgressBar } from './ProgressBar'
import { getUniqueValues, emptyFilters } from '../utils/filters'
import { StarPriceDisplay } from './StarPriceDisplay'

interface FishingTabProps {
  caughtState: CaughtState
  onToggleStar: (itemId: string, star: number) => void
  progress: { caught: number; total: number }
}

export function FishingTab({ caughtState, onToggleStar, progress }: FishingTabProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)

  const locations = useMemo(() => getUniqueValues(fishData, 'location'), [])
  const levels = useMemo(() => [...new Set(fishData.map(f => f.level))].sort((a, b) => a - b), [])

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      width: '180px',
      render: (item: FishItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      width: '160px',
      render: (item: FishItem) => (
        <span style={{ color: 'var(--color-text-secondary)' }}>{item.location}</span>
      ),
    },
    {
      key: 'weather',
      label: 'Weather',
      sortable: false,
      width: '200px',
      render: (item: FishItem) => <WeatherBadge weather={item.weather} />,
    },
    {
      key: 'time',
      label: 'Time',
      sortable: false,
      width: '200px',
      render: (item: FishItem) => <TimeOfDayBadge times={item.time} />,
    },
    {
      key: 'level',
      label: 'Level',
      width: '70px',
      render: (item: FishItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Lv.{item.level}</span>
      ),
    },
    {
      key: 'starPrices',
      label: 'Star Prices',
      sortable: false,
      width: '200px',
      render: (item: FishItem) => <StarPriceDisplay prices={item.starPrices} />,
    },
    {
      key: 'caught',
      label: 'Caught',
      width: '130px',
      render: (_item: FishItem, caught: boolean[], onToggle: (star: number) => void) => (
        <StarRating stars={caught} onToggle={onToggle} />
      ),
    },
  ], [])

  return (
    <div className="space-y-5">
      <ProgressBar caught={progress.caught} total={progress.total} label="Fishing Progress" category="fishing" />
      <SearchAndFilters
        filters={filters}
        onFiltersChange={setFilters}
        locations={locations}
        weathers={['Sunny', 'Rainy', 'Rainbow']}
        times={['All Day', 'Morning', 'Afternoon', 'Evening', 'Night', 'Dawn']}
        levels={levels}
        showLocation
        showWeather
        showTime
      />
      <CollectionTable
        items={fishData}
        columns={columns}
        filters={filters}
        caughtState={caughtState}
        onToggleStar={onToggleStar}
        categoryEmoji={'\uD83C\uDFA3'}
      />
    </div>
  )
}
