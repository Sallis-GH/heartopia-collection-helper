import { useState, useCallback } from 'react'
import { RatingStarIcon } from './Icons'
import { useIsMobile } from '../hooks/useMediaQuery'

interface StarRatingProps {
  stars: boolean[]
  onToggle: (index: number) => void
  maxStars?: number
}

export function StarRating({ stars, onToggle, maxStars = 5 }: StarRatingProps) {
  const [justClicked, setJustClicked] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const isMobile = useIsMobile()

  const handleClick = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    onToggle(index)
    setJustClicked(index)
    setTimeout(() => setJustClicked(null), 400)
  }, [onToggle])

  return (
    <div
      className="flex gap-0.5"
      onMouseLeave={isMobile ? undefined : () => setHoverIndex(null)}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const showFilled = hoverIndex !== null ? i <= hoverIndex : stars[i]
        return (
          <button
            key={i}
            onClick={(e) => handleClick(e, i)}
            onMouseEnter={isMobile ? undefined : () => setHoverIndex(i)}
            className={`leading-none cursor-pointer ${justClicked === i ? 'animate-star-pop' : ''}`}
            style={{
              transition: 'transform 0.15s ease',
              transform: 'scale(1)',
              background: 'none',
              border: 'none',
              padding: isMobile ? '8px' : '2px',
            }}
            onMouseOver={isMobile ? undefined : (e) => { e.currentTarget.style.transform = 'scale(1.15)' }}
            onMouseOut={isMobile ? undefined : (e) => { e.currentTarget.style.transform = 'scale(1)' }}
            title={`Star ${i + 1}`}
          >
            <RatingStarIcon filled={showFilled} />
          </button>
        )
      })}
    </div>
  )
}
