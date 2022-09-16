import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

function RegistrationPage() {
  const { isAuth } = useAuth()

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="registration-page">
      <h1>Registration Page</h1>
      <RegisterForm />
    </div>
  )
}

export default RegistrationPage
