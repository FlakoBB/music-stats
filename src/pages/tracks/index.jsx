import { useEffect, useState } from 'react'
import tracksServices from '../../services/tracksServices'
import TrackRow from '../../components/TrackRow'
import styles from '../../styles/pages/top-tracks.module.scss'

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

const TracksPage = () => {
  const [tracks, setTracks] = useState([])
  const [timeRange, setTimeRange] = useState(TIME_RANGES.SHORT.id)

  const fetchTracks = async () => {
    const data = await tracksServices.getTopTracks(timeRange)
    setTracks(data || [])
  }

  useEffect(() => {
    fetchTracks()
  }, [timeRange])

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Top Tracks</h1>
          <p className={styles.description}>Tus canciones mas escuchadas</p>
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
      <div className={styles.list}>
        {tracks.map((track, index) => (
          <TrackRow
            key={track.id}
            track={track}
            position={index + 1}
          />
        ))}
      </div>
    </section>
  )
}

export default TracksPage
