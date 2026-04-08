import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addToCart } = useCart();

  // Filters
  const [filterMarca, setFilterMarca] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [order, setOrder] = useState("asc");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    Promise.all([
      api.get("/products").catch(() => ({ data: { data: [] } })),
      api.get("/marcas").catch(() => ({ data: { data: [] } })),
    ]).then(([resP, resM]) => {
      setProdutos(resP.data.data ?? []);
      setMarcas(resM.data.data ?? []);
      setLoading(false);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filtered = produtos
    .filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()))
    .filter((p) => !filterMarca || p.marcaId === Number(filterMarca))
    .filter((p) => !minPrice || Number(p.price) >= Number(minPrice))
    .filter((p) => !maxPrice || Number(p.price) <= Number(maxPrice))
    .sort((a, b) => (order === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)));


  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <form onSubmit={handleSearch} style={{
          display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px",
          padding: "12px", background: "#f5f5f5", borderRadius: "8px", alignItems: "flex-end",
        }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.85rem" }}>
            Marca
            <select value={filterMarca} onChange={(e) => setFilterMarca(e.target.value)} style={{ padding: "6px", borderRadius: "1px" }}>
              <option value="">Todas</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "1px", fontSize: "1" }}>
            Preço mín.
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ padding: "1px", width: "80px", borderRadius: "1px" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "1px", fontSize: "1" }}>
            Preço máx.
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ padding: "1px", width: "80px", borderRadius: "1px" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "1px", fontSize: "1" }}>
            Ordenar
            <select value={order} onChange={(e) => setOrder(e.target.value)} style={{ padding: "1px", borderRadius: "1px" }}>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </label>
          <button type="submit" style={{
            padding: "6px 16px", backgroundColor: "#e94560", color: "#fff",
            border: "none", borderRadius: "1px", cursor: "pointer", height: "25px",
          }}>
            Filtrar
          </button>
        </form>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {filtered.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/produtos/${p.id}`)}
                style={{
                }}
              >
                <h3>{p.name}</h3>
                <p>R$ {Number(p.price).toFixed(2)}</p>
                {p.Marca && <p style={{ fontSize: "1", color: "#000" }}>{p.marca.name}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
