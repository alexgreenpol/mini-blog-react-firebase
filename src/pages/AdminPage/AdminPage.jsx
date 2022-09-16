import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import AdminLayout from '../../layouts/AdminLayout/AdminLayout'

function AdminPage() {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  return <AdminLayout />
}

export default AdminPage
