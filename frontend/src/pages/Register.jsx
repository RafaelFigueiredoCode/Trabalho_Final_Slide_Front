import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input name="name" placeholder="Nome" onChange={handleChange} />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={handleChange}
      />
      <input name="cpf" placeholder="CPF" onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
      <a href="/login">Já tem conta? Entre</a>
    </form>
  );
}
