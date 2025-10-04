import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('neonburro-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('neonburro-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Create unique ID based on product + size + tier
      const uniqueId = `${product.id}-${product.selectedSize || 'default'}-${product.selectedTier || 'default'}`;
      
      const existingItem = prevCart.find(item => {
        const itemUniqueId = `${item.id}-${item.selectedSize || 'default'}-${item.selectedTier || 'default'}`;
        return itemUniqueId === uniqueId;
      });
      
      if (existingItem) {
        return prevCart.map(item => {
          const itemUniqueId = `${item.id}-${item.selectedSize || 'default'}-${item.selectedTier || 'default'}`;
          return itemUniqueId === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }
      
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
