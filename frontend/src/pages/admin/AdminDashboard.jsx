import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cards = [
    { title: "Produtos", desc: "Gerenciar estoque e preços", path: "/admin/produtos", icon: "📦", color: "#2563eb" },
    { title: "Marcas", desc: "Adicionar e editar fabricantes", path: "/admin/marcas", icon: "🏷️", color: "#7c3aed" },
    { title: "Usuários", desc: "Controle de acessos e roles", path: "/admin/usuarios", icon: "👥", color: "#059669" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#1a1a2e", margin: 0 }}>Painel Administrativo</h1>
        <p style={{ color: "#666" }}>Bem-vindo de volta, <strong>{user?.name}</strong>. O que vamos gerenciar hoje?</p>
      </header>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "20px" 
      }}>
        {cards.map((card) => (
          <div 
            key={card.path}
            onClick={() => navigate(card.path)}
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              cursor: "pointer",
              borderLeft: `6px solid ${card.color}`,
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <span style={{ fontSize: "2rem" }}>{card.icon}</span>
            <h3 style={{ margin: "15px 0 5px 0", color: "#333" }}>{card.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#666", margin: 0 }}>{card.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: "40px", 
        padding: "20px", 
        backgroundColor: "#fff", 
        borderRadius: "12px",
        border: "1px dashed #ccc",
        textAlign: "center",
        color: "#888"
      }}>
        <p>Estatísticas de vendas e acessos em breve...</p>
      </div>
    </div>
  );
}
