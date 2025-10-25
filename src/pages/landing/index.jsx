import { useEffect, useState } from 'react'
import LoginWithSpotifyButton from '../../components/LoginWithSpotify'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = window.localStorage.getItem('spotify_access_token')
    if (token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  if (!loggedIn) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <h1>Music Stats</h1>
        <p>Inicia sesión para poder obtener tus tops de canciones, artitas y generos</p>
        <LoginWithSpotifyButton />
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <h1>Music Stats</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
        <button
          type='button'
          onClick={() => navigate('/top-tracks')}
        >
          Top Tracks
        </button>
        <button
          type='button'
          onClick={() => navigate('/top-artists')}
        >
          Top Artists
        </button>
        <button
          type='button'
          onClick={() => navigate('/top-genres')}
        >
          Top Genres
        </button>
      </div>
    </div>
  )
}

export default LandingPage
