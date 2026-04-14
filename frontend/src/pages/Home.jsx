import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filterMarca, setFilterMarca] = useState(searchParams.get("marca") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "asc");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    api.get("/marcas")
      .then((res) => setMarcas(res.data.data ?? []))
      .catch(() => setMarcas([]));
  }, []);

  useEffect(() => {
    const qFromUrl = searchParams.get("q") || "";
    setQuery(qFromUrl);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    
    const params = {
      q: searchParams.get("q") || undefined,
      marca: filterMarca || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      order: order
    };

    api.get("/products", { params })
      .then((res) => setProdutos(res.data.data ?? []))
      .catch(() => setProdutos([]))
      .finally(() => setLoading(false));
      
  }, [searchParams, filterMarca, minPrice, maxPrice, order]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ 
      q: query, 
      marca: filterMarca, 
      minPrice, 
      maxPrice, 
      order 
    });
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Barra de Filtros */}
        <form onSubmit={handleSearch} style={{
          display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px",
          padding: "20px", background: "#fff", borderRadius: "8px", 
          alignItems: "flex-end", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
            Marca
            <select value={filterMarca} onChange={(e) => setFilterMarca(e.target.value)} 
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}>
              <option value="">Todas as marcas</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
            Preço Mín.
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} 
              style={{ padding: "8px", width: "100px", borderRadius: "4px", border: "1px solid #ddd" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
            Preço Máx.
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} 
              style={{ padding: "8px", width: "100px", borderRadius: "4px", border: "1px solid #ddd" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
            Ordenar por
            <select value={order} onChange={(e) => setOrder(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </label>

          <button type="submit" style={{
            padding: "10px 20px", backgroundColor: "#1a1a2e", color: "#fff",
            border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold"
          }}>
            Aplicar Filtros
          </button>
        </form>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>Buscando produtos...</p>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "20px" 
          }}>
            {produtos.length === 0 ? (
              <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>Nenhum produto encontrado.</p>
            ) : (
              produtos.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/produtos/${p.id}`)}
                  style={{
                    background: "#fff", padding: "20px", borderRadius: "8px", 
                    cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <h3 style={{ margin: "0 0 10px 0", color: "#1a1a2e" }}>{p.name}</h3>
                  <p style={{ fontSize: "1.2rem", color: "#e94560", fontWeight: "bold", margin: "0 0 5px 0" }}>
                    R$ {Number(p.price).toFixed(2)}
                  </p>
                  {p.marca && (
                    <span style={{ 
                      fontSize: "0.75rem", backgroundColor: "#f0f2f5", 
                      padding: "4px 8px", borderRadius: "12px", color: "#666" 
                    }}>
                      {p.marca.name}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
