import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import auth from './auth/authReducers.js'
import articles from './articles/articlesReducers.js'
import comments from './comments/commentsReducers.js'
import darkmode from './darkmode/darkmodeReducers.js'

const rootReducer = combineReducers({ auth, articles, comments, darkmode })
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
