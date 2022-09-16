import PropTypes from 'prop-types'

function FormikErrorHandler({ errorCode }) {
  let errorMessage

  switch (errorCode) {
    case 'auth/user-not-found':
      errorMessage = 'User not found'
      break
    case 'auth/email-already-in-use':
      errorMessage = 'Email already in use'
      break
    case 'auth/wrong-password':
      errorMessage = 'Wrong password'
      break
    default:
      return null
  }

  return <div className="alert-box alert-box--red">{errorMessage}</div>
}

FormikErrorHandler.propTypes = {
  errorCode: PropTypes.string.isRequired
}

export default FormikErrorHandler
