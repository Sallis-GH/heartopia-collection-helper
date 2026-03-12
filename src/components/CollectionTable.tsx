import { useState, useMemo, type ReactNode, Fragment } from 'react'
import type { SortConfig, FilterState, CaughtState } from '../types'
import { SortableHeader } from './SortableHeader'
import { applyFilters, applySorting } from '../utils/filters'

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render: (item: T, caught: boolean[], onToggle: (star: number) => void) => ReactNode
  width?: string
}

interface CollectionTableProps<T extends { id: string; name: string; level: number }> {
  items: T[]
  columns: Column<T>[]
  filters: FilterState
  caughtState: CaughtState
  onToggleStar: (itemId: string, star: number) => void
  expandable?: boolean
  renderExpanded?: (item: T) => ReactNode
  categoryEmoji?: string
}

export function CollectionTable<T extends { id: string; name: string; level: number }>({
  items,
  columns,
  filters,
  caughtState,
  onToggleStar,
  expandable,
  renderExpanded,
  categoryEmoji,
}: CollectionTableProps<T>) {
  const [sort, setSort] = useState<SortConfig>({ key: 'level', direction: 'asc' })
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const handleSort = (key: string) => {
    setSort(prev => ({
      key,
      direction: prev.key === key
        ? prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc'
        : 'asc'
    }))
  }

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = useMemo(
    () => applyFilters(items as (T & { id: string; name: string; level: number })[], filters, caughtState),
    [items, filters, caughtState]
  )

  const sorted = useMemo(
    () => applySorting(filtered as unknown as Record<string, unknown>[], sort, caughtState) as unknown as T[],
    [filtered, sort, caughtState]
  )

  const totalCols = columns.length + (expandable ? 1 : 0)

  // Create a filter hash to re-trigger row animations on filter change
  const filterHash = JSON.stringify(filters)

  return (
    <div className="collection-table overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr style={{ backgroundColor: 'var(--color-bg-table-header)' }}>
            {expandable && <th className="w-8 px-2" />}
            {columns.map(col => (
              col.sortable !== false ? (
                <SortableHeader
                  key={col.key}
                  label={col.label}
                  sortKey={col.key}
                  sort={sort}
                  onSort={handleSort}
                  className={col.width ? `w-[${col.width}]` : ''}
                />
              ) : (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                  style={{
                    color: 'var(--color-text-secondary)',
                    borderBottom: '2px solid var(--color-border-secondary)',
                    width: col.width || undefined,
                  }}
                >
                  {col.label}
                </th>
              )
            ))}
          </tr>
        </thead>
        <tbody key={filterHash}>
          {sorted.map((item, index) => {
            const caught = caughtState[item.id] || [false, false, false, false, false]
            const hasCaught = caught.some(Boolean)
            const allCaught = caught.every(Boolean)
            const isExpanded = expandedIds.has(item.id)

            return (
              <Fragment key={item.id}>
                <tr
                  className="animate-row-fade-in"
                  style={{
                    '--row-index': index,
                    backgroundColor: hasCaught
                      ? 'var(--color-bg-table-row-caught)'
                      : index % 2 === 0
                        ? 'var(--color-bg-card)'
                        : 'var(--color-bg-table-row-alt)',
                    cursor: expandable ? 'pointer' : undefined,
                    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                    borderBottom: '1px solid var(--color-border-secondary)',
                    borderLeft: allCaught ? '3px solid var(--color-accent-sage)' : '3px solid transparent',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'
                    if (!allCaught) e.currentTarget.style.borderLeftColor = 'var(--color-accent-gold)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = hasCaught
                      ? 'var(--color-bg-table-row-caught)'
                      : index % 2 === 0
                        ? 'var(--color-bg-card)'
                        : 'var(--color-bg-table-row-alt)'
                    e.currentTarget.style.borderLeftColor = allCaught ? 'var(--color-accent-sage)' : 'transparent'
                  }}
                  onClick={expandable ? () => toggleExpand(item.id) : undefined}
                >
                  {expandable && (
                    <td className="w-8 px-2 py-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      <span style={{ transition: 'transform 0.2s', display: 'inline-block', transform: isExpanded ? 'rotate(90deg)' : 'none' }}>
                        {'\u25B6'}
                      </span>
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm"
                      style={{
                        color: 'var(--color-text-primary)',
                        width: col.width || undefined,
                      }}
                    >
                      {col.render(item, caught, (star) => onToggleStar(item.id, star))}
                    </td>
                  ))}
                </tr>
                {expandable && isExpanded && renderExpanded && (
                  <tr className="animate-fade-in">
                    <td
                      colSpan={totalCols}
                      className="px-4 py-3"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderBottom: '1px solid var(--color-border-secondary)',
                      }}
                    >
                      {renderExpanded(item)}
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
          {sorted.length === 0 && (
            <tr>
              <td
                colSpan={totalCols}
                className="px-4 py-16 text-center"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <div className="flex flex-col items-center gap-3">
                  {categoryEmoji && <span className="text-5xl opacity-20" style={{ filter: 'grayscale(0.5)' }}>{categoryEmoji}</span>}
                  <span className="text-base font-display">No items match your filters</span>
                  <span className="text-xs opacity-60">Try adjusting your search or filters</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        className="px-4 py-2.5 text-xs font-medium flex items-center justify-between"
        style={{
          backgroundColor: 'var(--color-bg-table-header)',
          borderTop: '2px solid var(--color-border-secondary)',
          color: 'var(--color-text-muted)',
        }}
      >
        <span>Showing {sorted.length} of {items.length} items</span>
        {sorted.length < items.length && (
          <span style={{ color: 'var(--color-accent-gold)', opacity: 0.7 }}>
            {items.length - sorted.length} filtered
          </span>
        )}
      </div>
    </div>
  )
}
