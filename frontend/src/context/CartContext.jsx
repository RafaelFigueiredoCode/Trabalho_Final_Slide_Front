import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(produto) {
    setCart(prev => {
      const existing = prev.find(item => item.id === produto.id);
      if (existing) {
      if(existing.quantity < produto.storage){
        return prev;
      }
        return prev.map(item =>
          item.id === produto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...produto, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

function updateQuantity(id, quantity) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }

  setCart(prev =>
    prev.map(item => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantity: Math.min(quantity, item.storage)
      };
    })
  );
}

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
