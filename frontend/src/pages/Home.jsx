import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/produtos")
      .then((res) => setProdutos(res.data.data ?? []))
      .catch((err) => console.error("Erro ao carregar produtos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Produtos</h1>
      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {produtos.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/produtos/${p.id}`)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "200px",
                cursor: "pointer",
              }}
            >
              <h3>{p.name}</h3>
              <p>R$ {p.price?.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}