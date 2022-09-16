import { darkmodeActionTypes } from './darkmodeActionTypes'

const { ON_DARKMODE, OFF_DARKMODE } = darkmodeActionTypes

// TURN ON DARKMOD ACTION

export const turnOnDarkmode = () => ({
  type: ON_DARKMODE
})

// TURN OFF DARKMODE ACTION

export const turnOffDarkmode = () => ({
  type: OFF_DARKMODE
})
