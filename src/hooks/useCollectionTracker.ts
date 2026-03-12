import { useCallback, useMemo } from 'react'
import type { TrackerData, Category, CaughtState } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { fishData } from '../data/fishing'
import { gardenData } from '../data/gardening'
import { cookingData } from '../data/cooking'
import { birdData } from '../data/birdwatching'
import { insectData } from '../data/insects'

const STORAGE_KEY = 'heartopia-tracker'

const defaultData: TrackerData = {
  fishing: {},
  gardening: {},
  cooking: {},
  birdwatching: {},
  insects: {},
}

const dataMap = {
  fishing: fishData,
  gardening: gardenData,
  cooking: cookingData,
  birdwatching: birdData,
  insects: insectData,
}

export function useCollectionTracker() {
  const [data, setData] = useLocalStorage<TrackerData>(STORAGE_KEY, defaultData)

  const toggleStar = useCallback((category: Category, itemId: string, starIndex: number) => {
    setData(prev => {
      const catData = { ...prev[category] }
      const stars = [...(catData[itemId] || [false, false, false, false, false])]
      // If clicking the highest filled star, unfill it (and above). Otherwise fill up to clicked.
      const allFilledUpTo = stars.slice(0, starIndex + 1).every(Boolean)
      const noneAbove = stars.slice(starIndex + 1).every(s => !s)
      if (allFilledUpTo && noneAbove) {
        // Clicking the current max — clear all
        for (let i = 0; i < stars.length; i++) stars[i] = false
      } else {
        // Fill up to clicked index, clear above
        for (let i = 0; i < stars.length; i++) stars[i] = i <= starIndex
      }
      catData[itemId] = stars
      return { ...prev, [category]: catData }
    })
  }, [setData])

  const getCaught = useCallback((category: Category, itemId: string): boolean[] => {
    return data[category][itemId] || [false, false, false, false, false]
  }, [data])

  const getProgress = useCallback((category: Category): { caught: number; total: number } => {
    const items = dataMap[category]
    const catData = data[category]
    let caught = 0
    for (const item of items) {
      const stars = catData[item.id]
      if (stars && stars.some(s => s)) caught++
    }
    return { caught, total: items.length }
  }, [data])

  const getOverallProgress = useMemo(() => {
    const categories: Category[] = ['fishing', 'gardening', 'cooking', 'birdwatching', 'insects']
    let totalCaught = 0
    let totalItems = 0
    for (const cat of categories) {
      const p = getProgress(cat)
      totalCaught += p.caught
      totalItems += p.total
    }
    return { caught: totalCaught, total: totalItems }
  }, [getProgress])

  const exportData = useCallback(() => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const date = new Date().toISOString().split('T')[0]
    a.href = url
    a.download = `heartopia-tracker-export-${date}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }, [data])

  const importData = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString)
      if (parsed && typeof parsed === 'object' &&
          'fishing' in parsed && 'gardening' in parsed &&
          'cooking' in parsed && 'birdwatching' in parsed && 'insects' in parsed) {
        setData(parsed as TrackerData)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [setData])

  const resetData = useCallback(() => {
    setData(defaultData)
  }, [setData])

  const getCategoryData = useCallback((category: Category): CaughtState => {
    return data[category]
  }, [data])

  return {
    data,
    toggleStar,
    getCaught,
    getProgress,
    getOverallProgress,
    exportData,
    importData,
    resetData,
    getCategoryData,
  }
}
