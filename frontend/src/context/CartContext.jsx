import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { token } = useAuth();

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await api.get('/carrinho');
      if (res.data.success) {
        setCart(res.data.data.itens || []);
        setSubtotal(res.data.data.subtotal || 0);
      }
    } catch (err) {
      console.error("Erro ao carregar carrinho", err);
      setCart([]);
      setSubtotal(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

const addToCart = async (produtoId, quantidade = 1) => {
  try {
    const res = await api.post('/carrinho/adicionar', { 
      produtoId: Number(produtoId), 
      quantidade: Number(quantidade) 
    });
    
    if (res.data.success) {
      await fetchCart();
    }
  } catch (err) {
    alert(err.response?.data?.message || err.response?.data?.error || "Erro");
  }
};

const updateQuantity = async (itemId, novaQuantidade) => {
  if (novaQuantidade < 1) return removeFromCart(itemId);
  
  const itemNoCarrinho = cart.find(i => i.id === itemId);
  
  try {
    await api.put(`/carrinho/item/${itemId}`, { 
      quantidade: Number(novaQuantidade),
      produtoId: Number(itemNoCarrinho?.produtoId) 
    });
    await fetchCart();
  } catch (err) {
    alert(err.response?.data?.message || "Erro ao atualizar");
  }
};


  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/carrinho/item/${itemId}`);
      await fetchCart();
    } catch (err) {
      console.error("Erro ao remover item", err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/carrinho/limpar');
      setCart([]);
      setSubtotal(0);
    } catch (err) {
      console.error("Erro ao limpar", err);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      subtotal, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      refreshCart: fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
