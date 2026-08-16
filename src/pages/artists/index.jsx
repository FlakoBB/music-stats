import { useEffect, useState } from 'react'
import artistsServices from '../../services/artistsServices'
import ArtistRow from '../../components/ArtistRow'
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

const ArtistsPage = () => {
  const [topArtists, setTopArtists] = useState([])
  const [timeRange, setTimeRange] = useState(TIME_RANGES.SHORT.id)

  const fetchArtists = async () => {
    try {
      const results = await artistsServices.getTopArtists(timeRange)
      setTopArtists(results)
    } catch (error) {
      console.error('Error fetching artists:', error.message)
    }
  }

  useEffect(() => {
    fetchArtists()
  }, [timeRange])

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Top Artists</h1>
          <p className={styles.description}>Los artistas que más escuchas</p>
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
            topArtists.map((artist, index) => (
              <ArtistRow
                key={artist.id}
                artist={artist}
                position={index + 1}
              />
            ))
          }
        </div>
      </section>
    </section>
  )
}

export default ArtistsPage
