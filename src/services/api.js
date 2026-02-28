import axios from 'axios'
import { refreshAccessToken } from './refreshToken'

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

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      const newToken =
        await refreshAccessToken()

      originalRequest.headers.Authorization =
        `Bearer ${newToken}`

      return axiosInstance(originalRequest)
    }

    return Promise.reject(error)
  }
)

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
