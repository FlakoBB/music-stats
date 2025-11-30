import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import userServises from '../../services/userServices'
import tracksServices from '../../services/tracksServices'
import ModalWindow from '../../components/ModalWindow'
import TrackRow from '../../components/TrackRow'

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
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [playlistData, setPlaylistData] = useState({
    title: '',
    description: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setPlaylistData({
      ...playlistData,
      [name]: value
    })
  }

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

      const newPlaylist = await tracksServices.cretePlaylist(userID, playlistData.title, playlistData.description)
      const playlistID = newPlaylist.id

      await tracksServices.addTracksToPlaylist(playlistID, tracks.map(track => track.uri))

      setModalIsOpen(false)
    } catch (err) {
      console.error('Error al obtener datos del usuario:', err.response?.data || err.message)
    }
  }

  return (
    <div>
      <ModalWindow
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <h3>Crear Playlist</h3>
        <p>Se creará la siguiente playlist en tu perfil de Spotify.</p>
        <label htmlFor='playlist-title'>
          Título:
          <input
            style={{ backgroundColor: '#121212' }}
            type='text'
            id='playlist-title'
            name='title'
            value={playlistData.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor='playlist-description'>
          Descripción:
          <input
            style={{ backgroundColor: '#121212' }}
            type='text'
            id='playlist-description'
            name='description'
            value={playlistData.description}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            gap: '1rem'
          }}
        >
          <Button
            variant='outline'
            color='error'
            text='Cancelar'
            onClick={() => setModalIsOpen(false)}
          />
          <Button
            text='Guardar'
            onClick={savePlaylist}
          />
        </div>
      </ModalWindow>
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
        <TrackRow
          key={track.id}
          track={track}
          position={index + 1}
        />
      ))}
      <Button
        type='button'
        onClick={() => setModalIsOpen(true)}
        text='Crear Playlist'
      />
    </div>
  )
}

export default TracksPage
