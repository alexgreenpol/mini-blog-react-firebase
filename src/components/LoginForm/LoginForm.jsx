import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { removeError, loginUser } from '../../redux/auth/authActions'
import FormikInput from '../FormikInput/FormikInput'
import FormikErrorHandler from '../FormikErrorHandler/FormikErrorHandler'
import { LoginValidation } from '../../schema/validation'

function LoginForm({ dispatchLoginUser, dispatchRemoveError, errorCode }) {
  useEffect(() => () => dispatchRemoveError(), [dispatchRemoveError])

  const handleSubmit = (userData) => {
    dispatchLoginUser(userData)
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={LoginValidation}
      >
        <Form className="basic-form">
          <FormikInput name="email" label="Email" type="email" />
          <FormikInput name="password" label="Password" type="password" />
          <button className="basic-form__btn" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <FormikErrorHandler errorCode={errorCode} />
    </>
  )
}

LoginForm.defaultProps = {
  errorCode: null
}

LoginForm.propTypes = {
  dispatchLoginUser: PropTypes.func.isRequired,
  dispatchRemoveError: PropTypes.func.isRequired,
  errorCode: PropTypes.string
}

const mapStateToProps = (state) => ({
  errorCode: state.auth.errorCode
})

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginUser: (userData) => dispatch(loginUser(userData)),
  dispatchRemoveError: () => dispatch(removeError())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
