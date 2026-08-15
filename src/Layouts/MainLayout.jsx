import { Outlet, useNavigate } from 'react-router-dom'
import styles from '../styles/main-layout.module.scss'
import { useAuth } from '../context/AuthContext'
import CustomButton from '../components/CustomButton'

const MainLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <header className={styles.header}>
        <h1
          onClick={() => navigate('/')}
        >
          Music Stats
        </h1>
        {user && (
          <div className={styles.user}>
            {user.images?.[0]?.url && (
              <img
                className={styles.avatar}
                src={user.images[0].url}
                alt={user.display_name}
              />
            )}
            <span className={styles.name}>{user.display_name}</span>
            <CustomButton
              color='error'
              size='sm'
              variant='text'
              onClick={logout}
            >
              Cerrar Sesión
            </CustomButton>
          </div>
        )}
      </header>
      <div className={styles.content}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default MainLayout
