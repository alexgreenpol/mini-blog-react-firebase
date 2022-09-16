import { Navigate } from 'react-router-dom'
import NewArticleForm from '../../components/NewArticleForm/NewArticleForm'
import { useAuth } from '../../hooks/use-auth'

function AddArticlePage() {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <h1>New Article</h1>
      <NewArticleForm />
    </>
  )
}

export default AddArticlePage
