import { loginWithSpotify } from '../services/login'
import Button from './Button'

const LoginWithSpotifyButton = () => {
  return (
    <Button
      type='button'
      onClick={loginWithSpotify}
      text='Login with Spotify'
    />
  )
}

export default LoginWithSpotifyButton
