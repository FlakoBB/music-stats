import { useEffect, useState } from 'react'
import LoginWithSpotify from '../../components/LoginWithSpotify'
import { getTopTracks } from '../../services/musicTop'

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

  return (
    <div>
      Music Stats
      {!loggedIn && <LoginWithSpotify />}
      {loggedIn && (
        <>
          <h2>Top Tracks</h2>
          {tracks.map(track => (
            <article key={track.id}>
              <p>Track: {track.name}</p>
            </article>
          ))}
        </>
      )}
    </div>
  )
}

export default LandingPage
