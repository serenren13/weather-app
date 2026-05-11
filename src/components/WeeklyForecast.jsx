import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

const WeeklyForecast = ({ coords }) => {
  const [daily, setDaily] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_OWM_KEY

    const url = new URL('https://api.openweathermap.org/data/2.5/forecast')
    url.searchParams.append('lat', coords.lat)
    url.searchParams.append('lon', coords.lon)
    url.searchParams.append('units', 'imperial')
    url.searchParams.append('appid', API_KEY)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('weekly data:', data)
        const oncePerDay = data.list.filter((item) =>
          item.dt_txt.includes('12:00:00')
        )
        setDaily(oncePerDay)
        setLoading(false)
      })
  }, [coords])

  if (loading) return <CircularProgress />

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>7-Day Forecast</Typography>
      {daily.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
          <Typography sx={{ width: 120 }}>
            {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
          </Typography>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt={item.weather[0].description}
          />
          <Typography sx={{ width: 150 }}>{item.weather[0].description}</Typography>
          <Typography>{Math.round(item.main.temp_min)}°F / {Math.round(item.main.temp_max)}°F</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default WeeklyForecast