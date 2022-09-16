import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeArticle } from '../../redux/articles/articlesActions'
import { generateDateFromTimestamp } from '../../helpers/generateDateFromTimestamp'

import './ShortArticle.scss'

function ShortArticle({ id, title, text, timestamp, email, dispatchRemoveArticle }) {
  const navigate = useNavigate()
  const date = generateDateFromTimestamp(timestamp)

  const removeBtnHandler = (articleId) => {
    dispatchRemoveArticle(articleId)
  }

  const editBtnHandler = (articleId) => {
    const route = `/admin/edit-article/${articleId}`
    navigate(route, { state: { id: articleId, email } })
  }

  const openBtnHandler = (articleId) => {
    const route = `/article/${articleId}`
    navigate(route, { state: { id: articleId, email } })
  }

  return (
    <div className="post" id={id}>
      <h3 className="post__title">{title}</h3>
      <p className="post__text">{text}</p>
      <div className="post__meta">
        <div className="post__email">User: {email}</div>
        <div className="post__date">Date: {date}</div>
      </div>
      <div className="post__control">
        <button
          type="button"
          className="btn btn--open"
          onClick={() => {
            openBtnHandler(id)
          }}
        >
          Open
        </button>
        <button
          type="button"
          className="btn btn--edit"
          onClick={() => {
            editBtnHandler(id)
          }}
        >
          Edit post
        </button>
        <button
          type="button"
          className="btn btn--remove"
          onClick={() => {
            removeBtnHandler(id)
          }}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

ShortArticle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  dispatchRemoveArticle: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveArticle: (id) => dispatch(removeArticle(id))
})

export default connect(null, mapDispatchToProps)(ShortArticle)
