import { useEffect, useState } from 'react'
import artistsServices from '../../services/artistsServices'
import GenreRow from '../../components/GenreRow'
import styles from '../../styles/pages/top-artists.module.scss'

const TIME_RANGES = {
  SHORT: {
    id: 'short_term',
    label: 'Últimos 4 semanas'
  },
  MEDIUM: {
    id: 'medium_term',
    label: 'Últimos 6 meses'
  },
  LONG: {
    id: 'long_term',
    label: 'Todo el tiempo'
  }
}

const buildGenresTop = (artists) => {
  const scores = new Map()
  artists.forEach((artist, index) => {
    const weight = artists.length - index
    artist.genres?.forEach((genre) => {
      scores.set(genre, (scores.get(genre) || 0) + weight)
    })
  })
  return [...scores.entries()]
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score)
}

const GenresPage = () => {
  const [genres, setGenres] = useState([])
  const [timeRange, setTimeRange] = useState(TIME_RANGES.SHORT.id)

  const fetchGenres = async () => {
    try {
      const results = await artistsServices.getTopArtists(timeRange)
      setGenres(buildGenresTop(results))
    } catch (error) {
      console.error('Error fetching genres:', error.message)
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [timeRange])

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Top Genres</h1>
          <p className={styles.description}>Los géneros que más escuchas</p>
        </div>
        <div className={styles.options}>
          {Object.values(TIME_RANGES).map((range) => (
            <button
              key={range.id}
              type='button'
              onClick={() => setTimeRange(range.id)}
              className={`${styles.op} ${range.id === timeRange ? styles.op_selected : ''}`}
              variant={range.id === timeRange ? 'default' : 'outline'}
            >
              {range.label}
            </button>
          ))}
        </div>
      </header>
      <section className={styles.content}>
        <div className={styles.list}>
          {
            genres.map((genre, index) => (
              <GenreRow
                key={genre.name}
                genre={genre.name}
                score={genre.score}
                position={index + 1}
              />
            ))
          }
        </div>
      </section>
    </section>
  )
}

export default GenresPage
