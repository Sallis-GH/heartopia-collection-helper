import { useEffect, useState } from 'react'

interface CelebrationEffectProps {
  onComplete?: () => void
}

const PARTICLE_COUNT = 24
const COLORS = [
  'var(--color-accent-pink)',
  'var(--color-accent-lavender)',
  'var(--color-accent-sage)',
  'var(--color-accent-gold)',
  'var(--color-accent-coral)',
]

export function CelebrationEffect({ onComplete }: CelebrationEffectProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="celebration-container" aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (360 / PARTICLE_COUNT) * i + (Math.random() * 30 - 15)
        const distance = 40 + Math.random() * 60
        const size = 4 + Math.random() * 6
        const color = COLORS[i % COLORS.length]
        const delay = Math.random() * 0.2

        return (
          <span
            key={i}
            className="celebration-particle"
            style={{
              '--angle': `${angle}deg`,
              '--distance': `${distance}px`,
              '--size': `${size}px`,
              backgroundColor: color,
              animationDelay: `${delay}s`,
            } as React.CSSProperties}
          />
        )
      })}
    </div>
  )
}
