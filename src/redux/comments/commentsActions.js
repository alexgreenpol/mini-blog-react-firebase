import { commentsActionTypes } from './commentsActionTypes'
import {
  addComment,
  getComments
} from '../../api/firebase/crud'

const {
  SET_COMMENTS,
  SET_COMMENT
} = commentsActionTypes

// GET COMMENTS ACTION

export const getPostCommentsAction = (comments) => ({ type: SET_COMMENTS, comments })
export const getPostComments = (articleId) => (dispatch) =>
  getComments(articleId)
    .then((comments) => dispatch(getPostCommentsAction(comments)))
    .catch((err) => console.error(err))

// SET COMMENT ACTION

export const setCommentAction = (comment) => ({ type: SET_COMMENT, comment })
export const setComment = (comment) => (dispatch) =>
  addComment(comment)
    .then(() => dispatch(setCommentAction(comment)))
    .catch((err) => console.error(err))
