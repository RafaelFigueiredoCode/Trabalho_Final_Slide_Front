import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import ReviewsModal from "../components/ReviewsModal";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchProduct() {
    try {
      const res = await api.get(`/products/${id}`);
      setProduto(res.data.data);
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <p style={{ textAlign: "center", marginTop: "50px" }}>Buscando detalhes...</p>
    </div>
  );

  if (!produto) return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <p style={{ textAlign: "center", marginTop: "50px" }}>Produto não encontrado.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <button 
          onClick={() => navigate("/home")} 
          style={{ 
            marginBottom: "20px", 
            cursor: "pointer", 
            border: "none", 
            background: "none", 
            fontWeight: "bold",
            color: "#1a1a2e"
          }}
        >
          ← Voltar para a Galeria
        </button>

        <div style={{ 
          background: "#fff", 
          padding: "30px", 
          borderRadius: "12px", 
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)" 
        }}>
          <h1 style={{ margin: "0 0 10px 0", color: "#1a1a2e" }}>{produto.name}</h1>
          
          {produto.marca && (
            <span style={{ 
              backgroundColor: "#f0f2f5", 
              padding: "5px 12px", 
              borderRadius: "20px", 
              fontSize: "0.9rem",
              color: "#666" 
            }}>
              Marca: <strong>{produto.marca.name}</strong>
            </span>
          )}

          <p style={{ 
            fontSize: "2rem", 
            color: "#e94560", 
            fontWeight: "bold", 
            margin: "25px 0 10px 0" 
          }}>
            R$ {Number(produto.price).toFixed(2)}
          </p>

          <p style={{ color: "#444" }}>
            Unidades disponíveis: <strong>{produto.storage}</strong>
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
            <button 
              onClick={() => addToCart(produto.id, 1)}
              style={{ 
                padding: "12px 25px", 
                backgroundColor: "#e94560", 
                color: "#fff", 
                border: "none", 
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              Adicionar ao Carrinho
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ 
                padding: "12px 25px", 
                backgroundColor: "#fff", 
                color: "#1a1a2e", 
                border: "2px solid #1a1a2e", 
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Escrever Avaliação
            </button>
          </div>
        </div>

        <div style={{ marginTop: "40px" }}>
          <h2 style={{ color: "#1a1a2e", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
            O que dizem sobre este produto
          </h2>

          {produto.review && produto.review.length > 0 ? (
            produto.review.map((r) => (
              <div key={r.id} style={{ 
                backgroundColor: "#fff", 
                padding: "20px", 
                borderRadius: "8px", 
                marginTop: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.02)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <strong style={{ color: "#1a1a2e" }}>{r.usuario?.name || "Cliente Satisfeito"}</strong>
                  <span style={{ color: "#f1c40f" }}>{"★".repeat(r.rate)}</span>
                </div>
                {r.comments ? (
                  <p style={{ fontStyle: "italic", color: "#555", margin: 0 }}>"{r.comments}"</p>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#555", margin: 0 }}></p>
                )}
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
              Ninguém avaliou ainda. Compre e seja o primeiro!
            </p>
          )}
        </div>

        <ReviewsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchProduct}
          produtoId={produto.id}
        />
      </div>
    </div>
  );
}
