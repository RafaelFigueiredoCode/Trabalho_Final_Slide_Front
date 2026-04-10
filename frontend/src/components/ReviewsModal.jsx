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

  useEffect(() => {
    if (review) {
      setForm({
        rate: review.rate || "",
        comments: review.comments || ""
      });
    } else {
      setForm({
        rate: "",
        comments: ""
      });
    }
  }, [review]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (review) {
        await api.put(`/reviews/${review.id}`, form);
      } else {
        await api.post("/reviews", {...form, produtoId});
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  if (!isOpen) return null;

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h2>{review ? "Editar Avaliação" : "Nova Avaliação"}</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={form.rate}
            onChange={(e) =>
              setForm({ ...form, rate: e.target.value === "" ? "" : Number(e.target.value) })
            }
          >
            <option value="">Avalie o produto</option>
            <option value="1">1 </option>
            <option value="2">2 </option>
            <option value="3">3 </option>
            <option value="4">4 </option>
            <option value="5">5 </option>
          </select>

          <input
            placeholder="Adicione um comentário (opcional)"
            value={form.comments}
            onChange={(e) =>
              setForm({ ...form, comments: e.target.value })
            }
          />

          <button type="submit">Enviar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "white",
  padding: "2rem",
  borderRadius: "10px",
  minWidth: "400px",
};