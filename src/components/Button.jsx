import { useEffect, useState } from 'react'
import styles from '../styles/components/buttons.module.scss'

const Button = ({
  type = 'button',
  text = 'Button',
  onClick,
  size = 'md',
  color = 'primary',
  variant = 'default',
  isDisabled = false
}) => {
  const [fullStyles, setFullStyles] = useState('')

  const configStyles = () => {
    let finalStyles = styles.btn

    switch (size) {
      case 'sm':
        finalStyles = finalStyles + ` ${styles.btn_sm}`
        break
      case 'md':
        finalStyles = finalStyles + ` ${styles.btn_md}`
        break
      case 'lg':
        finalStyles = finalStyles + ` ${styles.btn_lg}`
        break
      default:
        finalStyles = finalStyles + ` ${styles.btn_md}`
        break
    }

    switch (variant) {
      case 'default':
        finalStyles = finalStyles + ` ${styles.btn_default}`
        break
      case 'outline':
        finalStyles = finalStyles + ` ${styles.btn_outline}`
        break
      case 'text':
        finalStyles = finalStyles + ` ${styles.btn_text}`
        break
      default:
        finalStyles = finalStyles + ` ${styles.btn_default}`
        break
    }

    switch (color) {
      case 'primary':
        finalStyles = finalStyles + ` ${styles.btn_primary}`
        break
      case 'error':
        finalStyles = finalStyles + ` ${styles.btn_error}`
        break
      case 'warning':
        finalStyles = finalStyles + ` ${styles.btn_warning}`
        break
      default:
        finalStyles = finalStyles + ` ${styles.btn_primary}`
        break
    }

    if (isDisabled) {
      finalStyles = finalStyles + ` ${styles.btn_disabled}`
    }

    setFullStyles(finalStyles)
  }

  useEffect(() => {
    configStyles()
  }, [size, color, variant])

  return (
    <button
      type={type}
      onClick={onClick}
      className={fullStyles}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}

export default Button
