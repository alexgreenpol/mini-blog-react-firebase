import { getAuth } from 'firebase/auth'
import { login, logout, register } from '../../api/firebase/crud'
import { removeFromLocalStorage, setToLocalStorage } from '../../helpers/localStorageService'
import { authActionTypes } from './authActionTypes'

const { SET_USER, REMOVE_USER, SET_ERROR, REMOVE_ERROR } = authActionTypes

// SET USER ACTION

export const setUser = ({ uid, email, accessToken }) => ({
  type: SET_USER,
  user: {
    id: uid,
    email,
    token: accessToken
  }
})

// REMOVE USER ACTION

export const removeUser = () => ({
  type: REMOVE_USER
})

// REMOVE ERROR ACTION

export const removeError = () => ({
  type: REMOVE_ERROR
})

// SET ERROR ACTION

export const setError = (err) => ({
  type: SET_ERROR,
  errorCode: err.code
})

// LOGIN ACTION

export const loginUser = ({ email, password }) => (dispatch) => {
  const auth = getAuth()

  return login(auth, email, password)
    .then((data) => {
      const { uid } = data.user
      setToLocalStorage('user', { uid, email })
    })
    .catch((err) => {
      removeFromLocalStorage('user')
      dispatch(setError(err))
      console.error(err)
    })
}

// REGISTER ACTION

export const registerUser = ({ email, password }) => (dispatch) => {
  const auth = getAuth()

  return register(auth, email, password)
    .then((data) => {
      const { uid } = data.user
      setToLocalStorage('user', { uid, email })
    })
    .catch((err) => {
      removeFromLocalStorage('user')
      dispatch(setError(err))
      console.error(err)
    })
}

// LOGOUT ACTION

export const logoutUser = () => (dispatch) => {
  const auth = getAuth()

  return logout(auth)
    .then(() => {
      removeFromLocalStorage('user')
      dispatch(removeUser())
    })
    .catch((err) => {
      console.error(err)
    })
}
