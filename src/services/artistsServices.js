import api from './api'

const artistsServices = {
  getTopArtists: async (timeRange = 'short_term', limit = 50) => {
    try {
      const params = {
        limit,
        time_range: timeRange
      }
      const response = await api.get('/me/top/artists', { params })
      return response.items
    } catch (error) {
      console.error('Error al obtener top artists:', error.response?.data || error.message)
    }
  }
}

export default artistsServices
