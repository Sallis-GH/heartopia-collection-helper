import { useState, useMemo } from 'react'
import type { FilterState, CaughtState, InsectItem } from '../types'
import { insectData } from '../data/insects'
import { SearchAndFilters } from './SearchAndFilters'
import { CollectionTable } from './CollectionTable'
import { StarRating } from './StarRating'
import { WeatherBadge } from './WeatherBadge'
import { TimeOfDayBadge } from './TimeOfDayBadge'
import { ProgressBar } from './ProgressBar'
import { getUniqueValues, emptyFilters } from '../utils/filters'
import { StarPriceDisplay } from './StarPriceDisplay'

interface InsectsTabProps {
  caughtState: CaughtState
  onToggleStar: (itemId: string, star: number) => void
  progress: { caught: number; total: number }
}

export function InsectsTab({ caughtState, onToggleStar, progress }: InsectsTabProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)

  const locations = useMemo(() => getUniqueValues(insectData, 'location'), [])
  const levels = useMemo(() => [...new Set(insectData.map(i => i.level))].sort((a, b) => a - b), [])

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      width: '200px',
      render: (item: InsectItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      width: '200px',
      render: (item: InsectItem) => (
        <span style={{ color: 'var(--color-text-secondary)' }}>{item.location}</span>
      ),
    },
    {
      key: 'weather',
      label: 'Weather',
      sortable: false,
      width: '200px',
      render: (item: InsectItem) => <WeatherBadge weather={item.weather} />,
    },
    {
      key: 'time',
      label: 'Time',
      sortable: false,
      width: '200px',
      render: (item: InsectItem) => <TimeOfDayBadge times={item.time} />,
    },
    {
      key: 'level',
      label: 'Level',
      width: '70px',
      render: (item: InsectItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Lv.{item.level}</span>
      ),
    },
    {
      key: 'starPrices',
      label: 'Star Prices',
      sortable: false,
      width: '180px',
      render: (item: InsectItem) => <StarPriceDisplay prices={item.starPrices} />,
    },
    {
      key: 'caught',
      label: 'Caught',
      width: '130px',
      render: (_item: InsectItem, caught: boolean[], onToggle: (star: number) => void) => (
        <StarRating stars={caught} onToggle={onToggle} />
      ),
    },
  ], [])

  return (
    <div className="space-y-5">
      <ProgressBar caught={progress.caught} total={progress.total} label="Insect Catching Progress" category="insects" />
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
        items={insectData}
        columns={columns}
        filters={filters}
        caughtState={caughtState}
        onToggleStar={onToggleStar}
        categoryEmoji={'\uD83E\uDD8B'}
      />
    </div>
  )
}
