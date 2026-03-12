# Heartopia Collection Tracker

A React + TypeScript collection tracker for the Heartopia game, built with Vite and Tailwind CSS v4.

## Tech Stack
- React 19, TypeScript, Vite 7, Tailwind CSS 4 (`@tailwindcss/vite`)
- No component library - all custom components
- localStorage for persistence (`useLocalStorage` hook)
- Light/dark theme via CSS variables + `.dark` class on `<html>`

## Architecture
- `src/types/index.ts` - All shared types (Category, FilterState, CaughtState, AppView, HuntableCategory, etc.)
- `src/constants.ts` - Category labels, icons, color mappings, `CATEGORY_ACCENTS`
- `src/data/` - Static game data files (fishing, gardening, cooking, birdwatching, insects)
- `src/hooks/` - `useCollectionTracker` (state management), `useTheme`, `useLocalStorage`
- `src/components/` - All UI components
- `src/utils/filters.ts` - Filtering and sorting logic for tracker tabs
- `src/utils/timeDetection.ts` - Maps real-world hour to game TimeOfDay
- `src/utils/huntGuideFilter.ts` - Filters huntable items by time, weather, level, caught status

## Design System
- **"Enchanted Field Guide"** aesthetic - storybook journal feel
- **Fonts**: Fraunces (display/headings) + Nunito (body) via Google Fonts
- **Colors**: CSS variables in `:root` (light) and `.dark` (dark theme) in `index.css`
- **Key CSS classes**: `.storybook-card`, `.category-medallion`, `.journal-divider`, `.progress-bar-track/.fill`, `.star-price-list`
- **Header**: Dark wood-tone gradient, always dark in both themes
- Paper grain texture overlay on body background

## Key Patterns
- Category tabs are integrated into `OverallProgress` component (combined card with medallion navigation)
- `CollectionTable` is generic - each tab provides its own column definitions
- Star ratings use `useCollectionTracker.toggleStar(category, itemId, starIndex)`
- Each category tab manages its own filter state locally
- Star prices display as aligned mini star icons + tabular numbers (no chip/pill backgrounds)
- `CATEGORY_ACCENTS` in constants.ts is shared between OverallProgress and HuntGuideResults

## Hunt Guide (second top-level view)
- `ViewToggle` in header switches between Tracker and Hunt Guide (`AppView` state in App)
- Only 3 "huntable" categories: fishing, birdwatching, insects (have time/weather data)
- Category medallion nav shows one hobby at a time (same style as OverallProgress medallions)
- Controls: time of day (auto-detected from clock), weather (default Sunny), hobby level (1-10), caught filter (show all / hide caught / hide fully caught)
- Results support list and card view toggle
- localStorage keys: `heartopia-hunt-caught-filter`, `heartopia-hunt-hobby-levels`, `heartopia-hunt-view-mode`
- Stars toggled from Hunt Guide persist to the same tracker data (shared `useCollectionTracker`)

## Commands
- `npm run dev` - Start dev server (port 5173)
- `npm run build` - TypeScript check + Vite build
- `npm run lint` - ESLint
