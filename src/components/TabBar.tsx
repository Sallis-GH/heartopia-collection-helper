import type { Category } from '../types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../constants'
import { ProgressBar } from './ProgressBar'

interface TabBarProps {
  activeTab: Category
  onTabChange: (tab: Category) => void
  getProgress: (category: Category) => { caught: number; total: number }
}

const tabs: Category[] = ['fishing', 'gardening', 'cooking', 'birdwatching', 'insects']

export function TabBar({ activeTab, onTabChange, getProgress }: TabBarProps) {
  return (
    <div
      className="storybook-card overflow-x-auto"
      style={{ padding: '6px' }}
    >
      <div className="flex gap-1">
        {tabs.map(tab => {
          const isActive = tab === activeTab
          const progress = getProgress(tab)
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`tab-bookmark flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer ${isActive ? 'active' : ''}`}
              style={{
                backgroundColor: isActive ? 'var(--color-tab-active-bg)' : 'transparent',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                boxShadow: isActive ? 'var(--color-tab-active-shadow)' : 'none',
                border: 'none',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseDown={(e) => {
                const target = e.currentTarget
                target.style.transform = 'scale(0.97)'
                const up = () => { target.style.transform = ''; document.removeEventListener('mouseup', up) }
                document.addEventListener('mouseup', up)
              }}
            >
              <span className="flex items-center gap-1.5 text-base">
                <span className="text-lg" style={{ filter: isActive ? 'none' : 'grayscale(0.5)' }}>{CATEGORY_ICONS[tab]}</span>
                <span style={{ fontFamily: isActive ? "'Fraunces', Georgia, serif" : "'Nunito', sans-serif", fontWeight: isActive ? 700 : 600 }}>
                  {CATEGORY_LABELS[tab]}
                </span>
              </span>
              <ProgressBar caught={progress.caught} total={progress.total} compact />
            </button>
          )
        })}
      </div>
    </div>
  )
}
