import { useEffect } from 'react'
import { handleCallback } from '../../services/callback'

const CallbackPage = () => {
  useEffect(() => {
    handleCallback()
  }, [])

  return (
    <div>
      <h1>Callback Page</h1>
      <p>This is the callback page.</p>
    </div>
  )
}

export default CallbackPage
