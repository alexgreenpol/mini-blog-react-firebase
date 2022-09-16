import { v4 as uuidv4 } from 'uuid'
import { getFromLocalStorage } from './localStorageService'

export const prepareArticleObject = (title, text) => {
  if (!(title && text)) {
    return null
  }

  const timestamp = Date.now()
  const id = `post-${uuidv4()}`
  const { email } = getFromLocalStorage('user')

  return {
    id,
    email,
    title,
    text,
    timestamp
  }
}
