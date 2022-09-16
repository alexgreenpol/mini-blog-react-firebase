import { articlesActionTypes } from './articlesActionTypes'

const {
  SET_ARTICLE,
  SET_ARTICLES,
  REMOVE_ARTICLE,
  SET_SINGLE_ARTICLE,
  REMOVE_SINGLE_ARTICLE,
  EDIT_ARTICLE
} = articlesActionTypes

const initialState = {
  all: [],
  single: {}
}

const articles = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        all: action.articles
      }
    case SET_ARTICLE:
      return {
        ...state,
        all: [...state.all, action.article]
      }
    case REMOVE_ARTICLE: {
      const filteredArticles = state.all.filter((article) => article.id !== action.id)
      return {
        ...state,
        all: filteredArticles
      }
    }

    case SET_SINGLE_ARTICLE:
      return {
        ...state,
        single: action.article
      }
    case REMOVE_SINGLE_ARTICLE:
      return {
        ...state,
        single: {}
      }
    case EDIT_ARTICLE:
      return {
        ...state,
        all: state.all.map((item) => {
          if (item.id === action.article.id) {
            return action.article
          }
          return item
        })
      }
    default:
      return state
  }
}

export default articles
