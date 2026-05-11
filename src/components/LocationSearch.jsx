import { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'

const LocationSearch = ({ setCoords }) => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const API_KEY = import.meta.env.VITE_OWM_KEY

    const url = new URL('https://api.openweathermap.org/geo/1.0/direct')
    url.searchParams.append('q', query)
    url.searchParams.append('limit', 1)
    url.searchParams.append('appid', API_KEY)

    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    if (data.length === 0) {
      setError('Location not found!')
      return
    }

    setError('')
    setCoords({ lat: data[0].lat, lon: data[0].lon, name: data[0].name })
  }

  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>🌤 Weather App</Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <TextField
          label="Enter a city or zip code"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: 350 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
    </Box>
  )
}

export default LocationSearch