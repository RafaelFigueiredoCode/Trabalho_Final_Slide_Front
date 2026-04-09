import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ allowedRoles = []}) {
  const { token, user } = useAuth()

  if (!token) {
    return <Navigate to= '/login'/>
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ){
    return <Navigate to="/unauthorized" />
  }
  return token ? <Outlet /> : <Navigate to="/login" />
}