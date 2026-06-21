import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing'
import CallbackPage from './pages/callback'
import TracksPage from './pages/tracks'
import ArtistsPage from './pages/artists'
import MainLayout from './Layouts/MainLayout'

function App () {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path='/callback' element={<CallbackPage />} />
        <Route path='/' element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/top-tracks' element={<TracksPage />} />
          <Route path='/top-artists' element={<ArtistsPage />} />
          <Route path='/top-genres' element={<p>Top Genres</p>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
