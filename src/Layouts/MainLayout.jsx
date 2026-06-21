import { Outlet } from 'react-router-dom'
import styles from '../styles/main-layout.module.scss'

const MainLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Music Stats</h1>
      </header>
      <div className={styles.content}>
        <main className={styles.main}>
          <Outlet />
        </main>
        <footer>
          footer
        </footer>
      </div>
    </>
  )
}

export default MainLayout
