import PropTypes from 'prop-types'
import { useField, ErrorMessage } from 'formik'

function FormikInput({ name, label, ...props }) {
  const [field, meta] = useField(name)
  return (
    <div className="input-field">
      <label htmlFor={field.name}>{label}</label>
      <input className={meta.error && meta.touched ? 'error' : ''} {...field} {...props} />
      <ErrorMessage className="input-field__error" name={field.name} component="div" />
    </div>
  )
}

FormikInput.defaultProps = {
  label: null
}

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default FormikInput
