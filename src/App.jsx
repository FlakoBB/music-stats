import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing'
import CallbackPage from './pages/callback'
import MainLayout from './Layouts/MainLayout'
import routesConfig from './routes/routesConfig'

function App () {
  return (
    <Routes>
      <Route path='/callback' element={<CallbackPage />} />
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        {
          routesConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))
        }
      </Route>
    </Routes>
  )
}

export default App
