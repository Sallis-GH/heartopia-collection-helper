import type { Weather } from '../types'
import { WEATHER_COLORS, WEATHER_ICONS } from '../constants'

interface WeatherBadgeProps {
  weather: Weather[]
}

export function WeatherBadge({ weather }: WeatherBadgeProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {weather.map(w => (
        <span
          key={w}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${WEATHER_COLORS[w]}`}
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
          title={w === 'Rainy' ? `${w} (Looks like snow during Winter)` : w}
        >
          {WEATHER_ICONS[w]} {w}
        </span>
      ))}
    </div>
  )
}
