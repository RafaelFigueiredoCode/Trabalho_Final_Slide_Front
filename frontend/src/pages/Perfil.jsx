import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Perfil() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await api.put(`/usuarios/me`, form);
      setMessage("Perfil atualizado com sucesso!");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao atualizar perfil");
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Perfil</h1>
          <button onClick={handleLogout} style={{
            padding: "6px 14px",
            backgroundColor: "#e53e3e",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          <input name="name" placeholder="Nome" onChange={handleChange} value={form.name} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} value={form.email} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <input name="password" type="password" placeholder="Nova senha" onChange={handleChange} value={form.password} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
