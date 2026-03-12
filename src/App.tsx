import { useState } from 'react'
import type { Category, AppView } from './types'
import { useCollectionTracker } from './hooks/useCollectionTracker'
import { useTheme } from './hooks/useTheme'
import { OverallProgress } from './components/OverallProgress'
import { ImportExportPanel } from './components/ImportExportPanel'
import { FishingTab } from './components/FishingTab'
import { GardeningTab } from './components/GardeningTab'
import { CookingTab } from './components/CookingTab'
import { BirdwatchingTab } from './components/BirdwatchingTab'
import { InsectsTab } from './components/InsectsTab'
import { HuntGuide } from './components/HuntGuide'
import { ViewToggle } from './components/ViewToggle'
import { SunIcon, MoonIcon } from './components/Icons'

const categories: Category[] = ['fishing', 'gardening', 'cooking', 'birdwatching', 'insects']

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg className={`corner-ornament ${className}`} width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path d="M0 0 C30 0, 60 10, 80 30 C90 40, 95 55, 95 70" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M0 0 C20 5, 40 18, 55 38 C65 50, 70 65, 72 80" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="80" cy="30" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="55" cy="38" r="2" fill="currentColor" opacity="0.3" />
      <path d="M15 0 Q20 12, 28 20 Q32 24, 38 26" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Tiny leaf flourish */}
      <path d="M80 30 C83 26, 88 25, 90 28 C92 31, 88 33, 84 32 Z" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

function HeaderDecoration() {
  return (
    <svg className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 hidden md:block" width="160" height="60" viewBox="0 0 160 60" fill="none">
      {/* Flowing vine */}
      <path d="M0 30 C20 10, 40 15, 60 30 C80 45, 100 20, 120 30 C135 38, 145 25, 160 30" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
      {/* Leaves along vine */}
      <path d="M30 20 C33 15, 38 14, 40 18 C42 22, 37 24, 34 22 Z" fill="rgba(255,255,255,0.4)" />
      <path d="M70 38 C73 42, 78 43, 80 40 C82 37, 77 34, 73 36 Z" fill="rgba(255,255,255,0.4)" />
      <path d="M110 24 C113 19, 118 18, 120 22 C122 26, 117 28, 113 26 Z" fill="rgba(255,255,255,0.4)" />
      {/* Berries */}
      <circle cx="50" cy="28" r="3" fill="rgba(255,255,255,0.2)" />
      <circle cx="90" cy="32" r="2.5" fill="rgba(255,255,255,0.2)" />
      <circle cx="140" cy="28" r="2" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState<Category>('fishing')
  const [activeView, setActiveView] = useState<AppView>('tracker')
  const tracker = useCollectionTracker()
  const { theme, toggleTheme } = useTheme()

  const categoryProgress = Object.fromEntries(
    categories.map(cat => [cat, tracker.getProgress(cat)])
  ) as Record<Category, { caught: number; total: number }>

  const renderTab = () => {
    const props = {
      onToggleStar: (itemId: string, star: number) => tracker.toggleStar(activeTab, itemId, star),
    }

    switch (activeTab) {
      case 'fishing':
        return <FishingTab caughtState={tracker.getCategoryData('fishing')} progress={categoryProgress.fishing} {...props} />
      case 'gardening':
        return <GardeningTab caughtState={tracker.getCategoryData('gardening')} progress={categoryProgress.gardening} {...props} />
      case 'cooking':
        return <CookingTab caughtState={tracker.getCategoryData('cooking')} progress={categoryProgress.cooking} {...props} />
      case 'birdwatching':
        return <BirdwatchingTab caughtState={tracker.getCategoryData('birdwatching')} progress={categoryProgress.birdwatching} {...props} />
      case 'insects':
        return <InsectsTab caughtState={tracker.getCategoryData('insects')} progress={categoryProgress.insects} {...props} />
    }
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Corner ornaments */}
      <CornerOrnament className="corner-ornament-tl" />
      <CornerOrnament className="corner-ornament-br" />

      {/* Header */}
      <header className="header-ornament sticky top-0 z-10" style={{
        background: 'var(--color-header-gradient)',
        borderBottom: '3px solid transparent',
        borderImage: 'var(--color-header-border)',
        borderImageSlice: 1,
      }}>
        <div className="max-w-[1400px] mx-auto px-5 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap relative">
            <div className="flex items-center gap-3">
              {/* Heart emblem */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212, 114, 140, 0.9) 0%, rgba(192, 139, 48, 0.9) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3)',
                border: '2px solid rgba(255,255,255,0.15)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.95">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight" style={{ color: '#FFFDF7', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                  Heartopia
                </h1>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Nunito, sans-serif', letterSpacing: '0.15em' }}>
                  Collection Tracker
                </span>
              </div>
            </div>
            <HeaderDecoration />
            <div className="flex items-center gap-3">
              <ViewToggle activeView={activeView} onViewChange={setActiveView} />
              <ImportExportPanel
                onExport={tracker.exportData}
                onImport={tracker.importData}
                onReset={tracker.resetData}
              />
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.95)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                <span style={{ transition: 'transform 0.3s ease', display: 'inline-flex' }}>
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1400px] mx-auto px-5 py-6 space-y-6 relative z-[1]">
        {activeView === 'tracker' ? (
          <>
            <div className="animate-page-reveal">
              <OverallProgress
                progress={tracker.getOverallProgress}
                categoryProgress={categoryProgress}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
            <div key={activeTab} className="animate-page-reveal" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
              {renderTab()}
            </div>
          </>
        ) : (
          <HuntGuide
            getCategoryData={tracker.getCategoryData}
            toggleStar={(category, itemId, star) => tracker.toggleStar(category, itemId, star)}
          />
        )}
      </main>
    </div>
  )
}

export default App
