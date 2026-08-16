import styles from '../styles/components/custom-button.module.scss'

const VARIANTS = {
  filled: styles.filled,
  outlined: styles.outlined,
  text: styles.text
}

const SIZES = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl
}

const COLORS = {
  primary: styles.primary,
  success: styles.success,
  error: styles.error,
  warning: styles.warning
}

const CustomButton = ({
  children,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  type = 'button',
  onClick
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.custom_button} ${VARIANTS[variant]} ${SIZES[size]} ${COLORS[color]}`}
    >
      {children}
    </button>
  )
}

export default CustomButton
