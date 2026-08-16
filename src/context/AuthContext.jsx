import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithSpotify } from '../services/login'
import userServises from '../services/userServices'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const token = window.localStorage.getItem('spotify_access_token')

    if (!token) {
      setIsLoading(false)
      return
    }

    const loadUser = async () => {
      try {
        const data = await userServises.getUserData()
        setUser(data)
      } catch (error) {
        console.error('Error al cargar el usuario:', error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = () => {
    loginWithSpotify()
  }

  const logout = () => {
    window.localStorage.removeItem('spotify_access_token')
    window.localStorage.removeItem('spotify_refresh_token')
    window.localStorage.removeItem('spotify_code_verifier')
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    const handleSessionExpired = () => {
      logout()
    }

    window.addEventListener('spotify:session-expired', handleSessionExpired)

    return () => {
      window.removeEventListener('spotify:session-expired', handleSessionExpired)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }

  return context
}
