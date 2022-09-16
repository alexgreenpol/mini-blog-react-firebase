import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getArticle, removeSingleArticle } from '../../redux/articles/articlesActions'
import { useAuth } from '../../hooks/use-auth'
import EditArticleForm from '../../components/EditArticleForm/EditArticleForm'

function EditArticlePage({ dispatchGetArticle, dispatchRemoveSingleArticle, article }) {
  const location = useLocation()
  const { isAuth } = useAuth()
  const { id } = location.state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatchGetArticle(id).then(() => {
      setLoading(false)
    })

    return () => {
      dispatchRemoveSingleArticle()
    }
  }, [dispatchGetArticle, dispatchRemoveSingleArticle, id])

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return 'Loading...'
  }

  if (article.title && article.text) {
    return (
      <>
        <h1>Edit Article</h1>
        <EditArticleForm article={article} />
      </>
    )
  }
}

EditArticlePage.propTypes = {
  dispatchGetArticle: PropTypes.func.isRequired,
  dispatchRemoveSingleArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.number
  }).isRequired
}

const mapStateToProps = (state) => ({
  article: state.articles.single
})

const mapDispatchToProps = (dispatch) => ({
  dispatchGetArticle: (id) => dispatch(getArticle(id)),
  dispatchRemoveSingleArticle: () => dispatch(removeSingleArticle())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage)
