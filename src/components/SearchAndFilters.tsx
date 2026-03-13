import { useState, useRef, useEffect, useCallback } from 'react'
import type { FilterState, Weather, TimeOfDay } from '../types'
import { SearchIcon } from './Icons'

interface SearchAndFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  locations?: string[]
  weathers?: string[]
  times?: string[]
  levels?: number[]
  subcategories?: string[]
  showWeather?: boolean
  showTime?: boolean
  showLocation?: boolean
  showSubcategory?: boolean
}

const inputStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-bg-input)',
  border: '1px solid var(--color-border-primary)',
  color: 'var(--color-text-primary)',
  borderRadius: '0.75rem',
  padding: '7px 12px',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

interface MultiSelectProps {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}

function MultiSelect({ label, options, selected, onToggle }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleClickOutside])

  const count = selected.length

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center gap-1.5 text-sm font-semibold"
        style={{
          ...inputStyle,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: count > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
          {count > 0 ? `${label} (${count})` : `All ${label}`}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{
            color: 'var(--color-text-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-20 mt-1 py-1 rounded-xl overflow-y-auto animate-fade-in"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-primary)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            minWidth: '170px',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: '240px',
          }}
        >
          {options.map(opt => {
            const active = selected.includes(opt)
            return (
              <button
                key={opt}
                onClick={() => onToggle(opt)}
                className="w-full text-left px-3 py-1.5 text-sm cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: active ? 'color-mix(in srgb, var(--color-accent-gold) 12%, transparent)' : 'transparent',
                  color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontWeight: active ? 600 : 400,
                  border: 'none',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = active ? 'color-mix(in srgb, var(--color-accent-gold) 12%, transparent)' : 'transparent' }}
              >
                <span
                  className="flex-shrink-0 rounded"
                  style={{
                    width: '16px',
                    height: '16px',
                    border: active ? '2px solid var(--color-accent-gold)' : '2px solid var(--color-border-primary)',
                    backgroundColor: active ? 'var(--color-accent-gold)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface SingleSelectProps<T extends string> {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}

function SingleSelect<T extends string>({ label, options, value, onChange }: SingleSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleClickOutside])

  const selectedOption = options.find(o => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center gap-1.5 text-sm font-semibold"
        style={{
          ...inputStyle,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: value !== options[0]?.value ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
          {selectedOption?.label ?? label}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{
            color: 'var(--color-text-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-20 mt-1 py-1 rounded-xl overflow-y-auto animate-fade-in"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-primary)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            minWidth: '140px',
            maxWidth: 'calc(100vw - 2rem)',
          }}
        >
          {options.map(opt => {
            const active = opt.value === value
            return (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className="w-full text-left px-3 py-1.5 text-sm cursor-pointer"
                style={{
                  backgroundColor: active ? 'color-mix(in srgb, var(--color-accent-gold) 12%, transparent)' : 'transparent',
                  color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontWeight: active ? 600 : 400,
                  border: 'none',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = active ? 'color-mix(in srgb, var(--color-accent-gold) 12%, transparent)' : 'transparent' }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function SearchAndFilters({
  filters,
  onFiltersChange,
  locations = [],
  weathers = [],
  times = [],
  levels = [],
  subcategories = [],
  showWeather = false,
  showTime = false,
  showLocation = false,
  showSubcategory = false,
}: SearchAndFiltersProps) {
  const update = (partial: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...partial })
  }

  const toggleInArray = <T,>(arr: T[], value: T): T[] => {
    return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--color-accent-gold)'
    e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--color-accent-gold) 15%, transparent)'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--color-border-primary)'
    e.target.style.boxShadow = 'none'
  }

  const hasFilters = filters.search || filters.locations.length > 0 || filters.weathers.length > 0 ||
    filters.times.length > 0 || filters.levels.length > 0 || filters.caught !== 'all' || filters.subcategories.length > 0

  return (
    <div className="storybook-card flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center p-4">
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.search}
          onChange={e => update({ search: e.target.value })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full sm:min-w-[180px] sm:w-auto"
          style={{
            ...inputStyle,
            paddingLeft: '2.25rem',
          }}
        />
      </div>

      {showLocation && locations.length > 0 && (
        <MultiSelect
          label="Locations"
          options={locations}
          selected={filters.locations}
          onToggle={v => update({ locations: toggleInArray(filters.locations, v) })}
        />
      )}

      {showWeather && weathers.length > 0 && (
        <MultiSelect
          label="Weather"
          options={weathers}
          selected={filters.weathers}
          onToggle={v => update({ weathers: toggleInArray(filters.weathers, v as Weather) })}
        />
      )}

      {showTime && times.length > 0 && (
        <MultiSelect
          label="Times"
          options={times}
          selected={filters.times}
          onToggle={v => update({ times: toggleInArray(filters.times, v as TimeOfDay) })}
        />
      )}

      {showSubcategory && subcategories.length > 0 && (
        <MultiSelect
          label="Types"
          options={subcategories}
          selected={filters.subcategories}
          onToggle={v => update({ subcategories: toggleInArray(filters.subcategories, v) })}
        />
      )}

      {levels.length > 0 && (
        <MultiSelect
          label="Levels"
          options={levels.map(String)}
          selected={filters.levels.map(String)}
          onToggle={v => update({ levels: toggleInArray(filters.levels, Number(v)) })}
        />
      )}

      <SingleSelect
        label="All Status"
        value={filters.caught}
        onChange={v => update({ caught: v })}
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'caught', label: 'Complete' },
          { value: 'partial', label: 'Partial' },
          { value: 'uncaught', label: 'Uncaught' },
        ]}
      />

      {hasFilters && (
        <button
          onClick={() => onFiltersChange({
            search: '',
            locations: [],
            weathers: [],
            times: [],
            levels: [],
            caught: 'all',
            subcategories: [],
          })}
          className="px-3 py-1.5 text-sm font-semibold rounded-xl cursor-pointer"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-accent-coral) 12%, transparent)',
            color: 'var(--color-accent-coral)',
            border: '1px solid color-mix(in srgb, var(--color-accent-coral) 20%, transparent)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-accent-coral) 20%, transparent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-accent-coral) 12%, transparent)'
          }}
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
