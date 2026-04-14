import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Marcas from "./pages/Marcas.jsx";
import MarcaDetail from "./pages/MarcaDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Perfil from "./pages/Perfil.jsx";
import AdminPage from "./pages/admin/AdminDashboard.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminBrands from "./pages/admin/AdminBrands.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/carrinho" element={<Cart />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} /> 
        <Route path="/produtos/:id" element={<ProductDetail />} />
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/marcas/:id" element={<MarcaDetail />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="produtos" element={<AdminProducts />} />
          <Route path="marcas" element={<AdminBrands />} />
          <Route path="usuarios" element={<AdminUsers />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
