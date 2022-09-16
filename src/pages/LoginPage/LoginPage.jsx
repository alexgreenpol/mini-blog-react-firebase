import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import LoginForm from '../../components/LoginForm/LoginForm'

function LoginPage() {
  const { isAuth } = useAuth()

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage
