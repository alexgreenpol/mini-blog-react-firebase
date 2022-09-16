import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useAuth } from '../../hooks/use-auth'
import { getArticles } from '../../redux/articles/articlesActions'
import ShortArticle from '../../components/ShortArticle/ShortArticle'

function HomePage({ dispatchGetArticles, articles }) {
  const { isAuth } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatchGetArticles().then(() => {
      setLoading(false)
    })
  }, [dispatchGetArticles])

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
    <div className="home-page">
      <h1>Homepage</h1>
      <div className="posts">{articlesCollection}</div>
    </div>
  )
}

HomePage.propTypes = {
  dispatchGetArticles: PropTypes.func.isRequired,
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
  dispatchGetArticles: () => dispatch(getArticles())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
