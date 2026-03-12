import { useState, useMemo } from 'react'
import type { FilterState, CaughtState, GardenItem } from '../types'
import { gardenData } from '../data/gardening'
import { SearchAndFilters } from './SearchAndFilters'
import { CollectionTable } from './CollectionTable'
import { StarRating } from './StarRating'
import { ProgressBar } from './ProgressBar'
import { getUniqueValues, emptyFilters } from '../utils/filters'
import { SUBCAT_COLORS } from '../constants'
import { StarPriceDisplay } from './StarPriceDisplay'

interface GardeningTabProps {
  caughtState: CaughtState
  onToggleStar: (itemId: string, star: number) => void
  progress: { caught: number; total: number }
}

export function GardeningTab({ caughtState, onToggleStar, progress }: GardeningTabProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)

  const subcategories = useMemo(() => getUniqueValues(gardenData, 'subcategory'), [])
  const levels = useMemo(() => [...new Set(gardenData.map(g => g.level))].sort((a, b) => a - b), [])

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      width: '160px',
      render: (item: GardenItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
      ),
    },
    {
      key: 'subcategory',
      label: 'Type',
      width: '110px',
      render: (item: GardenItem) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${SUBCAT_COLORS[item.subcategory] || ''}`}>
          {item.subcategory}
        </span>
      ),
    },
    {
      key: 'level',
      label: 'Level',
      width: '70px',
      render: (item: GardenItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Lv.{item.level}</span>
      ),
    },
    {
      key: 'growthTime',
      label: 'Growth Time',
      width: '120px',
      render: (item: GardenItem) => (
        <span style={{ color: 'var(--color-text-secondary)' }}>{item.growthTime}</span>
      ),
    },
    {
      key: 'seedPrice',
      label: 'Seed Price',
      width: '100px',
      render: (item: GardenItem) => (
        <span style={{ color: 'var(--color-text-secondary)' }}>{item.seedPrice}G</span>
      ),
    },
    {
      key: 'starPrices',
      label: 'Star Prices',
      sortable: false,
      width: '220px',
      render: (item: GardenItem) => <StarPriceDisplay prices={item.starPrices} suffix="G" />,
    },
    {
      key: 'caught',
      label: 'Collected',
      width: '130px',
      render: (_item: GardenItem, caught: boolean[], onToggle: (star: number) => void) => (
        <StarRating stars={caught} onToggle={onToggle} />
      ),
    },
  ], [])

  return (
    <div className="space-y-5">
      <ProgressBar caught={progress.caught} total={progress.total} label="Gardening Progress" />
      <SearchAndFilters
        filters={filters}
        onFiltersChange={setFilters}
        subcategories={subcategories}
        levels={levels}
        showSubcategory
      />
      <CollectionTable
        items={gardenData}
        columns={columns}
        filters={filters}
        caughtState={caughtState}
        onToggleStar={onToggleStar}
        categoryEmoji={'\uD83C\uDF31'}
      />
    </div>
  )
}
