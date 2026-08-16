// src/context/CartContext.jsx
// SENTINEL: NB_SHOP_CART_CONTEXT_V2
//
// The cart. Held in React state, mirrored to localStorage under
// 'neonburro-cart' so it survives a reload and a trip to Stripe and back.
//
// ── why the initial state reads storage synchronously ───────────────────────
// This used to start as [] and load the saved cart in a useEffect, with a
// second useEffect saving the cart on every change. On a hard load the two
// effects ran in order on the same commit: load scheduled setCart(saved), then
// save ran with the still empty cart and wrote [] over the saved one. In
// production the re-render then wrote the real cart back, so it mostly worked
// with a brief window where storage was empty. Under React StrictMode in dev
// the effects run twice, the second load read the [] the first save had just
// written, and the cart was gone for good on every hard load of any page.
//
// It also meant any page whose first render checked "is the cart empty" saw
// an empty cart for one frame. Checkout does exactly that, and Stripe's
// stablecoin rail returns the shopper to /checkout/ with a HARD load. So the
// cart is now read once in the useState initialiser, before the first render,
// and there is only ever a save effect. No window, no double load, and the
// checkout page can trust the cart on its first render.
//
// Item identity is id plus the chosen size, tier and design, joined with '::'.
// The same product in two sizes is two lines.
//
// No oxford commas, no em dashes.

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'neonburro-cart';

const readSavedCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(readSavedCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage full or unavailable. The in memory cart still works for the
      // session, it just will not survive a reload.
    }
  }, [cart]);

  const createCartItemId = (product) => {
    const parts = [product.id];
    if (product.selectedSize) parts.push(product.selectedSize);
    if (product.selectedTier) parts.push(product.selectedTier);
    if (product.selectedDesign) parts.push(product.selectedDesign);
    return parts.join('::');
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const cartItemId = createCartItemId(product);

      const existingItem = prevCart.find((item) => createCartItemId(item) === cartItemId);

      if (existingItem) {
        return prevCart.map((item) =>
          createCartItemId(item) === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, cartItemId, quantity }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
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
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
};
