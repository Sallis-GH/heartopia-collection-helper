import type { SortConfig } from '../types'
import { ChevronUpIcon, ChevronDownIcon } from './Icons'

interface SortableHeaderProps {
  label: string
  sortKey: string
  sort: SortConfig
  onSort: (key: string) => void
  className?: string
}

export function SortableHeader({ label, sortKey, sort, onSort, className = '' }: SortableHeaderProps) {
  const isActive = sort.key === sortKey

  return (
    <th
      className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer select-none whitespace-nowrap ${className}`}
      style={{
        color: isActive ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
        borderBottom: '2px solid var(--color-border-secondary)',
        transition: 'background-color 0.2s, color 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)' }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '' }}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive && sort.direction === 'asc' && <ChevronUpIcon />}
        {isActive && sort.direction === 'desc' && <ChevronDownIcon />}
      </span>
    </th>
  )
}
