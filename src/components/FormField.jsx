import styles from '../styles/components/form-field.module.scss'

const FormField = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  label,
  isTextarea = false
}) => {
  return (
    <div className={styles.form_field}>
      <label
        htmlFor={id}
      >
        {label}
      </label>
      {isTextarea
        ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
          />
          )
        : (
          <input
            id={id}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
          />)}
    </div>
  )
}

export default FormField
