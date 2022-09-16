import { commentsActionTypes } from './commentsActionTypes'

const {
  SET_COMMENTS,
  SET_COMMENT
} = commentsActionTypes

const initialState = {
  all: []
}

const comments = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        all: action.comments
      }
    case SET_COMMENT:
      return {
        ...state,
        all: [...state.all, action.comment]
      }
    default:
      return state
  }
}

export default comments
