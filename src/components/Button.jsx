import { useEffect, useState } from 'react'
import styles from '../styles/components/buttons.module.scss'

const Button = ({ type = 'button', text = 'Button', onClick, size = 'md', color = 'primary', variant = 'default' }) => {
  const [fullStyles, setFullStyles] = useState(styles.btn)

  const configStyles = () => {
    switch (size) {
      case 'sm':
        setFullStyles(prev => prev + ` ${styles.btn_sm}`)
        break
      case 'md':
        setFullStyles(prev => prev + ` ${styles.btn_md}`)
        break
      case 'lg':
        setFullStyles(prev => prev + ` ${styles.btn_lg}`)
        break
      default:
        setFullStyles(prev => prev + ` ${styles.btn_md}`)
        break
    }

    switch (variant) {
      case 'default':
        setFullStyles(prev => prev + ` ${styles.btn_default}`)
        break
      case 'outline':
        setFullStyles(prev => prev + ` ${styles.btn_outline}`)
        break
      case 'text':
        setFullStyles(prev => prev + ` ${styles.btn_text}`)
        break
      default:
        setFullStyles(prev => prev + ` ${styles.btn_default}`)
        break
    }

    switch (color) {
      case 'primary':
        setFullStyles(prev => prev + ` ${styles.btn_primary}`)
        break
      case 'error':
        setFullStyles(prev => prev + ` ${styles.btn_error}`)
        break
      case 'warning':
        setFullStyles(prev => prev + ` ${styles.btn_warning}`)
        break
      default:
        setFullStyles(prev => prev + ` ${styles.btn_primary}`)
        break
    }
  }

  useEffect(() => {
    configStyles()
  }, [size, color, variant])

  return (
    <button
      type={type}
      onClick={onClick}
      className={fullStyles}
    >
      {text}
    </button>
  )
}

export default Button
