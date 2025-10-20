import { useEffect, useState } from 'react'
import LoginWithSpotify from '../../components/LoginWithSpotify'
import { addTracksToPlaylist, cretePlaylist, getTopTracks } from '../../services/musicTop'
import { getUserData } from '../../services/login'

const LandingPage = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    const token = window.localStorage.getItem('spotify_access_token')
    if (token) {
      setLoggedIn(true)
      const fetchTracks = async () => {
        const data = await getTopTracks()
        setTracks(data || [])
      }
      fetchTracks()
    } else {
      setLoggedIn(false)
    }
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

  // TODO: Create menmu with buttons

  return (
    <div>
      Music Stats
      {!loggedIn && <LoginWithSpotify />}
      {loggedIn && (
        <>
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
        </>
      )}
    </div>
  )
}

export default LandingPage
