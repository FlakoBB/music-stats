import api from './api'

const userServises = {
  getUserData: async () => {
    try {
      const response = await api.get('/me')
      return response
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error.response?.data || error.message)
    }
  }
}

export default userServises
