import { useMemo, useState } from 'react'
import type { TimeOfDay, Weather, HuntableCategory, CaughtState } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { detectCurrentTimeOfDay } from '../utils/timeDetection'
import { filterHuntableItems, type TaggedItem, type HuntCaughtFilter } from '../utils/huntGuideFilter'
import { fishData } from '../data/fishing'
import { birdData } from '../data/birdwatching'
import { insectData } from '../data/insects'
import { HuntGuideControls } from './HuntGuideControls'
import { HuntGuideResults } from './HuntGuideResults'

interface HuntGuideProps {
  getCategoryData: (category: HuntableCategory) => CaughtState
  toggleStar: (category: HuntableCategory, itemId: string, star: number) => void
}

export function HuntGuide({ getCategoryData, toggleStar }: HuntGuideProps) {
  const autoTime = detectCurrentTimeOfDay()
  const [activeCategory, setActiveCategory] = useState<HuntableCategory>('fishing')
  const [selectedTime, setSelectedTime] = useState<TimeOfDay>(autoTime)
  const [selectedWeather, setSelectedWeather] = useState<Weather>('Sunny')
  const [caughtFilter, setCaughtFilter] = useLocalStorage<HuntCaughtFilter>('heartopia-hunt-caught-filter', 'all')
  const [viewMode, setViewMode] = useLocalStorage<'list' | 'cards'>('heartopia-hunt-view-mode', 'list')
  const [hobbyLevels, setHobbyLevels] = useLocalStorage<Record<HuntableCategory, number | null>>('heartopia-hunt-hobby-levels', {
    fishing: null,
    birdwatching: null,
    insects: null,
  })

  const fishingCaught = getCategoryData('fishing')
  const birdCaught = getCategoryData('birdwatching')
  const insectCaught = getCategoryData('insects')

  const caughtStates: Record<HuntableCategory, CaughtState> = {
    fishing: fishingCaught,
    birdwatching: birdCaught,
    insects: insectCaught,
  }

  const resultsByCategory = useMemo(() => {
    const makeOptions = (category: HuntableCategory, caughtState: CaughtState) => ({
      time: selectedTime,
      weather: selectedWeather,
      caughtFilter,
      caughtState,
      maxLevel: hobbyLevels[category],
    })

    return {
      fishing: filterHuntableItems(fishData, 'fishing', makeOptions('fishing', fishingCaught)),
      birdwatching: filterHuntableItems(birdData, 'birdwatching', makeOptions('birdwatching', birdCaught)),
      insects: filterHuntableItems(insectData, 'insects', makeOptions('insects', insectCaught)),
    } as Record<HuntableCategory, TaggedItem[]>
  }, [selectedTime, selectedWeather, caughtFilter, hobbyLevels, fishingCaught, birdCaught, insectCaught])

  const categoryCounts: Record<HuntableCategory, number> = {
    fishing: resultsByCategory.fishing.length,
    birdwatching: resultsByCategory.birdwatching.length,
    insects: resultsByCategory.insects.length,
  }

  return (
    <div className="space-y-4 animate-page-reveal">
      <HuntGuideControls
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categoryCounts={categoryCounts}
        selectedTime={selectedTime}
        autoTime={autoTime}
        onTimeChange={setSelectedTime}
        onResetTime={() => setSelectedTime(autoTime)}
        selectedWeather={selectedWeather}
        onWeatherChange={setSelectedWeather}
        caughtFilter={caughtFilter}
        onCaughtFilterChange={setCaughtFilter}
        hobbyLevel={hobbyLevels[activeCategory]}
        onHobbyLevelChange={(level) => setHobbyLevels(prev => ({ ...prev, [activeCategory]: level }))}
      />
      <HuntGuideResults
        activeCategory={activeCategory}
        items={resultsByCategory[activeCategory]}
        caughtState={caughtStates[activeCategory]}
        onToggleStar={toggleStar}
        caughtFilter={caughtFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  )
}
