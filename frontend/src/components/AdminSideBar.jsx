import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#111",
        color: "white",
        padding: "2rem"
      }}
    >
      <h2>Painel de Admin</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/produtos">Produtos</Link>
        <Link to="/admin/marcas">Marcas</Link>
      </nav>
    </aside>
  );
}