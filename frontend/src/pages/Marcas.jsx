import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/marcas")
      .then((res) => setMarcas(res.data.data ?? []))
      .catch((err) => console.error("Erro ao carregar marcas:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#1a1a2e", margin: 0 }}>Nossas Marcas</h1>
          <button 
            onClick={() => navigate("/")}
            style={{ 
              padding: "8px 16px", 
              backgroundColor: "#fff", 
              border: "1px solid #ddd", 
              borderRadius: "4px", 
              cursor: "pointer",
              fontWeight: "bold" 
            }}
          >
            ← Ver Produtos
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#666" }}>Carregando parceiros...</p>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
            gap: "20px" 
          }}>
            {marcas.length === 0 ? (
              <p style={{ gridColumn: "1/-1", textAlign: "center" }}>Nenhuma marca encontrada.</p>
            ) : (
              marcas.map((m) => (
                <div
                  key={m.id}
                  onClick={() => navigate(`/marcas/${m.id}`)}
                  style={{ 
                    backgroundColor: "#fff", 
                    padding: "25px", 
                    borderRadius: "8px", 
                    cursor: "pointer", 
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s, boxShadow 0.2s",
                    border: "1px solid #eee"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                  }}
                >
                  <h3 style={{ margin: "0 0 15px 0", color: "#e94560", fontSize: "1.4rem" }}>
                    {m.name}
                  </h3>
                  
                  <div style={{ fontSize: "0.9rem", color: "#555" }}>
                    {m.yearCreate && (
                      <p style={{ margin: "5px 0" }}>
                        🗓 <strong>Desde:</strong> {new Date(m.yearCreate).getFullYear()}
                      </p>
                    )}
                    {m.phoneNumber && (
                      <p style={{ margin: "5px 0" }}>
                        📞 <strong>Contato:</strong> {m.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div style={{ 
                    marginTop: "20px", 
                    fontSize: "0.8rem", 
                    color: "#2563eb", 
                    fontWeight: "bold",
                    textAlign: "right" 
                  }}>
                    Ver catálogo →
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
