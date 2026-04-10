# Beach Side & Tides Ocean Resort

## Description

Beach Side & Tides Ocean Resort is a live coastal forecast dashboard built with React. It fetches real-time weather, wind, UV index, wave height, and sea surface temperature from a public API for four iconic beach resort locations around the world. Users can switch between destinations and manually refresh conditions at any time.

## API Used

**Open-Meteo Forecast API**
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Documentation: https://open-meteo.com/en/docs
- No API key required — fully free and open

## How to Run Locally

1. Clone or download this repository.
2. Open a terminal and navigate into the project folder:
   ```bash
   cd "Beach side & Tides ocean Resort"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the URL shown in the terminal (typically `http://localhost:5173`) in your browser.

## Features

- Resort selector — choose from Miami Shoreline, Waikiki Bay, Velassaru Coast (Maldives), or Seminyak Beach (Bali)
- Live current conditions — air temperature, feels-like temperature, wind speed, and UV index
- Sunrise and sunset times for the selected location
- 6-hour surf brief — wave height, sea surface temperature, and sky conditions per hour
- Manual **Refresh Conditions** button to re-fetch the latest data
- Loading state shown while data is being fetched
- Error state shown if the API request fails

## Lab Requirements — Completed

### Functionality

- [x] Fetches data from a real public API (Open-Meteo)
- [x] Uses `useEffect` to load data automatically on mount and when the selected resort changes
- [x] Includes a **Refresh Conditions** button that triggers a new fetch
- [x] Handles and displays a loading state while data is being fetched
- [x] Renders fetched data on screen in a clear, card-based layout

### Code

- [x] Written in React using functional components
- [x] State managed with `useState` (`selectedResortId`, `forecast`, `loading`, `error`)
- [x] No console errors on load or interaction

### Styling

- [x] Styled with a beach and ocean theme — gradient backgrounds, card layout, responsive grid, custom typography

## Technical Challenge

### The Problem

Open-Meteo returns weather data as parallel arrays indexed by hour — `time[0]`, `temperature_2m[0]`, `wave_height[0]`, and so on — covering the next 7 days. When the app first loads, the first index in the array is the start of the current day (midnight), not the current hour. Displaying from index `0` would show stale time slots that had already passed.

### How I Solved It

I used `Array.findIndex()` to scan the `hourly.time` array and locate the first timestamp whose value was greater than or equal to `Date.now()`. I then used that index as the start of a 6-item slice so the surf brief always shows the next six hours from the current moment — never past ones.

```js
const currentIndex = forecast.hourly.time.findIndex(
  (time) => new Date(time).getTime() >= now,
)
const startIndex = currentIndex >= 0 ? currentIndex : 0
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
