import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductModal from "../../components/ProductModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProductsBrands() {
    try {
      const [resP, resB] = await Promise.all([
        api.get("/products"),
        api.get("/marcas")
      ]);
      setProducts(resP.data.data || []);
      setBrands(resB.data.data || []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id) {
    if (!window.confirm("Deseja realmente excluir este produto?")) return;
    
    try {
      await api.delete(`/products/${id}`);
      fetchProductsBrands();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao excluir produto.");
    }
  }

  useEffect(() => {
    fetchProductsBrands();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#1a1a2e", margin: 0 }}>Gerenciar Estoque</h1>
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
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
        >
          + Novo Produto
        </button>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #edf2f7" }}>
            <tr>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Preço</th>
              <th style={thStyle}>Estoque</th>
              <th style={thStyle}>Marca</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>Sincronizando estoque...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>Nenhum produto cadastrado.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #edf2f7" }}>
                  <td style={tdStyle}><strong>{product.name}</strong></td>
                  <td style={tdStyle}>R$ {Number(product.price).toFixed(2)}</td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: "4px 8px", 
                      borderRadius: "4px", 
                      backgroundColor: product.storage > 0 ? "#dcfce7" : "#fee2e2",
                      color: product.storage > 0 ? "#166534" : "#991b1b",
                      fontSize: "0.85rem",
                      fontWeight: "bold"
                    }}>
                      {product.storage} un.
                    </span>
                  </td>
                  <td style={tdStyle}>{product.marca?.name || <em style={{color: '#ccc'}}>Sem marca</em>}</td>
                  <td style={tdStyle}>
                    <button
                      style={editBtn}
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      Editar
                    </button>
                    <button style={deleteBtn} onClick={() => deleteProduct(product.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProductsBrands}
        product={selectedProduct}
        brands={brands}
      />
    </div>
  );
}

const thStyle = { padding: "15px", color: "#475569", fontWeight: "bold" };
const tdStyle = { padding: "15px", color: "#1e293b" };
const editBtn = { padding: "6px 12px", marginRight: "8px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer" };
const deleteBtn = { padding: "6px 12px", backgroundColor: "#fee2e2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: "4px", cursor: "pointer" };
