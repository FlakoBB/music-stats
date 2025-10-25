import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing'
import CallbackPage from './pages/callback'
import TracksPage from './pages/tracks'

function App () {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/callback' element={<CallbackPage />} />
        <Route path='/top-tracks' element={<TracksPage />} />
        <Route path='/top-artists' element={<p>Top Artist</p>} />
        <Route path='/top-genres' element={<p>Top Genres</p>} />
      </Routes>
    </Router>
  )
}

export default App
