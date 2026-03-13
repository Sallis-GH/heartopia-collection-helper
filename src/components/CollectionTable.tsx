import { useState, useMemo, type ReactNode, Fragment } from 'react'
import type { SortConfig, FilterState, CaughtState } from '../types'
import { SortableHeader } from './SortableHeader'
import { applyFilters, applySorting } from '../utils/filters'
import { useIsMobile } from '../hooks/useMediaQuery'

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render: (item: T, caught: boolean[], onToggle: (star: number) => void) => ReactNode
  width?: string
  mobileRole?: 'title' | 'badge' | 'field' | 'action'
  mobileHidden?: boolean
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

function MobileSortBar({ columns, sort, onSort }: {
  columns: { key: string; label: string; sortable?: boolean }[]
  sort: SortConfig
  onSort: (key: string) => void
}) {
  const sortable = columns.filter(c => c.sortable !== false)

  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)', fontFamily: "'Nunito', sans-serif", letterSpacing: '0.06em' }}
      >
        Sort by
      </span>
      <div className="flex flex-wrap gap-1.5">
        {sortable.map(col => {
          const isActive = sort.key === col.key
          return (
            <button
              key={col.key}
              onClick={() => onSort(col.key)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer flex items-center gap-1"
              style={{
                backgroundColor: isActive ? 'var(--color-bg-card)' : 'var(--color-bg-secondary)',
                color: isActive ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
                border: isActive ? '1px solid var(--color-accent-gold)' : '1px solid var(--color-border-secondary)',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {col.label}
              {isActive && sort.direction && (
                <svg
                  width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: sort.direction === 'desc' ? 'rotate(180deg)' : 'none',
                  }}
                >
                  <path d="M12 19V5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
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
  const isMobile = useIsMobile()

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

  const footer = (
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
  )

  const emptyState = (
    <div className="px-4 py-16 text-center" style={{ color: 'var(--color-text-muted)' }}>
      <div className="flex flex-col items-center gap-3">
        {categoryEmoji && <span className="text-5xl opacity-20" style={{ filter: 'grayscale(0.5)' }}>{categoryEmoji}</span>}
        <span className="text-base font-display">No items match your filters</span>
        <span className="text-xs opacity-60">Try adjusting your search or filters</span>
      </div>
    </div>
  )

  // --- Mobile card view ---
  if (isMobile) {
    const titleCols = columns.filter(c => c.mobileRole === 'title')
    const badgeCols = columns.filter(c => c.mobileRole === 'badge')
    const fieldCols = columns.filter(c => c.mobileRole === 'field')
    const actionCols = columns.filter(c => c.mobileRole === 'action')

    return (
      <div key={filterHash}>
        <div className="mb-3">
          <MobileSortBar columns={columns} sort={sort} onSort={handleSort} />
        </div>

        {sorted.length === 0 ? emptyState : (
          <div className="space-y-2">
            {sorted.map((item, index) => {
              const caught = caughtState[item.id] || [false, false, false, false, false]
              const hasCaught = caught.some(Boolean)
              const allCaught = caught.every(Boolean)
              const isExpanded = expandedIds.has(item.id)

              return (
                <div
                  key={item.id}
                  className="animate-row-fade-in overflow-hidden"
                  style={{
                    '--row-index': index,
                    backgroundColor: hasCaught ? 'var(--color-bg-table-row-caught)' : 'var(--color-bg-card)',
                    borderRadius: '0.75rem',
                    border: allCaught
                      ? '1px solid var(--color-accent-sage)'
                      : hasCaught
                        ? '1px solid color-mix(in srgb, var(--color-accent-sage) 30%, var(--color-border-secondary))'
                        : '1px solid var(--color-border-secondary)',
                    borderLeft: allCaught ? '3px solid var(--color-accent-sage)' : hasCaught ? '3px solid color-mix(in srgb, var(--color-accent-sage) 50%, transparent)' : '3px solid transparent',
                    boxShadow: '0 1px 3px rgba(44, 31, 15, 0.04)',
                  } as React.CSSProperties}
                  onClick={expandable ? () => toggleExpand(item.id) : undefined}
                >
                  <div className="p-3 space-y-2">
                    {/* Title row: badges + name */}
                    <div className="flex items-start gap-2">
                      {badgeCols.map(col => (
                        <div key={col.key} className="flex-shrink-0">
                          {col.render(item, caught, (star) => onToggleStar(item.id, star))}
                        </div>
                      ))}
                      <div className="flex-1 min-w-0">
                        {titleCols.map(col => (
                          <div key={col.key}>
                            {col.render(item, caught, (star) => onToggleStar(item.id, star))}
                          </div>
                        ))}
                      </div>
                      {expandable && (
                        <span className="text-xs flex-shrink-0 mt-1" style={{ color: 'var(--color-text-muted)', transition: 'transform 0.2s', display: 'inline-block', transform: isExpanded ? 'rotate(90deg)' : 'none' }}>
                          {'\u25B6'}
                        </span>
                      )}
                    </div>

                    {/* Field rows */}
                    {fieldCols.length > 0 && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {fieldCols.map(col => (
                          <div key={col.key} className="flex items-center gap-1.5 text-xs">
                            <span className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>{col.label}:</span>
                            <span>{col.render(item, caught, (star) => onToggleStar(item.id, star))}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expanded content (cooking ingredients) */}
                    {expandable && isExpanded && renderExpanded && (
                      <div className="animate-fade-in pt-1">
                        {renderExpanded(item)}
                      </div>
                    )}

                    {/* Action row: star rating */}
                    {actionCols.length > 0 && (
                      <div
                        className="pt-2"
                        style={{ borderTop: '1px solid var(--color-border-secondary)' }}
                        onClick={e => e.stopPropagation()}
                      >
                        {actionCols.map(col => (
                          <div key={col.key}>
                            {col.render(item, caught, (star) => onToggleStar(item.id, star))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div
          className="mt-2 px-4 py-2.5 text-xs font-medium flex items-center justify-between rounded-xl"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
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

  // --- Desktop table view ---
  return (
    <div className="collection-table overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr style={{ backgroundColor: 'var(--color-bg-table-header)' }}>
            {expandable && <th className="w-8 px-2" style={{ borderBottom: '2px solid var(--color-border-secondary)' }} />}
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
                    boxShadow: allCaught ? 'inset 3px 0 0 var(--color-accent-sage)' : 'none',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'
                    if (!allCaught) e.currentTarget.style.boxShadow = 'inset 3px 0 0 var(--color-accent-gold)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = hasCaught
                      ? 'var(--color-bg-table-row-caught)'
                      : index % 2 === 0
                        ? 'var(--color-bg-card)'
                        : 'var(--color-bg-table-row-alt)'
                    e.currentTarget.style.boxShadow = allCaught ? 'inset 3px 0 0 var(--color-accent-sage)' : 'none'
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
      {footer}
    </div>
  )
}
