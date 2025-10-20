import axios from 'axios'

export const getTopTracks = async () => {
  const token = window.localStorage.getItem('spotify_access_token')

  if (!token) {
    console.error('No hay token de Spotify guardado')
    return
  }

  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 50,
          time_range: 'short_term' // opciones: short_term, medium_term, long_term
        }
      }
    )

    console.log('Top tracks:', response.data.items)
    return response.data.items
  } catch (err) {
    console.error('Error al obtener las canciones más escuchadas:', err.response?.data || err.message)
  }
}

export const cretePlaylist = async (userID) => {
  const token = window.localStorage.getItem('spotify_access_token')

  if (!token) {
    console.error('No hay token de Spotify guardado')
    return
  }

  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        name: 'Top 50',
        description: 'Top 50 songs of the user',
        public: false
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response
  } catch (err) {
    console.error('Error al crear playlist:', err.response?.data || err.message)
  }
}
