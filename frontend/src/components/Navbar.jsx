import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { cart, total } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(search)}`);
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 20px",
      backgroundColor: "#1a1a2e",
      color: "#fff",
      flexWrap: "wrap",
    }}>
      <strong
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", fontSize: "1.1rem", marginRight: "4px" }}
      >
        Slide Store
      </strong>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "4px", flex: 1, maxWidth: "300px" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produtos..."
          style={{ padding: "6px 10px", borderRadius: "4px", border: "none", flex: 1 }}
        />
        <button type="submit" style={{
          padding: "6px 12px",
          backgroundColor: "#e94560",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}>
          Buscar
        </button>
      </form>

      <div style={{ display: "flex", gap: "8px", marginLeft: "auto", alignItems: "center" }}>
        <span onClick={() => navigate("/produtos")} style={{ cursor: "pointer" }}>Produtos</span>
        <span onClick={() => navigate("/marcas")} style={{ cursor: "pointer" }}>Marcas</span>
        <span onClick={() => navigate("/carrinho")} style={{ cursor: "pointer" }}>
          Carrinho ({itemCount}) {total > 0 && `- R$ ${total.toFixed(2)}`}
        </span>
        <span onClick={() => navigate("/perfil")} style={{ cursor: "pointer" }}>Perfil</span>
        <button onClick={handleLogout} style={{
          padding: "4px 10px",
          backgroundColor: "#e53e3e",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}>
          Sair
        </button>
      </div>
    </nav>
  );
}
