import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={Register } />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App