import { v4 as uuidv4 } from 'uuid'
import { getFromLocalStorage } from './localStorageService'

export const prepareArticleComment = (text, target, articleId) => {
  if (!(text && articleId)) {
    return null
  }

  const timestamp = Date.now()
  const id = `comment-${uuidv4()}`
  const author = getFromLocalStorage('user').email

  return {
    id,
    articleId,
    author,
    text,
    target,
    timestamp
  }
}
