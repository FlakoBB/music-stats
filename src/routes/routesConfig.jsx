import ArtistsPage from '../pages/artists'
import GenresPage from '../pages/genres'
import TracksPage from '../pages/tracks'
import ProtectedRoute from './ProtectedRoute'

const routesConfig = [
  {
    path: '/top-tracks',
    element: <ProtectedRoute><TracksPage /></ProtectedRoute>
  },
  {
    path: '/top-artists',
    element: <ProtectedRoute><ArtistsPage /></ProtectedRoute>
  },
  {
    path: '/top-genres',
    element: <ProtectedRoute><GenresPage /></ProtectedRoute>
  }
]

export default routesConfig
