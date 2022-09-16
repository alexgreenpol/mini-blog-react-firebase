import { authActionTypes } from './authActionTypes'

const { SET_USER, REMOVE_USER, SET_ERROR, REMOVE_ERROR } = authActionTypes

const initialState = {
  id: '',
  email: '',
  token: '',
  errorCode: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user
      }
    case REMOVE_USER:
      return {
        ...state,
        id: '',
        email: '',
        token: ''
      }
    case SET_ERROR:
      return {
        ...state,
        errorCode: action.errorCode
      }
    case REMOVE_ERROR:
      return {
        ...state,
        errorCode: ''
      }
    default:
      return state
  }
}

export default auth
