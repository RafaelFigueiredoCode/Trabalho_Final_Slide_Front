import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "6px",
    backgroundColor: isActive(path) ? "#e94560" : "transparent",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: isActive(path) ? "bold" : "normal"
  });

  return (
    <aside
      style={{
        width: "260px",
        background: "#1a1a2e",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "40px", fontSize: "1.2rem", textAlign: "center", borderBottom: "1px solid #2e2e4e", paddingBottom: "20px" }}>
        🚀 Admin Panel
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/admin" style={linkStyle("/admin")}>
          <span>📊</span> Dashboard
        </Link>
        <Link to="/admin/produtos" style={linkStyle("/admin/produtos")}>
          <span>📦</span> Produtos
        </Link>
        <Link to="/admin/marcas" style={linkStyle("/admin/marcas")}>
          <span>🏷️</span> Marcas
        </Link>
        <Link to="/admin/usuarios" style={linkStyle("/admin/usuarios")}>
          <span>👥</span> Usuários
        </Link>

        <div style={{ marginTop: "40px", borderTop: "1px solid #2e2e4e", paddingTop: "20px" }}>
          <Link to="/home" style={{ ...linkStyle("/"), fontSize: "0.9rem", opacity: 0.8 }}>
            🏠 Voltar para a Loja
          </Link>
        </div>
      </nav>
    </aside>
  );
}
