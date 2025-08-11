import { loginWithSpotify } from '../services/login'

const LoginWithSpotify = () => {
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

export default LoginWithSpotify
