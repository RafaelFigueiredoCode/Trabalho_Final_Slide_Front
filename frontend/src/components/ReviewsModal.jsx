import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReviewsModal({
  isOpen,
  onClose,
  onSuccess,
  review,
  produtoId
}) {
  const [form, setForm] = useState({
    rate: "",
    comments: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (review) {
      setForm({
        rate: review.rate || "",
        comments: review.comments || ""
      });
    } else {
      setForm({ rate: "", comments: "" });
    }
  }, [review, isOpen]); // Reseta quando abre/fecha

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.rate) return alert("Por favor, selecione uma nota.");
    
    setLoading(true);
    try {
      // Garante que o rate seja número e o produtoId também
      const payload = { 
        ...form, 
        rate: Number(form.rate), 
        produtoId: Number(produtoId) 
      };

      if (review) {
        await api.put(`/reviews/${review.id}`, payload);
      } else {
        await api.post("/reviews", payload);
      }

      onSuccess(); // Recarrega os detalhes do produto
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao salvar avaliação");
      console.log("te achei!");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={{ color: "#1a1a2e", marginBottom: "20px" }}>
          {review ? "⭐ Editar Avaliação" : "⭐ Nova Avaliação"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Sua Nota:</label>
          <select
            style={inputStyle}
            value={form.rate}
            required
            onChange={(e) => setForm({ ...form, rate: e.target.value })}
          >
            <option value="">Selecione de 1 a 5 estrelas</option>
            <option value="1">1 Estrela - Muito Ruim</option>
            <option value="2">2 Estrelas - Ruim</option>
            <option value="3">3 Estrelas - Regular</option>
            <option value="4">4 Estrelas - Bom</option>
            <option value="5">5 Estrelas - Excelente</option>
          </select>

          <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Seu Comentário:</label>
          <textarea
            placeholder="O que você achou deste produto?"
            style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
            value={form.comments}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit" disabled={loading} style={submitBtn}>
              {loading ? "Enviando..." : review ? "Atualizar" : "Publicar Avaliação"}
            </button>
            <button type="button" onClick={onClose} style={cancelBtn}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Estilos consistentes com a Slide Store
const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(26, 26, 46, 0.8)", // Azul escuro da marca com transparência
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "450px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "1rem",
  fontFamily: "inherit",
};

const submitBtn = {
  flex: 2,
  padding: "12px",
  backgroundColor: "#e94560",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

const cancelBtn = {
  flex: 1,
  padding: "12px",
  backgroundColor: "#f0f2f5",
  color: "#555",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
