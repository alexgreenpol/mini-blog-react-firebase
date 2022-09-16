import { useState } from 'react'
import PropTypes from 'prop-types'
import { generateDateFromTimestamp } from '../../helpers/generateDateFromTimestamp'
import Modal from '../Modal/Modal'
import NewCommentForm from '../NewCommentForm/NewCommentForm'
import './ArticleComments.scss'

function ArticleComments({ comments, articleId }) {
  const [replayTo, setReplayTo] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  let commentsMarkup

  const closeModal = () => {
    setIsVisible(false)
    setReplayTo(null)
  }

  const openModal = () => {
    setIsVisible(true)
  }

  const replyToBtnHandler = (author) => {
    setReplayTo(author)
    openModal()
  }

  if (comments.length) {
    commentsMarkup = comments.map((comment) => {
      const date = generateDateFromTimestamp(comment.timestamp)

      return (
        <div className="comments__item" key={comment.id}>
          <div className="comments__reply">{comment.target ? `Response on: ${comment.target}` : null}</div>
          <div className="comments__date">Date: {date}</div>
          <div className="comments__text">{comment.text}</div>
          <button
            type="button"
            className="btn btn--grey"
            onClick={() => {
              replyToBtnHandler(comment.text)
            }}
          >
            Reply to: {comment.author}
          </button>
        </div>
      )
    })
  } else {
    commentsMarkup = 'No comments here yet... You can be first :)'
  }

  return (
    <div className="comments">
      <div className="comments__holder">{commentsMarkup}</div>
      <Modal
        isVisible={isVisible}
        buttonText="Add new comment"
        modalTitle="Add new comment"
        openModal={openModal}
        closeModal={closeModal}
      >
        <NewCommentForm replyTo={replayTo} articleId={articleId} />
      </Modal>
    </div>
  )
}

ArticleComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      articleId: PropTypes.string,
      author: PropTypes.string,
      text: PropTypes.string,
      target: PropTypes.string,
      timestamp: PropTypes.number
    })
  ).isRequired,
  articleId: PropTypes.string.isRequired
}

export default ArticleComments
