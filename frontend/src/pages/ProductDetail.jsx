import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import ReviewsModal from "../components/ReviewsModal";

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

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")}>Voltar</button>

      <h1>{produto.name}</h1>
      <p>Preço: R$ {Number(produto.price).toFixed(2)}</p>

      {produto.storage !== undefined && (
        <p>Estoque: {produto.storage}</p>
      )}

      {produto.Marca && (
        <p>Marca: {produto.Marca.name}</p>
      )}

      <button onClick={() => addToCart(produto)}>
        Adicionar ao carrinho
      </button>

      <button onClick={() => setIsModalOpen(true)}>
        Avalie o Produto
      </button>

<h2>Avaliações</h2>

{produto.review?.length > 0 ? (
  produto.review.map((r) => (
    <div key={r.id}>
    <strong>{r.usuario?.name || "Usuário"}</strong>
      <p>{r.rate} </p>
      <p>{r.comments}</p>
    </div>
  ))
) : (
  <p>Este produto ainda não possui avaliações.</p>
)}

      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProduct}
        produtoId={produto.id}
      />
    </div>
  );
}