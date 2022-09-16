import { articlesActionTypes } from './articlesActionTypes'
import {
  addPost,
  editPost,
  getPost,
  getPosts,
  getUserPosts,
  removePost
} from '../../api/firebase/crud'

const {
  SET_ARTICLES,
  SET_ARTICLE,
  REMOVE_ARTICLE,
  SET_SINGLE_ARTICLE,
  REMOVE_SINGLE_ARTICLE,
  EDIT_ARTICLE
} = articlesActionTypes

// GET ARTICLES ACTION

export const getArticlesAction = (articles) => ({ type: SET_ARTICLES, articles })
export const getArticles = () => (dispatch) =>
  getPosts()
    .then((articles) => dispatch(getArticlesAction(articles)))
    .catch((err) => console.error(err))

// GET USER ARTICLES ACTION

export const getUserArticlesAction = (articles) => ({ type: SET_ARTICLES, articles })
export const getUserArticles = (email) => (dispatch) =>
  getUserPosts(email)
    .then((articles) => dispatch(getUserArticlesAction(articles)))
    .catch((err) => console.error(err))

// GET ARTICLE ACTION

export const getArticleAction = (article) => ({ type: SET_SINGLE_ARTICLE, article })
export const getArticle = (id) => (dispatch) =>
  getPost(id)
    .then((article) => dispatch(getArticleAction(article)))
    .catch((err) => console.error(err))

// SET ARTICLES ACTION

export const setArticleAction = (article) => ({ type: SET_ARTICLE, article })
export const setArticle = (article) => (dispatch) =>
  addPost(article)
    .then(() => dispatch(setArticleAction(article)))
    .catch((err) => console.error(err))

// EDIT ARTICLE ACTION

export const editArticleAction = (article) => ({ type: EDIT_ARTICLE, article })
export const editArticle = (article) => (dispatch) =>
  editPost(article)
    .then(() => dispatch(editArticleAction(article)))
    .catch((err) => console.error(err))

// REMOVE ARTICLE ACTION

export const removeArticleAction = (id) => ({ type: REMOVE_ARTICLE, id })
export const removeArticle = (id) => (dispatch) =>
  removePost(id)
    .then(() => dispatch(removeArticleAction(id)))
    .catch((err) => console.error(err))

// REMOVE SINGLE ARTICLE ACTION

export const removeSingleArticle = () => ({
  type: REMOVE_SINGLE_ARTICLE
})
