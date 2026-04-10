import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function MarcaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marca, setMarca] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Usando sua rota otimizada: GET /marcas/:id/produtos
    api.get(`/marcas/${id}/produtos`)
      .then((res) => {
        // No seu backend, essa rota retorna a marca com o array 'produtos' dentro
        setMarca(res.data.data);
        setProdutos(res.data.data.produtos ?? []);
      })
      .catch((err) => {
        console.error("Erro ao carregar detalhes da marca:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <p style={{ textAlign: "center", marginTop: "50px" }}>Carregando catálogo da marca...</p>
    </div>
  );

  if (!marca) return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <p style={{ textAlign: "center", marginTop: "50px" }}>Marca não encontrada.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        
        <button 
          onClick={() => navigate("/marcas")}
          style={{ marginBottom: "20px", cursor: "pointer", border: "none", background: "none", fontWeight: "bold" }}
        >
          ← Todas as Marcas
        </button>

        {/* Cabeçalho da Marca */}
        <div style={{ 
          backgroundColor: "#1a1a2e", 
          color: "#fff", 
          padding: "30px", 
          borderRadius: "12px", 
          marginBottom: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ margin: 0, fontSize: "2.5rem" }}>{marca.name}</h1>
          <div style={{ marginTop: "10px", opacity: 0.8 }}>
            {marca.yearCreate && <span>🗓 Fundada em {new Date(marca.yearCreate).getFullYear()}</span>}
            {marca.phoneNumber && <span style={{ marginLeft: "20px" }}>📞 {marca.phoneNumber}</span>}
          </div>
        </div>

        <h2 style={{ color: "#1a1a2e", marginBottom: "20px" }}>Produtos desta marca</h2>

        {produtos.length === 0 ? (
          <p>Esta marca ainda não possui produtos cadastrados.</p>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "20px" 
          }}>
            {produtos.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/produtos/${p.id}`)}
                style={{ 
                  backgroundColor: "#fff", 
                  padding: "20px", 
                  borderRadius: "8px", 
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <h3 style={{ margin: "0 0 10px 0" }}>{p.name}</h3>
                <p style={{ color: "#e94560", fontWeight: "bold", fontSize: "1.2rem" }}>
                  R$ {Number(p.price).toFixed(2)}
                </p>
                <span style={{ fontSize: "0.8rem", color: "#888" }}>Ver detalhes</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
