# Heartopia Collection Helper

A cozy collection tracker for [Heartopia](https://store.steampowered.com/app/2547680/Heartopia/), styled as an enchanted field guide. Track your progress across all five hobbies, and use the Hunt Guide to find exactly what you're looking for.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)

## Features

### Collection Tracker

Track your star progress across all five hobby categories:

- **Fishing** — species by location, weather, and time of day
- **Gardening** — crops organized by type (vegetables, fruits, grains, flowers)
- **Cooking** — recipes with ingredients, energy values, and sell prices
- **Birdwatching** — birds by habitat, weather, and time of day
- **Insects** — bugs by location, weather, and time of day

Each item supports **5-star tracking** so you can mark exactly how many quality stars you've collected. Filter by caught status, search by name, sort any column, and watch your overall completion fill up.

### Hunt Guide

A focused tool for the three "huntable" hobbies — fishing, birdwatching, and insects:

- **Auto-detects time of day** from your system clock and highlights what's available right now
- **Filter by weather** (Sunny, Rainy, Rainbow) to match current in-game conditions
- **Hobby level slider** (1–10) to show only what you can currently catch
- **Hide caught items** to zero in on what you still need
- Toggling stars in the Hunt Guide updates your tracker data — everything stays in sync

### Other Highlights

- **Light & dark theme** with a storybook aesthetic — paper grain textures, hand-crafted color palettes
- **Import/export** your collection data as JSON for backup or sharing
- **Fully client-side** — all data stays in your browser via localStorage, nothing is sent anywhere
- **Mobile-friendly** responsive layout

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — ready to deploy to any static hosting provider.

## Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Framework | React 19                      |
| Language  | TypeScript 5.9                |
| Bundler   | Vite 7                        |
| Styling   | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Storage   | localStorage (browser)        |
| Fonts     | Fraunces (headings) + Nunito (body)  |

## License

This project is for personal/community use. Game data belongs to the Heartopia developers.
