import { useEffect, useMemo, useState } from 'react'
import './App.css'

const RESORTS = [
  {
    id: 'miami',
    name: 'Miami Shoreline',
    region: 'Florida, USA',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  {
    id: 'waikiki',
    name: 'Waikiki Bay',
    region: 'Oahu, Hawaii',
    latitude: 21.2766,
    longitude: -157.8252,
  },
  {
    id: 'maldives',
    name: 'Velassaru Coast',
    region: 'Maldives',
    latitude: 3.868,
    longitude: 73.428,
  },
  {
    id: 'bali',
    name: 'Seminyak Beach',
    region: 'Bali, Indonesia',
    latitude: -8.6906,
    longitude: 115.165,
  },
]

const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Light rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  80: 'Rain showers',
  95: 'Thunderstorm',
}

function getWeatherLabel(code) {
  return WEATHER_CODES[code] || 'Coastal conditions updating'
}

function formatNumber(value, digits = 1) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '--'
  }

  return value.toFixed(digits)
}

function formatHour(isoTimestamp) {
  if (!isoTimestamp) {
    return '--'
  }

  return new Date(isoTimestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function App() {
  const [selectedResortId, setSelectedResortId] = useState(RESORTS[0].id)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const selectedResort = useMemo(
    () => RESORTS.find((resort) => resort.id === selectedResortId) || RESORTS[0],
    [selectedResortId],
  )

  async function fetchResortForecast(resort) {
    setLoading(true)
    setError('')

    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', resort.latitude)
    url.searchParams.set('longitude', resort.longitude)
    url.searchParams.set(
      'current',
      'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index',
    )
    url.searchParams.set(
      'hourly',
      'temperature_2m,weather_code,wind_speed_10m,uv_index,wave_height,sea_surface_temperature',
    )
    url.searchParams.set(
      'daily',
      'temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset',
    )
    url.searchParams.set('timezone', 'auto')

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Unable to load beach data right now.')
      }

      const json = await response.json()
      setForecast(json)
    } catch (fetchError) {
      setError(fetchError.message || 'Something went wrong while loading data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResortForecast(selectedResort)
  }, [selectedResort])

  const surfBrief = useMemo(() => {
    if (!forecast?.hourly?.time) {
      return []
    }

    const now = Date.now()
    const currentIndex = forecast.hourly.time.findIndex(
      (time) => new Date(time).getTime() >= now,
    )

    const startIndex = currentIndex >= 0 ? currentIndex : 0
    const endIndex = Math.min(startIndex + 6, forecast.hourly.time.length)

    const brief = []

    for (let index = startIndex; index < endIndex; index += 1) {
      brief.push({
        time: forecast.hourly.time[index],
        waveHeight: forecast.hourly.wave_height?.[index],
        seaTemp: forecast.hourly.sea_surface_temperature?.[index],
        weatherCode: forecast.hourly.weather_code?.[index],
      })
    }

    return brief
  }, [forecast])

  return (
    <main className="resort-app">
      <section className="hero-panel">
        <p className="eyebrow">Beach Side & Tides Ocean Resort</p>
        <h1>Live Coastal Forecast Lounge</h1>
        <p className="description">
          Explore real-time weather and sea updates for four dream resort coastlines.
          Select a destination, then refresh to get current surf-ready conditions.
        </p>

        <div className="controls">
          <label htmlFor="resort-select">Choose a resort</label>
          <select
            id="resort-select"
            value={selectedResortId}
            onChange={(event) => setSelectedResortId(event.target.value)}
          >
            {RESORTS.map((resort) => (
              <option key={resort.id} value={resort.id}>
                {resort.name} - {resort.region}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => fetchResortForecast(selectedResort)}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Conditions'}
          </button>
        </div>
      </section>

      <section className="status-panel">
        <header>
          <h2>{selectedResort.name}</h2>
          <p>{selectedResort.region}</p>
        </header>

        {loading && <p className="message">Loading fresh beach conditions...</p>}

        {!loading && error && (
          <p className="message error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && forecast && (
          <>
            <div className="current-grid">
              <article>
                <h3>Current Air</h3>
                <p>{formatNumber(forecast.current?.temperature_2m)} C</p>
              </article>
              <article>
                <h3>Feels Like</h3>
                <p>{formatNumber(forecast.current?.apparent_temperature)} C</p>
              </article>
              <article>
                <h3>Wind</h3>
                <p>{formatNumber(forecast.current?.wind_speed_10m)} km/h</p>
              </article>
              <article>
                <h3>UV Index</h3>
                <p>{formatNumber(forecast.current?.uv_index, 0)}</p>
              </article>
            </div>

            <div className="condition-banner">
              <strong>{getWeatherLabel(forecast.current?.weather_code)}</strong>
              <span>
                Sunrise {formatHour(forecast.daily?.sunrise?.[0])} | Sunset{' '}
                {formatHour(forecast.daily?.sunset?.[0])}
              </span>
            </div>

            <h3 className="brief-title">Next 6 Hour Surf Brief</h3>
            <div className="brief-grid">
              {surfBrief.map((item) => (
                <article key={item.time}>
                  <h4>{formatHour(item.time)}</h4>
                  <p>Wave: {formatNumber(item.waveHeight)} m</p>
                  <p>Sea temp: {formatNumber(item.seaTemp)} C</p>
                  <p>{getWeatherLabel(item.weatherCode)}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default App
