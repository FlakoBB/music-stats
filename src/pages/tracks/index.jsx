import { useEffect, useState } from 'react'
import { getUserData } from '../../services/login'
import { addTracksToPlaylist, cretePlaylist, getTopTracks } from '../../services/musicTop'

const TracksPage = () => {
  const [tracks, setTracks] = useState([])

  const fetchTracks = async () => {
    const data = await getTopTracks()
    setTracks(data || [])
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  const createEmptyPlaylist = async () => {
    try {
      const userData = await getUserData()
      const userID = userData.id

      const newPlaylist = await cretePlaylist(userID)
      const playlistID = newPlaylist.id

      const songsAdded = await addTracksToPlaylist(playlistID, tracks.map(track => track.uri))
      console.log('Canciones agregadas:', songsAdded)
    } catch (err) {
      console.error('Error al obtener datos del usuario:', err.response?.data || err.message)
    }
  }

  return (
    <div>
      <h2>Top Tracks</h2>
      {tracks.map((track, index) => (
        <article key={track.id}>
          <p>({index + 1}) Track: {track.name} - {track.artists[0]?.name}</p>
        </article>
      ))}
      <button
        type='button'
        onClick={createEmptyPlaylist}
      >
        Crear Playlist
      </button>
    </div>
  )
}

export default TracksPage
