import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { removeError, registerUser } from '../../redux/auth/authActions'
import FormikInput from '../FormikInput/FormikInput'
import FormikErrorHandler from '../FormikErrorHandler/FormikErrorHandler'
import { RegisterValidation } from '../../schema/validation'

function RegisterForm({ dispatchRegisterUser, dispatchRemoveError, errorCode }) {
  useEffect(() => () => dispatchRemoveError(), [dispatchRemoveError])

  const handleSubmit = (userData) => dispatchRegisterUser(userData)

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={RegisterValidation}
      >
        {() => (
          <Form className="basic-form">
            <FormikInput name="name" label="Name" type="text" />
            <FormikInput name="email" label="Email" type="email" />
            <FormikInput name="password" label="Password" type="password" />
            <FormikInput name="confirmPassword" label="Confirm Password" type="password" />
            <button className="basic-form__btn" type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>

      <FormikErrorHandler errorCode={errorCode} />
    </>
  )
}

RegisterForm.defaultProps = {
  errorCode: null
}

RegisterForm.propTypes = {
  dispatchRegisterUser: PropTypes.func.isRequired,
  dispatchRemoveError: PropTypes.func.isRequired,
  errorCode: PropTypes.string
}

const mapStateToProps = (state) => ({
  errorCode: state.auth.errorCode
})

const mapDispatchToProps = (dispatch) => ({
  dispatchRegisterUser: (userData) => dispatch(registerUser(userData)),
  dispatchRemoveError: () => dispatch(removeError())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
