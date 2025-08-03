import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing'

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
      </Routes>
    </Router>
  )
}

export default App
