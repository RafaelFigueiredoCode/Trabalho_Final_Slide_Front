import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Cálculo seguro: usa 'quantidade' (nome do seu backend) e trata valores nulos
  const itemCount = cart.reduce((sum, item) => sum + (Number(item.quantidade) || 0), 0);

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
      gap: "15px",
      padding: "12px 25px",
      backgroundColor: "#1a1a2e",
      color: "#fff",
      flexWrap: "wrap",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
    }}>
      <strong
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", fontSize: "1.2rem", color: "#fff", whiteSpace: "nowrap" }}
      >
        Slide Store
      </strong>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "5px", flex: 1, maxWidth: "400px", margin: "0 10px" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="O que você procura?"
          style={{ padding: "8px 12px", borderRadius: "4px", border: "none", flex: 1, outline: "none" }}
        />
        <button type="submit" style={{
          padding: "8px 15px",
          backgroundColor: "#e94560",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}>
          Buscar
        </button>
      </form>

      <div style={{ display: "flex", gap: "18px", marginLeft: "auto", alignItems: "center", whiteSpace: "nowrap" }}>
        {user?.role === "admin" && (
          <span onClick={() => navigate("/admin")} style={{ cursor: "pointer", color: "#f1c40f", fontWeight: "bold" }}>Admin</span>
        )}
        
        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Produtos</span>
        <span onClick={() => navigate("/marcas")} style={{ cursor: "pointer" }}>Marcas</span>
        
        <span onClick={() => navigate("/carrinho")} style={{ cursor: "pointer", fontWeight: "bold" }}>
          🛒 ({itemCount})
        </span>
        
        <span onClick={() => navigate("/perfil")} style={{ cursor: "pointer" }}>
          {user?.name ? `Olá, ${user.name.split(' ')[0]}` : "Perfil"}
        </span>

        <button onClick={handleLogout} style={{
          padding: "6px 15px",
          backgroundColor: "#e53e3e",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}>
          Sair
        </button>
      </div>
    </nav>
  );
}
