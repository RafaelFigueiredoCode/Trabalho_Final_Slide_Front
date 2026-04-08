import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MarcaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marca, setMarca] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/marcas/${id}`)
      .then((res) => setMarca(res.data.data))
      .catch((err) => console.error("Erro ao carregar marca:", err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => (res.data.data ?? []).filter((p) => p.marcaId === Number(id)))
      .then((prods) => setProdutos(prods));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!marca) return <p>Marca não encontrada.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/marcas")}>Voltar</button>
      <h1>{marca.name}</h1>
      {marca.yearCreate && <p>Fundação: {marca.yearCreate}</p>}
      {marca.phoneNumber && <p>Telefone: {marca.phoneNumber}</p>}

      <h2>Produtos</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto para esta marca.</p>
      ) : (
        <div>
          {produtos.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/products/${p.id}`)}
              style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "8px", cursor: "pointer" }}
            >
              <h3>{p.name}</h3>
              <p>R$ {Number(p.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
