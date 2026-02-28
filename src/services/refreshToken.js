export const refreshAccessToken = async () => {
  const refreshToken = window.localStorage.getItem('spotify_refresh_token')

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

  window.localStorage.setItem(
    'spotify_access_token',
    data.access_token
  )

  return data.access_token
}
