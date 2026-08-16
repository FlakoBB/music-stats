import { loginWithSpotify } from '../services/login'
import CustomButton from './CustomButton'

const LoginWithSpotifyButton = () => {
  return (
    <CustomButton
      size='xl'
      onClick={loginWithSpotify}
    >
      Iniciar Sesión con Spotify
    </CustomButton>
  )
}

export default LoginWithSpotifyButton
