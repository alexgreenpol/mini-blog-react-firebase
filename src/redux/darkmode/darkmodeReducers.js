import { darkmodeActionTypes } from './darkmodeActionTypes'

const { ON_DARKMODE, OFF_DARKMODE } = darkmodeActionTypes

const initialState = {
  isDarkmode: false
}

const darkmode = (state = initialState, action) => {
  switch (action.type) {
    case ON_DARKMODE:
      return {
        ...state,
        isDarkmode: true
      }
    case OFF_DARKMODE:
      return {
        ...state,
        isDarkmode: false
      }
    default:
      return state
  }
}

export default darkmode
