import type { TimeOfDay } from '../types'
import { TIME_RANGES, TIME_COLORS } from '../constants'

interface TimeOfDayBadgeProps {
  times: TimeOfDay[]
}

export function TimeOfDayBadge({ times }: TimeOfDayBadgeProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {times.map(time => (
        <span
          key={time}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${TIME_COLORS[time] || 'badge-allday'}`}
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
          title={TIME_RANGES[time] || time}
        >
          {time}
        </span>
      ))}
    </div>
  )
}
