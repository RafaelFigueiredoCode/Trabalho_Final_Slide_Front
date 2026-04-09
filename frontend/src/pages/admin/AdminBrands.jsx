import { useEffect, useState } from "react";
import api from "../../services/api";
import BrandModal from "../../components/BrandsModal";

export default function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function fetchBrands() {
    const res = await api.get("/marcas");
    setBrands(res.data.data);
  }

  async function deleteBrand(id) {
    await api.delete(`/marcas/${id}`);
    fetchBrands();
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div>
      <h1>Marcas</h1>

        <button
        onClick={() => {
          setSelectedBrand(null);
          setIsModalOpen(true);
        }}
      >
        Nova Marca
      </button>

      <table width="100%" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ano de Fundação</th>
            <th>Telefone de Contato</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {brands.map(brand => (
            <tr key={brand.id}>
              <td>{brand.name}</td>
              <td>{brand.yearCreate}</td>
              <td>{brand.phoneNumber}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedBrand(brand);
                    setIsModalOpen(true);
                  }}
                >
                  Editar
                </button>
            
                <button onClick={() => deleteBrand(brand.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <BrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchBrands}
        brand={selectedBrand}
        />
    </div>
  );
}