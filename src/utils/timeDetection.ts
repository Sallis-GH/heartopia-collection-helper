import type { TimeOfDay } from '../types'

export function detectCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 6) return 'Night'
  if (hour >= 6 && hour < 9) return 'Dawn'
  if (hour >= 9 && hour < 12) return 'Morning'
  if (hour >= 12 && hour < 18) return 'Afternoon'
  if (hour >= 18 && hour < 21) return 'Evening'
  return 'Night'
}

export const SELECTABLE_TIMES: TimeOfDay[] = ['Dawn', 'Morning', 'Afternoon', 'Evening', 'Night']

export const TIME_ICONS: Record<string, string> = {
  Dawn: '\u{1F305}',
  Morning: '\u{2600}\u{FE0F}',
  Afternoon: '\u{1F31E}',
  Evening: '\u{1F307}',
  Night: '\u{1F319}',
}
