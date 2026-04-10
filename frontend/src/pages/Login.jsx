import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/login", form);

      login(data.user, data.token);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex", flexDirection: "column", gap: "15px", padding: "30px",
        backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "350px"
      }}>
        <h2 style={{ textAlign: "center", color: "#1a1a2e" }}>Entrar na Slide Store</h2>
        
        <input 
          name="email" 
          type="email" 
          placeholder="E-mail" 
          onChange={handleChange} 
          required 
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} 
        />
        
        <input 
          name="password" 
          type="password" 
          placeholder="Senha" 
          onChange={handleChange} 
          required 
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} 
        />

        {error && <p style={{ color: "#e53e3e", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{
          padding: "12px", 
          backgroundColor: "#1a1a2e", 
          color: "#fff", 
          border: "none",
          borderRadius: "4px", 
          cursor: loading ? "not-allowed" : "pointer", 
          fontWeight: "bold"
        }}>
          {loading ? "Autenticando..." : "Entrar"}
        </button>
        
        <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
          Novo por aqui? <Link to="/register" style={{ color: "#e94560", fontWeight: "bold", textDecoration: "none" }}>Crie uma conta</Link>
        </p>
      </form>
    </div>
  );
}
