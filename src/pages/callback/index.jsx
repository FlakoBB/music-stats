import { useEffect } from 'react'
import { handleCallback } from '../../services/callback'
import styles from '../../styles/pages/callback.module.scss'

const CallbackPage = () => {
  useEffect(() => {
    handleCallback()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  )
}

export default CallbackPage
