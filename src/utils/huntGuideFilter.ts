import type { TimeOfDay, Weather, CaughtState, FishItem, BirdItem, InsectItem, HuntableCategory } from '../types'

export type HuntableItem = FishItem | BirdItem | InsectItem

export interface TaggedItem {
  item: HuntableItem
  category: HuntableCategory
}

export type HuntCaughtFilter = 'all' | 'hide-caught' | 'hide-fully-caught'

interface FilterOptions {
  time: TimeOfDay
  weather: Weather | null
  caughtFilter: HuntCaughtFilter
  caughtState: CaughtState
  maxLevel: number | null
}

function matchesTime(itemTimes: TimeOfDay[], selectedTime: TimeOfDay): boolean {
  return itemTimes.includes('All Day') || itemTimes.includes(selectedTime)
}

function matchesWeather(itemWeathers: Weather[], selectedWeather: Weather): boolean {
  return itemWeathers.includes(selectedWeather)
}

function isCaught(itemId: string, caughtState: CaughtState): boolean {
  const stars = caughtState[itemId]
  return !!stars && stars.some(Boolean)
}

function isFullyCaught(itemId: string, caughtState: CaughtState): boolean {
  const stars = caughtState[itemId]
  return !!stars && stars.every(Boolean)
}

export function filterHuntableItems(
  items: HuntableItem[],
  category: HuntableCategory,
  options: FilterOptions
): TaggedItem[] {
  const { time, weather, caughtFilter, caughtState, maxLevel } = options

  return items
    .filter(item => {
      if (maxLevel !== null && item.level > maxLevel) return false
      if (!matchesTime(item.time, time)) return false
      if (weather && !matchesWeather(item.weather, weather)) return false
      if (caughtFilter === 'hide-caught' && isCaught(item.id, caughtState)) return false
      if (caughtFilter === 'hide-fully-caught' && isFullyCaught(item.id, caughtState)) return false
      return true
    })
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
    .map(item => ({ item, category }))
}
