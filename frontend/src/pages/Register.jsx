import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
  });
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
      await api.post("/register", { ...form, role: "client" });
      alert("Cadastro realizado! Agora você pode fazer login.");
      navigate("/login");
    } catch (err) {
      const backendErrors = err.response?.data?.errors;
      const message = backendErrors 
        ? backendErrors.join(" | ") 
        : (err.response?.data?.message || "Erro ao cadastrar");
      
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex", flexDirection: "column", gap: "15px", padding: "30px",
        backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", color: "#1a1a2e" }}>Criar Conta</h2>
        
        <input name="name" placeholder="Nome Completo" onChange={handleChange} required 
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />
        
        <input name="email" type="email" placeholder="Seu melhor e-mail" onChange={handleChange} required 
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />
        
        <input name="password" type="password" placeholder="Senha (letras e números)" onChange={handleChange} required 
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />
        
        <input name="cpf" placeholder="CPF (11 dígitos)" onChange={handleChange} required 
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />

        {error && <p style={{ color: "#e53e3e", fontSize: "0.85rem", fontWeight: "bold" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{
          padding: "12px", backgroundColor: "#e94560", color: "#fff", border: "none",
          borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold"
        }}>
          {loading ? "Cadastrando..." : "Cadastrar Agora"}
        </button>
        
        <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
          Já tem conta? <Link to="/login" style={{ color: "#2563eb", fontWeight: "bold" }}>Entre aqui</Link>
        </p>
      </form>
    </div>
  );
}
