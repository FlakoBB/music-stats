export const refreshAccessToken = async () => {
  const refreshToken = window.localStorage.getItem('spotify_refresh_token')

  if (!refreshToken) {
    throw new Error('No hay refresh token disponible')
  }

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID
  })

  const response = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    }
  )

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.error || 'Error al refrescar el token')
    error.code = data.error
    throw error
  }

  window.localStorage.setItem(
    'spotify_access_token',
    data.access_token
  )

  return data.access_token
}
