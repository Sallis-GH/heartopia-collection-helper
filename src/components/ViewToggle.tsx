import type { AppView } from '../types'

interface ViewToggleProps {
  activeView: AppView
  onViewChange: (view: AppView) => void
}

const views: { key: AppView; label: string; icon: string }[] = [
  { key: 'tracker', label: 'Tracker', icon: '\u{1F4D6}' },
  { key: 'hunt-guide', label: 'Hunt Guide', icon: '\u{1F3AF}' },
]

export function ViewToggle({ activeView, onViewChange }: ViewToggleProps) {
  return (
    <div
      className="flex rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {views.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onViewChange(key)}
          className="px-3 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
          style={{
            backgroundColor: activeView === key ? 'rgba(255,255,255,0.15)' : 'transparent',
            color: activeView === key ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
            border: 'none',
            transition: 'all 0.2s ease',
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}
