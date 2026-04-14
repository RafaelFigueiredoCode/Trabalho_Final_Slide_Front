import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <button 
          onClick={() => navigate("/home")} 
          style={{ 
            marginBottom: "20px", 
            cursor: "pointer", 
            border: "none", 
            background: "none", 
            fontWeight: "bold",
            color: "#1a1a2e"
          }}
        >
          ← Continuar Comprando
        </button>

        <div style={{ 
          backgroundColor: "#fff", 
          padding: "30px", 
          borderRadius: "12px", 
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)" 
        }}>
          <h1 style={{ marginBottom: "30px", color: "#1a1a2e", borderBottom: "2px solid #f0f2f5", paddingBottom: "10px" }}>
            Meu Carrinho
          </h1>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "#666", fontSize: "1.1rem" }}>Seu carrinho ainda está vazio.</p>
              <button 
                onClick={() => navigate("/")} 
                style={{ 
                  marginTop: "20px", 
                  padding: "10px 20px", 
                  backgroundColor: "#1a1a2e", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer" 
                }}
              >
                Ver Produtos
              </button>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    borderBottom: "1px solid #f0f2f5", 
                    padding: "20px 0", 
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>{item.nome}</h3>
                    <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
                      Unitário: R$ {Number(item.precoUnitario || 0).toFixed(2)}
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#1a1a2e" }}>
                      Total: R$ {Number(item.totalItem || 0).toFixed(2)}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "4px" }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                        style={{ padding: "5px 10px", border: "none", background: "none", cursor: "pointer" }}
                      >-</button>
                      <span style={{ padding: "0 10px", fontWeight: "bold", minWidth: "20px", textAlign: "center" }}>
                        {item.quantidade}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                        style={{ padding: "5px 10px", border: "none", background: "none", cursor: "pointer" }}
                      >+</button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: "#e53e3e", border: "none", background: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: "bold" }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ 
                marginTop: "30px", 
                padding: "20px", 
                textAlign: "right",
                backgroundColor: "#fcfcfc",
                borderRadius: "8px"
              }}>
                <h2 style={{ color: "#e94560", margin: "0 0 20px 0" }}>
                  Total: R$ {Number(subtotal || 0).toFixed(2)}
                </h2>
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <button 
                    onClick={clearCart} 
                    style={{ 
                      padding: "12px 20px", 
                      border: "1px solid #ddd", 
                      background: "#fff", 
                      borderRadius: "6px", 
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Limpar Tudo
                  </button>
                  <button 
                    style={{ 
                      padding: "12px 30px", 
                      backgroundColor: "#e94560", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "6px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                    onClick={() => alert("Pedido finalizado com sucesso!")}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
