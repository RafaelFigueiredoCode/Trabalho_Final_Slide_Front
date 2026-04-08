import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();
  

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")}>Voltar</button>
      <h1>Carrinho</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "8px" }}>
              <h3>{item.name}</h3>
              <p>R$ {Number(item.price).toFixed(2)} × {item.quantity} = R$ {(Number(item.price) * item.quantity).toFixed(2)}</p>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ marginLeft: "4px" }}>+</button>
              <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "8px", color: "red" }}>Remover</button>
            </div>
          ))}
          <p><strong>Total: R$ {total.toFixed(2)}</strong></p>
          <button onClick={clearCart}>Limpar carrinho</button>
        </div>
      )}
    </div>
  );
}
