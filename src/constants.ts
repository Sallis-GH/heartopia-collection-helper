import type { Weather, Category } from './types'

export const TIME_RANGES: Record<string, string> = {
  'Night': '12:00 AM - 5:59 AM',
  'Dawn': '6:00 AM - 11:59 AM',
  'Morning': '6:00 AM - 11:59 AM',
  'Day': '12:00 PM - 5:59 PM',
  'Afternoon': '12:00 PM - 5:59 PM',
  'Evening': '6:00 PM - 11:59 PM',
  'Dusk': '6:00 PM - 11:59 PM',
  'All Day': '12:00 AM - 11:59 PM',
}

export const TIME_COLORS: Record<string, string> = {
  'Night': 'badge-night',
  'Dawn': 'badge-dawn',
  'Morning': 'badge-morning',
  'Day': 'badge-day',
  'Afternoon': 'badge-afternoon',
  'Evening': 'badge-evening',
  'Dusk': 'badge-evening',
  'All Day': 'badge-allday',
}

export const WEATHER_COLORS: Record<Weather, string> = {
  'Sunny': 'badge-sunny',
  'Rainy': 'badge-rainy',
  'Rainbow': 'badge-rainbow',
}

export const WEATHER_ICONS: Record<Weather, string> = {
  'Sunny': '\u2600\uFE0F',
  'Rainy': '\uD83C\uDF27\uFE0F',
  'Rainbow': '\uD83C\uDF08',
}

export const CATEGORY_LABELS: Record<Category, string> = {
  fishing: 'Fishing',
  gardening: 'Gardening',
  cooking: 'Cooking',
  birdwatching: 'Birdwatching',
  insects: 'Insects',
}

export const CATEGORY_ICONS: Record<Category, string> = {
  fishing: '\uD83C\uDFA3',
  gardening: '\uD83C\uDF31',
  cooking: '\uD83C\uDF73',
  birdwatching: '\uD83D\uDC26',
  insects: '\uD83E\uDD8B',
}

export const MAX_STARS: Record<Category, number> = {
  fishing: 5,
  gardening: 5,
  cooking: 5,
  birdwatching: 5,
  insects: 5,
}

export const CATEGORY_ACCENTS: Record<Category, string> = {
  fishing: 'var(--color-accent-lavender)',
  gardening: 'var(--color-accent-sage)',
  cooking: 'var(--color-accent-coral)',
  birdwatching: 'var(--color-accent-gold)',
  insects: 'var(--color-accent-pink)',
}

export const SUBCAT_COLORS: Record<string, string> = {
  Vegetable: 'badge-vegetable',
  Fruit: 'badge-fruit',
  Grain: 'badge-grain',
  Flower: 'badge-flower',
  Special: 'badge-special',
}
