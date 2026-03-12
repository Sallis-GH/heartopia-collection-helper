interface StarPriceDisplayProps {
  prices: (number | null)[]
  suffix?: string
  prefix?: string
}

function MiniStar() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="var(--color-star-filled)"
      />
    </svg>
  )
}

export function StarPriceDisplay({ prices, suffix = '', prefix = '' }: StarPriceDisplayProps) {
  const entries = prices
    .map((p, i) => (p !== null ? { stars: i + 1, price: p } : null))
    .filter((e): e is { stars: number; price: number } => e !== null)

  if (entries.length === 0) return <span style={{ color: 'var(--color-text-muted)' }}>—</span>

  return (
    <div className="star-price-list">
      {entries.map(({ stars, price }) => (
        <div key={stars} className="star-price-row">
          <span className="star-price-stars">
            {Array.from({ length: stars }, (_, i) => (
              <MiniStar key={i} />
            ))}
          </span>
          <span className="star-price-amount">{prefix}{price.toLocaleString()}{suffix}</span>
        </div>
      ))}
    </div>
  )
}
