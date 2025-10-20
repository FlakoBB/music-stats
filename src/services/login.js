import axios from 'axios'

const clientId = '823a8affd15c420782450579e590d7a3'
const redirectUri = 'http://localhost:5173/callback'
const scope = 'user-top-read playlist-modify-public playlist-modify-private'

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export const loginWithSpotify = async () => {
  const codeVerifier = generateRandomString(64)
  window.localStorage.setItem('spotify_code_verifier', codeVerifier)

  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed)

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  })

  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

export const getUserData = async () => {
  const token = window.localStorage.getItem('spotify_access_token')

  if (!token) {
    console.error('No hay token de Spotify guardado')
    return
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (err) {
    console.error('Error al obtener datos del usuario:', err.response?.data || err.message)
  }
}
