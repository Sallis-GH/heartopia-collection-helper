import { useState, useMemo } from 'react'
import type { FilterState, CaughtState, BirdItem } from '../types'
import { birdData } from '../data/birdwatching'
import { SearchAndFilters } from './SearchAndFilters'
import { CollectionTable } from './CollectionTable'
import { StarRating } from './StarRating'
import { WeatherBadge } from './WeatherBadge'
import { TimeOfDayBadge } from './TimeOfDayBadge'
import { ProgressBar } from './ProgressBar'
import { getUniqueValues, emptyFilters } from '../utils/filters'
import { StarPriceDisplay } from './StarPriceDisplay'

interface BirdwatchingTabProps {
  caughtState: CaughtState
  onToggleStar: (itemId: string, star: number) => void
  progress: { caught: number; total: number }
}

export function BirdwatchingTab({ caughtState, onToggleStar, progress }: BirdwatchingTabProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)

  const locations = useMemo(() => getUniqueValues(birdData, 'location'), [])
  const levels = useMemo(() => [...new Set(birdData.map(b => b.level))].sort((a, b) => a - b), [])

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      width: '200px',
      mobileRole: 'title' as const,
      render: (item: BirdItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      width: '200px',
      mobileRole: 'field' as const,
      render: (item: BirdItem) => (
        <span style={{ color: 'var(--color-text-secondary)' }}>{item.location}</span>
      ),
    },
    {
      key: 'weather',
      label: 'Weather',
      sortable: false,
      width: '200px',
      mobileRole: 'field' as const,
      render: (item: BirdItem) => <WeatherBadge weather={item.weather} />,
    },
    {
      key: 'time',
      label: 'Time',
      sortable: false,
      width: '160px',
      mobileRole: 'field' as const,
      render: (item: BirdItem) => <TimeOfDayBadge times={item.time} />,
    },
    {
      key: 'level',
      label: 'Level',
      width: '70px',
      mobileRole: 'badge' as const,
      render: (item: BirdItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Lv.{item.level}</span>
      ),
    },
    {
      key: 'starPrices',
      label: 'Star Prices',
      sortable: false,
      width: '180px',
      mobileHidden: true,
      render: (item: BirdItem) => <StarPriceDisplay prices={item.starPrices} />,
    },
    {
      key: 'caught',
      label: 'Spotted',
      width: '130px',
      mobileRole: 'action' as const,
      render: (_item: BirdItem, caught: boolean[], onToggle: (star: number) => void) => (
        <StarRating stars={caught} onToggle={onToggle} />
      ),
    },
  ], [])

  return (
    <div className="space-y-5">
      <ProgressBar caught={progress.caught} total={progress.total} label="Birdwatching Progress" category="birdwatching" />
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
        items={birdData}
        columns={columns}
        filters={filters}
        caughtState={caughtState}
        onToggleStar={onToggleStar}
        categoryEmoji={'\uD83D\uDC26'}
      />
    </div>
  )
}
