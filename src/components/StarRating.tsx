import { useState, useCallback } from 'react'
import { RatingStarIcon } from './Icons'

interface StarRatingProps {
  stars: boolean[]
  onToggle: (index: number) => void
  maxStars?: number
}

export function StarRating({ stars, onToggle, maxStars = 5 }: StarRatingProps) {
  const [justClicked, setJustClicked] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const handleClick = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    onToggle(index)
    setJustClicked(index)
    setTimeout(() => setJustClicked(null), 400)
  }, [onToggle])

  return (
    <div
      className="flex gap-0.5"
      onMouseLeave={() => setHoverIndex(null)}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const showFilled = hoverIndex !== null ? i <= hoverIndex : stars[i]
        return (
          <button
            key={i}
            onClick={(e) => handleClick(e, i)}
            onMouseEnter={() => setHoverIndex(i)}
            className={`leading-none cursor-pointer ${justClicked === i ? 'animate-star-pop' : ''}`}
            style={{
              transition: 'transform 0.15s ease',
              transform: 'scale(1)',
              background: 'none',
              border: 'none',
              padding: '2px',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.15)' }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            title={`Star ${i + 1}`}
          >
            <RatingStarIcon filled={showFilled} />
          </button>
        )
      })}
    </div>
  )
}
