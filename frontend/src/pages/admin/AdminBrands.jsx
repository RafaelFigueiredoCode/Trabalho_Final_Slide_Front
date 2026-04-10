import { useEffect, useState } from "react";
import api from "../../services/api";
import BrandModal from "../../components/BrandsModal";

export default function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchBrands() {
    try {
      const res = await api.get("/marcas");
      setBrands(res.data.data || []);
    } catch (err) {
      console.error("Erro ao carregar marcas", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBrand(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta marca? Isso pode afetar os produtos vinculados.")) return;
    
    try {
      await api.delete(`/marcas/${id}`);
      fetchBrands();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao excluir marca. Verifique se ela possui produtos cadastrados.");
    }
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#1a1a2e", margin: 0 }}>Gerenciar Marcas</h1>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => {
            setSelectedBrand(null);
            setIsModalOpen(true);
          }}
        >
          + Nova Marca
        </button>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #edf2f7" }}>
            <tr>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Ano de Fundação</th>
              <th style={thStyle}>Telefone</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>Carregando...</td></tr>
            ) : brands.map(brand => (
              <tr key={brand.id} style={{ borderBottom: "1px solid #edf2f7" }}>
                <td style={tdStyle}><strong>{brand.name}</strong></td>
                <td style={tdStyle}>{brand.yearCreate ? new Date(brand.yearCreate).getFullYear() : "-"}</td>
                <td style={tdStyle}>{brand.phoneNumber || "N/A"}</td>
                <td style={tdStyle}>
                  <button
                    style={editBtn}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setIsModalOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button style={deleteBtn} onClick={() => deleteBrand(brand.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchBrands}
        brand={selectedBrand}
      />
    </div>
  );
}

const thStyle = { padding: "15px", color: "#475569", fontWeight: "bold" };
const tdStyle = { padding: "15px", color: "#1e293b" };
const editBtn = { padding: "6px 12px", marginRight: "8px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer" };
const deleteBtn = { padding: "6px 12px", backgroundColor: "#fee2e2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: "4px", cursor: "pointer" };
