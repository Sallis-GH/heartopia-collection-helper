import { useState, useMemo } from 'react'
import type { FilterState, CaughtState, CookingItem } from '../types'
import { cookingData } from '../data/cooking'
import { SearchAndFilters } from './SearchAndFilters'
import { CollectionTable } from './CollectionTable'
import { StarRating } from './StarRating'
import { ProgressBar } from './ProgressBar'
import { getUniqueValues, emptyFilters } from '../utils/filters'
import { StarPriceDisplay } from './StarPriceDisplay'

interface CookingTabProps {
  caughtState: CaughtState
  onToggleStar: (itemId: string, star: number) => void
  progress: { caught: number; total: number }
}

export function CookingTab({ caughtState, onToggleStar, progress }: CookingTabProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)

  const categories = useMemo(() => getUniqueValues(cookingData, 'category'), [])
  const levels = useMemo(() => [...new Set(cookingData.map(c => c.level))].sort((a, b) => a - b), [])

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      width: '200px',
      render: (item: CookingItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      width: '100px',
      render: (item: CookingItem) => (
        <span className="badge-cooking px-2 py-0.5 rounded-full text-xs font-semibold">
          {item.category}
        </span>
      ),
    },
    {
      key: 'level',
      label: 'Level',
      width: '70px',
      render: (item: CookingItem) => (
        <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Lv.{item.level}</span>
      ),
    },
    {
      key: 'recipePrice',
      label: 'Recipe',
      width: '90px',
      render: (item: CookingItem) => (
        <span style={{ color: 'var(--color-text-secondary)' }}>
          {item.recipePrice ? `${item.recipePrice}G` : 'Free'}
        </span>
      ),
    },
    {
      key: 'starPrices',
      label: 'Sell Prices',
      sortable: false,
      width: '200px',
      render: (item: CookingItem) => <StarPriceDisplay prices={item.starPrices} suffix="G" />,
    },
    {
      key: 'energy',
      label: 'Energy',
      sortable: false,
      width: '150px',
      render: (item: CookingItem) => <StarPriceDisplay prices={item.energy} prefix="+" />,
    },
    {
      key: 'caught',
      label: 'Cooked',
      width: '130px',
      render: (_item: CookingItem, caught: boolean[], onToggle: (star: number) => void) => (
        <StarRating stars={caught} onToggle={onToggle} />
      ),
    },
  ], [])

  const renderExpanded = (item: CookingItem) => (
    <div className="space-y-2">
      <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>Ingredients:</h4>
      <div className="flex flex-wrap gap-2">
        {item.ingredients.map((ing, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-primary)',
            }}
          >
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{ing.name}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>x{ing.quantity}</span>
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-5">
      <ProgressBar caught={progress.caught} total={progress.total} label="Cooking Progress" category="cooking" />
      <SearchAndFilters
        filters={filters}
        onFiltersChange={setFilters}
        subcategories={categories}
        levels={levels}
        showSubcategory
      />
      <CollectionTable
        items={cookingData}
        columns={columns}
        filters={filters}
        caughtState={caughtState}
        onToggleStar={onToggleStar}
        expandable
        renderExpanded={renderExpanded}
        categoryEmoji={'\uD83C\uDF73'}
      />
    </div>
  )
}
