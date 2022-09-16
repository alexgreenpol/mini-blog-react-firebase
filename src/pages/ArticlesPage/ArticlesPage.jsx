import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useAuth } from '../../hooks/use-auth'
import { getUserArticles } from '../../redux/articles/articlesActions'
import ShortArticle from '../../components/ShortArticle/ShortArticle'

function ArticlesPage({ dispatchGetUserArticles, articles }) {
  const { isAuth, email } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatchGetUserArticles(email).then(() => {
      setLoading(false)
    })
  }, [dispatchGetUserArticles, email])

  const articlesCollection = articles.map((article) => (
    <ShortArticle
      id={article.id}
      title={article.title}
      text={article.text}
      timestamp={article.timestamp}
      email={article.email}
      key={article.id}
    />
  ))

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return 'Loading...'
  }

  return (
    <>
      <h1>Articles {email}</h1>
      <div className="posts">{articlesCollection}</div>
    </>
  )
}

ArticlesPage.propTypes = {
  dispatchGetUserArticles: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      timestamp: PropTypes.number
    })
  ).isRequired
}

const mapStateToProps = (state) => ({
  articles: state.articles.all
})

const mapDispatchToProps = (dispatch) => ({
  dispatchGetUserArticles: (email) => dispatch(getUserArticles(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage)
