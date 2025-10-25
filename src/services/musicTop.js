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
          time_range: 'long_term' // opciones: short_term, medium_term, long_term // TODO: user can select time range
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
        name: 'Top 50', // TODO: personalizable
        description: 'Top 50 songs of the last 6 months', // TODO: description depending time range or editable
        public: false
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (err) {
    console.error('Error al crear playlist:', err.response?.data || err.message)
  }
}

export const addTracksToPlaylist = async (playlistID, tracks) => {
  const token = window.localStorage.getItem('spotify_access_token')

  if (!token) {
    console.error('No hay token de Spotify guardado')
    return
  }

  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        uris: tracks
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response
  } catch (err) {
    console.error('Error al agregar canciones a la playlist:', err.response?.data || err.message)
  }
}
