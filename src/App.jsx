import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing'
import CallbackPage from './pages/callback'

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
      </Routes>
    </Router>
  )
}

export default App
