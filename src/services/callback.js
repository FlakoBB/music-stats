// callback.js
import axios from 'axios'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

export const handleCallback = async () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  const codeVerifier = window.localStorage.getItem('spotify_code_verifier')

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )

    console.log('Access Token:', response.data.access_token)
    console.log('Refresh Token:', response.data.refresh_token)

    window.localStorage.setItem('spotify_access_token', response.data.access_token)
    window.localStorage.setItem('spotify_refresh_token', response.data.refresh_token)
    window.location.href = '/'
  } catch (err) {
    console.error('Error al intercambiar el código:', err)
  }
}
