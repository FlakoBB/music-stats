import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('spotify_access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const api = {
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config)
      return response.data
    } catch (error) {
      handleError(error)
    }
  },
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config)
      return response.data
    } catch (error) {
      handleError(error)
    }
  }
}

const handleError = (err) => {
  if (err.response) {
    console.error(`Error ${err.response.status}:`, err.response.data)
  } else if (err.request) {
    console.error('Sin respuesta del servidor:', err.request)
  } else {
    console.error('Error al configurar la petición:', err.message)
  }
}

export default api
