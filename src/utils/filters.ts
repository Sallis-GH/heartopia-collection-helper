import type { FilterState, SortConfig, CaughtState, Weather, TimeOfDay } from '../types'

interface FilterableItem {
  id: string
  name: string
  location?: string
  weather?: Weather[]
  time?: TimeOfDay[]
  level: number
  subcategory?: string
  category?: string
}

export function applyFilters<T extends FilterableItem>(
  items: T[],
  filters: FilterState,
  caughtState: CaughtState
): T[] {
  return items.filter(item => {
    // Search
    if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Location (multi)
    if (filters.locations.length > 0 && item.location && !filters.locations.includes(item.location)) {
      return false
    }

    // Weather (multi)
    if (filters.weathers.length > 0 && item.weather) {
      if (!filters.weathers.some(w => item.weather!.includes(w))) {
        return false
      }
    }

    // Time (multi)
    if (filters.times.length > 0 && item.time) {
      const filterIncludesAllDay = filters.times.includes('All Day')
      const itemIsAllDay = item.time.includes('All Day')
      if (filterIncludesAllDay) {
        // "All Day" selected — show all items
      } else if (itemIsAllDay) {
        // Item available all day — always matches
      } else if (!filters.times.some(t => item.time!.includes(t))) {
        return false
      }
    }

    // Level (multi)
    if (filters.levels.length > 0 && !filters.levels.includes(item.level)) {
      return false
    }

    // Subcategory (multi — also checks category field for cooking)
    if (filters.subcategories.length > 0) {
      const itemSubcat = item.subcategory || item.category
      if (itemSubcat && !filters.subcategories.includes(itemSubcat)) {
        return false
      }
    }

    // Caught status
    if (filters.caught !== 'all') {
      const stars = caughtState[item.id] || [false, false, false, false, false]
      const hasCaught = stars.some(s => s)
      const allCaught = stars.every(s => s)

      if (filters.caught === 'caught' && !allCaught) return false
      if (filters.caught === 'uncaught' && hasCaught) return false
      if (filters.caught === 'partial' && (!hasCaught || allCaught)) return false
    }

    return true
  })
}

export function applySorting<T extends Record<string, unknown>>(
  items: T[],
  sort: SortConfig,
  caughtState?: CaughtState
): T[] {
  if (!sort.direction) return items

  return [...items].sort((a, b) => {
    let aVal: unknown
    let bVal: unknown

    if (sort.key === 'caught') {
      const aStars = caughtState?.[(a as unknown as { id: string }).id] || []
      const bStars = caughtState?.[(b as unknown as { id: string }).id] || []
      aVal = aStars.filter(Boolean).length
      bVal = bStars.filter(Boolean).length
    } else {
      aVal = a[sort.key]
      bVal = b[sort.key]
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sort.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sort.direction === 'asc' ? aVal - bVal : bVal - aVal
    }

    return 0
  })
}

export function getUniqueValues<T>(items: T[], key: keyof T): string[] {
  const values = new Set<string>()
  for (const item of items) {
    const val = item[key]
    if (typeof val === 'string') {
      values.add(val)
    } else if (Array.isArray(val)) {
      for (const v of val) values.add(String(v))
    }
  }
  return Array.from(values).sort()
}

export const emptyFilters: FilterState = {
  search: '',
  locations: [],
  weathers: [],
  times: [],
  levels: [],
  caught: 'all',
  subcategories: [],
}
