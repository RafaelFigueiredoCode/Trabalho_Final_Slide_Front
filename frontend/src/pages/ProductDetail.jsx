import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduto(res.data.data))
      .catch((err) => console.error("Erro ao carregar produto:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")}>Voltar</button>
      <h1>{produto.name}</h1>
      <p>Preço: R$ {Number(produto.price).toFixed(2)}</p>
      {produto.storage !== undefined && <p>Estoque: {produto.storage}</p>}
      {produto.Marca && <p>Marca: {produto.Marca.name}</p>}
      <button onClick={() => addToCart(produto)}>Adicionar ao carrinho</button>
    </div>
  );
}
