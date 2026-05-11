import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

const HourlyForecast = ({ coords }) => {
  const [hourly, setHourly] = useState(null)
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
        console.log('hourly data:', data)
        setHourly(data.list.slice(0, 8))
        setLoading(false)
      })
  }, [coords])

  if (loading) return <CircularProgress />

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Hourly Forecast</Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
        {hourly.map((item, index) => (
          <Box key={index} sx={{ textAlign: 'center', minWidth: 80 }}>
            <Typography>{new Date(item.dt * 1000).getHours()}:00</Typography>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <Typography>{Math.round(item.main.temp)}°F</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default HourlyForecast