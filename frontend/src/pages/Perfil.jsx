import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Perfil() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.put(`/usuarios/${user.id}`, form);
      
      if (res.data.success) {
        setMessage("Perfil atualizado com sucesso!");
        setForm({ ...form, password: "" }); 
      }
    } catch (err) {
      const errMsg = err.response?.data?.errors 
        ? err.response.data.errors.join(" | ") 
        : (err.response?.data?.message || "Erro ao atualizar");
      setError(errMsg);
    }
  }

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "40px 20px", maxWidth: "500px", margin: "0 auto" }}>
        
        <div style={{ 
          backgroundColor: "#fff", 
          padding: "30px", 
          borderRadius: "8px", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ margin: 0, color: "#1a1a2e" }}>Seu Perfil</h1>
            <button onClick={logout} style={{ 
              padding: "6px 12px", 
              backgroundColor: "#e53e3e", 
              color: "#fff", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer",
              fontWeight: "bold"
            }}>
              Sair
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#555" }}>Nome Completo</label>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} 
            />
            
            <label style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#555" }}>E-mail</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} 
            />
            
            <label style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#555" }}>Nova Senha (opcional)</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Mínimo 3 caracteres" 
              value={form.password} 
              onChange={handleChange} 
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} 
            />
            
            {message && <p style={{ color: "#2d9d78", fontWeight: "bold", fontSize: "0.9rem", textAlign: "center" }}>{message}</p>}
            {error && <p style={{ color: "#e53e3e", fontSize: "0.85rem", fontWeight: "bold", textAlign: "center" }}>{error}</p>}
            
            <button type="submit" style={{ 
              padding: "12px", 
              backgroundColor: "#1a1a2e", 
              color: "#fff", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold",
              marginTop: "10px",
              fontSize: "1rem"
            }}>
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
