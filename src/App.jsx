import { useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import LocationSearch from './components/LocationSearch'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import WeeklyForecast from './components/WeeklyForecast'
import NewsSection from './components/NewsSection'

const theme = createTheme({ palette: { mode: 'dark' } })

function App() {
  const [coords, setCoords] = useState(null)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LocationSearch setCoords={setCoords} />
        {coords && (
          <>
            <CurrentWeather coords={coords} />
            <HourlyForecast coords={coords} />
            <WeeklyForecast coords={coords} />
            <NewsSection />
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App