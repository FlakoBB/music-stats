import ArtistsPage from '../pages/artists'
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
    element: <ProtectedRoute><p>Top Genres</p></ProtectedRoute>
  }
]

export default routesConfig
