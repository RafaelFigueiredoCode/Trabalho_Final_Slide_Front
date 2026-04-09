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
    marcaId: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        storage: product.storage,
        marcaId: product.marcaId,
      });
    } else {
      setForm({
        name: "",
        price: "",
        storage: "",
        marcaId: "",
      });
    }
  }, [product]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (product) {
      await api.put(`/products/${product.id}`, form);
    } else {
      await api.post("/products", form);
    }

    onSuccess();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h2>{product ? "Editar Produto" : "Novo Produto"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Preço"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <select
            value={form.marcaId}
            onChange={(e) => setForm({ ...form, marcaId: e.target.value })}
          >
            <option value="">Selecione uma marca</option>

            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Estoque"
            value={form.storage}
            onChange={(e) => setForm({ ...form, storage: e.target.value })}
          />

          <button type="submit">{product ? "Salvar" : "Criar"}</button>

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
