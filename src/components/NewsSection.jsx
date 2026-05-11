import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia } from '@mui/material'

const NewsSection = () => {
  const [articles, setArticles] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NYT_KEY

    const url = new URL('https://api.nytimes.com/svc/topstories/v2/home.json')
    url.searchParams.append('api-key', API_KEY)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('nyt data:', data)
        const withImages = data.results.filter((item) => item.multimedia && item.multimedia.length > 0)
        setArticles(withImages.slice(0, 5))
        setLoading(false)
      })
  }, [])

  if (loading) return <CircularProgress />

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Top News Stories</Typography>
      {articles.map((article, index) => (
        <Card key={index} sx={{ display: 'flex', mb: 2, backgroundColor: '#1e1e1e' }}>
          <CardMedia
            component="img"
            sx={{ width: 160 }}
            image={article.multimedia[0].url}
            alt={article.title}
          />
          <CardContent>
            <Typography variant="h6">{article.title}</Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
              {article.byline}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{article.abstract}</Typography>
            <a href={article.url} target="_blank" rel="noreferrer" style={{ color: '#90caf9' }}>
              Read more
            </a>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default NewsSection