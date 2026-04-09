import { useEffect, useState } from "react";
import api from "../services/api";

export default function BrandModal({
  isOpen,
  onClose,
  onSuccess,
  brand
}) {
  const [form, setForm] = useState({
    name: "",
    yearCreate: "",
    phoneNumber: ""
  });

  useEffect(() => {
    if (brand) {
      setForm({
        name: brand.name,
        yearCreate: brand.yearCreate,
        phoneNumber: brand.phoneNumber
      });
    } else {
      setForm({
        name: "",
        yearCreate: "",
        phoneNumber: ""
      });
    }
  }, [brand]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (brand) {
      await api.put(`/marcas/${brand.id}`, form);
    } else {
      await api.post("/marcas", form);
    }

    onSuccess();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h2>
          {brand ? "Editar Marca" : "Nova Marca"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Ano de Fundação"
            value={form.yearCreate}
            onChange={(e) =>
              setForm({ ...form, yearCreate: e.target.value })
            }
          />

          <input
            placeholder="Telefone de Contato"
            value={form.phoneNumber}
            onChange={(e) =>
              setForm({ ...form, phoneNumber: e.target.value })
            }
          />

          <button type="submit">
            {brand ? "Salvar" : "Criar"}
          </button>

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
  justifyContent: "center"
};

const modal = {
  background: "white",
  padding: "2rem",
  borderRadius: "10px",
  minWidth: "400px"
};