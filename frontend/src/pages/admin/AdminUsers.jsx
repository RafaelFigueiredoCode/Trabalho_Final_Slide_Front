import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const res = await api.get("/usuarios");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  }

  // Função para mudar o cargo do usuário
  async function handleRoleChange(user, newRole) {
    try {
      // O seu backend exige CPF no body? Se sim, passamos o u.cpf junto.
      // Se você atualizou o controller como sugerimos, só o role basta.
      await api.put(`/usuarios/${user.id}`, { 
        name: user.name,
        email: user.email,
        role: newRole 
      });
      
      fetchUsers(); // Recarrega a lista para mostrar o novo cargo
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao mudar cargo. Verifique as permissões.");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Deseja realmente remover este usuário?")) return;
    try {
      await api.delete(`/usuarios/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Erro ao excluir usuário.");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1a1a2e", marginBottom: "30px" }}>Gerenciar Usuários</h1>

      <div style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #edf2f7" }}>
            <tr>
              <th style={tdStyle}>Nome</th>
              <th style={tdStyle}>E-mail</th>
              <th style={tdStyle}>Cargo (Role)</th>
              <th style={tdStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: "center", padding: "40px" }}>Carregando usuários...</td></tr>
            ) : users.map(u => (
              <tr key={u.id} style={{ borderBottom: "1px solid #edf2f7" }}>
                <td style={tdStyle}><strong>{u.name}</strong></td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>
                  {/* Select para mudar o cargo na hora */}
                  <select 
                    value={u.role} 
                    onChange={(e) => handleRoleChange(u, e.target.value)}
                    style={{
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      backgroundColor: u.role === "admin" ? "#fef3c7" : "#e0e7ff",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    <option value="client">Client</option>
                    <option value="mod">Mod</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={tdStyle}>
                  <button 
                    onClick={() => deleteUser(u.id)}
                    style={{ backgroundColor: "transparent", color: "#ef4444", border: "none", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tdStyle = { padding: "15px", color: "#1e293b" };
