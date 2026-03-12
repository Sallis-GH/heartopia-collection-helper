export type TimeOfDay = 'Dawn' | 'Morning' | 'Afternoon' | 'Evening' | 'Night' | 'All Day'
export type Weather = 'Sunny' | 'Rainy' | 'Rainbow'
export type Category = 'fishing' | 'gardening' | 'cooking' | 'birdwatching' | 'insects'

export interface FishItem {
  id: string
  name: string
  location: string
  weather: Weather[]
  time: TimeOfDay[]
  level: number
  starPrices: (number | null)[]
}

export interface GardenItem {
  id: string
  name: string
  subcategory: 'Vegetable' | 'Fruit' | 'Grain' | 'Flower' | 'Special'
  level: number
  growthTime: string
  seedPrice: number
  starPrices: (number | null)[]
}

export interface CookingItem {
  id: string
  name: string
  category: string
  level: number
  recipePrice: number | null
  ingredients: { name: string; quantity: number }[]
  energy: (number | null)[]
  starPrices: (number | null)[]
}

export interface BirdItem {
  id: string
  name: string
  location: string
  weather: Weather[]
  time: TimeOfDay[]
  level: number
  starPrices: (number | null)[]
}

export interface InsectItem {
  id: string
  name: string
  location: string
  weather: Weather[]
  time: TimeOfDay[]
  level: number
  starPrices: (number | null)[]
}

export type CollectionItem = FishItem | GardenItem | CookingItem | BirdItem | InsectItem

export type AppView = 'tracker' | 'hunt-guide'
export type HuntableCategory = 'fishing' | 'birdwatching' | 'insects'

export interface CaughtState {
  [itemId: string]: boolean[]
}

export interface TrackerData {
  fishing: CaughtState
  gardening: CaughtState
  cooking: CaughtState
  birdwatching: CaughtState
  insects: CaughtState
}

export type SortDirection = 'asc' | 'desc' | null
export type SortConfig = { key: string; direction: SortDirection }

export type CaughtFilter = 'all' | 'caught' | 'uncaught' | 'partial'

export interface FilterState {
  search: string
  locations: string[]
  weathers: Weather[]
  times: TimeOfDay[]
  levels: number[]
  caught: CaughtFilter
  subcategories: string[]
}

export interface ColumnDef<T> {
  key: string
  label: string
  sortable?: boolean
  render: (item: T, caught: boolean[], onToggle: (star: number) => void) => React.ReactNode
  getValue?: (item: T) => string | number
  width?: string
}
