import api from './api'

const tracksServices = {
  getTopTracks: async (timeRange = 'short_term', limit = 50) => {
    try {
      const params = {
        limit,
        time_range: timeRange
      }
      const response = await api.get('/me/top/tracks', { params })
      return response.items
    } catch (error) {
      console.error('Error al obtener top tracks:', error.response?.data || error.message)
    }
  },

  cretePlaylist: async (userID, name, description) => {
    try {
      const response = await api.post(`/users/${userID}/playlists`, {
        name,
        description,
        public: false
      })
      return response
    } catch (error) {
      console.error('Error al crear playlist:', error.response?.data || error.message)
    }
  },

  addTracksToPlaylist: async (playlistID, tracks) => {
    try {
      const response = await api.post(`/playlists/${playlistID}/tracks`, {
        uris: tracks
      })
      return response
    } catch (error) {
      console.error('Error al agregar canciones a la playlist:', error.response?.data || error.message)
    }
  },

  addPlaylistCover: async (playlistID, base64Image) => {
    try {
      const response = await api.put(
        `/playlists/${playlistID}/images`,
        base64Image,
        {
          headers: {
            'Content-Type': 'image/jpeg'
          }
        }
      )

      return response
    } catch (error) {
      console.error(
        'Error al agregar portada a la playlist:',
        error.response?.data || error.message
      )
    }
  }
}

export default tracksServices
