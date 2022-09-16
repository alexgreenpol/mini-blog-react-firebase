import PropTypes from 'prop-types'
import { useField, ErrorMessage } from 'formik'

function FormikTextarea({ name, label, ...props }) {
  const [field, meta] = useField(name)
  return (
    <div className="input-field">
      <label htmlFor={field.name}>{label}</label>
      <textarea className={meta.error && meta.touched ? 'error' : ''} {...field} {...props} />
      <ErrorMessage className="input-field__error" name={field.name} component="div" />
    </div>
  )
}

FormikTextarea.defaultProps = {
  label: null
}

FormikTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default FormikTextarea
