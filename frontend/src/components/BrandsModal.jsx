import { useEffect, useState } from "react";
import api from "../services/api";

export default function BrandModal({ isOpen, onClose, onSuccess, brand }) {
  const [form, setForm] = useState({
    name: "",
    yearCreate: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (brand) {
      setForm({
        name: brand.name || "",
        yearCreate: brand.yearCreate || "",
        phoneNumber: brand.phoneNumber || ""
      });
    } else {
      setForm({ name: "", yearCreate: "", phoneNumber: "" });
    }
  }, [brand, isOpen]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (brand) {
        await api.put(`/marcas/${brand.id}`, form);
      } else {
        await api.post("/marcas", form);
      }
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao salvar marca.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={{ color: "#1a1a2e", marginBottom: "20px" }}>
          {brand ? "🏷️ Editar Marca" : "🏷️ Nova Marca"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={labelStyle}>Nome da Marca</label>
          <input
            style={inputStyle}
            placeholder="Ex: Samsung, Apple..."
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label style={labelStyle}>Data de Fundação</label>
          <input
            type="date" // Importante: Garante o formato YYYY-MM-DD para o Sequelize
            style={inputStyle}
            value={form.yearCreate}
            required
            onChange={(e) => setForm({ ...form, yearCreate: e.target.value })}
          />

          <label style={labelStyle}>Telefone de Contato</label>
          <input
            style={inputStyle}
            placeholder="(00) 00000-0000"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button type="submit" disabled={loading} style={submitBtn}>
              {loading ? "Salvando..." : brand ? "Atualizar Marca" : "Criar Marca"}
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

// Estilos consistentes com o Modal de Reviews
const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(26, 26, 46, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1100,
};

const modalStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "450px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const labelStyle = { fontSize: "0.85rem", fontWeight: "bold", color: "#444" };

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};

const submitBtn = {
  flex: 2,
  padding: "12px",
  backgroundColor: "#2563eb",
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
