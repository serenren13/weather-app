import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

const CurrentWeather = ({ coords }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_OWM_KEY

    const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    url.searchParams.append('lat', coords.lat)
    url.searchParams.append('lon', coords.lon)
    url.searchParams.append('units', 'imperial')
    url.searchParams.append('appid', API_KEY)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('current weather data:', data)
        setWeather(data)
        setLoading(false)
      })
  }, [coords])

  if (loading) return <CircularProgress />

  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h4">{coords.name}</Typography>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <Typography variant="h2">{Math.round(weather.main.temp)}°F</Typography>
      <Typography variant="h6">{weather.weather[0].description}</Typography>
      <Typography>Feels like: {Math.round(weather.main.feels_like)}°F</Typography>
      <Typography>Humidity: {weather.main.humidity}%</Typography>
      <Typography>Wind: {Math.round(weather.wind.speed)} mph</Typography>
    </Box>
  )
}

export default CurrentWeather