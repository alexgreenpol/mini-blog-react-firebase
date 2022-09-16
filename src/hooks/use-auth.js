import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { id, email, token } = useSelector((state) => state.auth)

  return {
    id,
    email,
    token,
    isAuth: !!email
  }
}
