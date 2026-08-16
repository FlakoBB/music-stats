import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from '../../styles/components/user-dropdown.module.scss'
import CustomButton from '../../components/CustomButton'

const UserDropdown = () => {
  const { user, logout } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  const dropdown = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdown} className={styles.container}>
      <button
        className={styles.btn}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.username}>{user.display_name}</span>
        <figure className={styles.avatar}>
          {user.images?.[0]?.url
            ? (
              <img
                src={user.images[0].url}
                alt={user.display_name}
              />
              )
            : (
              <span>
                {user.display_name.charAt(0)}
              </span>
              )}
        </figure>
      </button>
      <nav className={`${styles.menu} ${isOpen && styles.open}`}>
        <CustomButton
          color='error'
          size='sm'
          variant='text'
          onClick={logout}
        >
          Cerrar Sesión
        </CustomButton>
      </nav>
    </div>
  )
}

export default UserDropdown
