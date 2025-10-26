import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import userServises from '../../services/userServices'
import tracksServices from '../../services/tracksServices'

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

  const savePlaylist = async () => {
    try {
      const userData = await userServises.getUserData()
      const userID = userData.id

      const newPlaylist = await tracksServices.cretePlaylist(userID, 'Test title', 'Test description')
      const playlistID = newPlaylist.id

      await tracksServices.addTracksToPlaylist(playlistID, tracks.map(track => track.uri))
    } catch (err) {
      console.error('Error al obtener datos del usuario:', err.response?.data || err.message)
    }
  }

  return (
    <div>
      <h2>Top Tracks</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
        {Object.values(TIME_RANGES).map((range) => (
          <Button
            key={range.id}
            onClick={() => setTimeRange(range.id)}
            text={range.label}
            variant={range.id === timeRange ? 'default' : 'outline'}
          />
        ))}
      </div>
      {tracks.map((track, index) => (
        <article key={track.id}>
          <p>({index + 1}) Track: {track.name} - {track.artists[0]?.name}</p>
        </article>
      ))}
      <Button
        type='button'
        onClick={savePlaylist}
        text='Crear Playlist'
      />
    </div>
  )
}

export default TracksPage
