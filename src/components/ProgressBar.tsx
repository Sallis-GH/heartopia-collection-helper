import { useEffect, useRef, useState, useCallback } from 'react'
import type { Category } from '../types'
import { CelebrationEffect } from './CelebrationEffect'

interface ProgressBarProps {
  caught: number
  total: number
  label?: string
  compact?: boolean
  category?: Category
}

export function ProgressBar({ caught, total, label, compact, category }: ProgressBarProps) {
  const pct = total > 0 ? (caught / total) * 100 : 0
  const prevPctRef = useRef(pct)
  const [showCelebration, setShowCelebration] = useState(false)
  const [displayPct, setDisplayPct] = useState(0)
  const [mounted, setMounted] = useState(false)
  const celebratedRef = useRef(false)

  // Animated mount: start at 0, expand to target
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Smooth percentage counter
  useEffect(() => {
    if (!mounted) return
    const start = displayPct
    const end = pct
    if (start === end) return
    const duration = 600
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayPct(start + (end - start) * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [pct, mounted])

  // Celebration trigger: fires only when transitioning TO 100%
  useEffect(() => {
    if (pct >= 100 && prevPctRef.current < 100 && !celebratedRef.current) {
      celebratedRef.current = true
      setShowCelebration(true)
    }
    if (pct < 100) {
      celebratedRef.current = false
    }
    prevPctRef.current = pct
  }, [pct])

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false)
  }, [])

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="progress-bar-track w-20 h-1.5">
          <div
            className="progress-bar-fill h-full"
            data-category={category}
            style={{ width: mounted ? `${pct}%` : '0%' }}
          />
        </div>
        <span className="text-xs whitespace-nowrap tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
          {caught}/{total}
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-2 relative">
      {label && (
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-bold font-display" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
          <span className="text-sm tabular-nums" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="font-bold" style={{ color: 'var(--color-accent-gold)' }}>{caught}</span>
            <span className="mx-0.5 opacity-40">/</span>
            <span>{total}</span>
            <span className="ml-1.5 text-xs opacity-60">({Math.round(displayPct)}%)</span>
          </span>
        </div>
      )}
      <div className="progress-bar-track w-full h-3.5">
        <div
          className="progress-bar-fill h-full"
          data-category={category}
          style={{ width: mounted ? `${pct}%` : '0%' }}
        />
      </div>
      {showCelebration && <CelebrationEffect onComplete={handleCelebrationComplete} />}
    </div>
  )
}
