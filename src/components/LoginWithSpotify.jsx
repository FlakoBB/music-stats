import { loginWithSpotify } from '../services/login'

const LoginWithSpotifyButton = () => {
  return (
    <button
      type='button'
      onClick={loginWithSpotify}
      className='bg-green-300'
    >
      Login with Spotify
    </button>
  )
}

export default LoginWithSpotifyButton
