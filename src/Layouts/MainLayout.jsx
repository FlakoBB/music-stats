import { Outlet, useNavigate } from 'react-router-dom'
import styles from '../styles/main-layout.module.scss'
import { useAuth } from '../context/AuthContext'
import UserDropdown from '../pages/landing/UserDropdown'
import { useEffect, useRef } from 'react'

const MainLayout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [window.location.pathname])

  return (
    <>
      <header className={styles.header}>
        <span
          className={styles.logo}
          onClick={() => navigate('/')}
        >
          Music Stats
        </span>
        {user && <UserDropdown />}
      </header>
      <div
        ref={contentRef}
        className={styles.content}
      >
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default MainLayout
