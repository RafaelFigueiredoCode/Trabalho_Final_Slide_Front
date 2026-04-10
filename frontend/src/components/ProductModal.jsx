import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductModal({
  isOpen,
  onClose,
  onSuccess,
  product,
  brands,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    storage: "",
    marcaId: "",
  });
  const [loading, setLoading] = useState(false);

  // Sincroniza os campos quando abre para editar ou criar novo
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        storage: product.storage || "",
        marcaId: product.marcaId || "",
      });
    } else {
      setForm({ name: "", price: "", storage: "", marcaId: "" });
    }
  }, [product, isOpen]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // GARANTIA DE TIPO: Converte para número para o Joi não dar erro 400
      const payload = {
        name: form.name,
        price: Number(form.price),
        storage: Number(form.storage),
        marcaId: Number(form.marcaId)
      };

      if (product) {
        await api.put(`/products/${product.id}`, payload);
      } else {
        await api.post("/products", payload);
      }

      onSuccess(); // Recarrega a lista no AdminProducts
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao salvar produto. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={{ color: "#1a1a2e", marginBottom: "20px" }}>
          {product ? "📦 Editar Produto" : "📦 Novo Produto"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={labelStyle}>Nome do Produto</label>
          <input
            style={inputStyle}
            placeholder="Ex: Teclado Mecânico"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                style={inputStyle}
                placeholder="0.00"
                value={form.price}
                required
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Estoque</label>
              <input
                type="number"
                style={inputStyle}
                placeholder="Qtd"
                value={form.storage}
                required
                onChange={(e) => setForm({ ...form, storage: e.target.value })}
              />
            </div>
          </div>

          <label style={labelStyle}>Marca</label>
          <select
            style={inputStyle}
            value={form.marcaId}
            required
            onChange={(e) => setForm({ ...form, marcaId: e.target.value })}
          >
            <option value="">Selecione uma marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button type="submit" disabled={loading} style={submitBtn}>
              {loading ? "Salvando..." : "Salvar Produto"}
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

// Estilos para o Modal (mesmo padrão do Reviews/Brands)
const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(26, 26, 46, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1200,
};

const modalStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "95%",
  maxWidth: "500px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const labelStyle = { fontSize: "0.85rem", fontWeight: "bold", color: "#444" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" };
const submitBtn = { flex: 2, padding: "12px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" };
const cancelBtn = { flex: 1, padding: "12px", backgroundColor: "#f0f2f5", color: "#555", border: "none", borderRadius: "6px", cursor: "pointer" };
