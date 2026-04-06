import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/marcas")
      .then((res) => setMarcas(res.data.data ?? []))
      .catch((err) => console.error("Erro ao carregar marcas:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")}>Voltar</button>
      <h1>Marcas</h1>

      {marcas.length === 0 ? (
        <p>Nenhuma marca encontrada.</p>
      ) : (
        <div>
          {marcas.map((m) => (
            <div
              key={m.id}
              onClick={() => navigate(`/marcas/${m.id}`)}
              style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "8px", cursor: "pointer" }}
            >
              <h3>{m.name}</h3>
              {m.yearCreate && <p>Fundação: {m.yearCreate}</p>}
              {m.phoneNumber && <p>Telefone: {m.phoneNumber}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
