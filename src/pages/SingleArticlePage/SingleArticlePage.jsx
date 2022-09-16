import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getArticle, removeSingleArticle } from '../../redux/articles/articlesActions'
import { getPostComments } from '../../redux/comments/commentsActions'
import { useAuth } from '../../hooks/use-auth'
import './SingleArticlePage.scss'
import ArticleComments from '../../components/ArticleComments/ArticleComments'

function SingleArticlePage({
  dispatchGetArticle,
  dispatchRemoveSingleArticle,
  dispatchGetComments,
  article,
  comments
}) {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const { isAuth } = useAuth()
  const { id } = location.state
  const { title, text } = article

  useEffect(() => {
    dispatchGetArticle(id).then(() => {
      dispatchGetComments(id).then(() => {
        setLoading(false)
      })
    })

    return () => {
      dispatchRemoveSingleArticle()
    }
  }, [dispatchGetArticle, dispatchGetComments, dispatchRemoveSingleArticle, id])

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return 'Loading...'
  }

  return (
    <div className="single-page">
      <h1>{title}</h1>
      <p>{text}</p>
      <h3>Comments</h3>
      <ArticleComments comments={comments} articleId={id} />
    </div>
  )
}

SingleArticlePage.propTypes = {
  dispatchGetArticle: PropTypes.func.isRequired,
  dispatchRemoveSingleArticle: PropTypes.func.isRequired,
  dispatchGetComments: PropTypes.func.isRequired,
  article: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.number
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      articleId: PropTypes.string,
      author: PropTypes.string,
      text: PropTypes.string,
      target: PropTypes.string,
      timestamp: PropTypes.number
    })
  ).isRequired
}

const mapStateToProps = (state) => ({
  article: state.articles.single,
  comments: state.comments.all
})

const mapDispatchToProps = (dispatch) => ({
  dispatchGetArticle: (id) => dispatch(getArticle(id)),
  dispatchRemoveSingleArticle: () => dispatch(removeSingleArticle()),
  dispatchGetComments: (articleId) => dispatch(getPostComments(articleId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticlePage)
