import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductModal from "../../components/ProductModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProductsBrands() {
    const resP = await api.get("/products");
    setProducts(resP.data.data);
    const resB = await api.get("/marcas");
    setBrands(resB.data.data);
  };

  async function deleteProduct(id) {
    await api.delete(`/products/${id}`);
    fetchProductsBrands();
  }

  useEffect(() => {
    fetchProductsBrands();
  }, []);



  return (
    <div>
      <h1>Produtos</h1>

      <button
        onClick={() => {
          setSelectedProduct(null);
          setIsModalOpen(true);
        }}
      >
        Novo Produto
      </button>

      <table width="100%" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Marca</th>
            <th>Ações</th>

          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>R$ {product.price}</td>
              <td>{product.storage}</td>
              <td>{product.marca?.name}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => deleteProduct(product.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<ProductModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={fetchProductsBrands}
  product={selectedProduct}
  brands={brands}
/>
    </div>
  );
}
