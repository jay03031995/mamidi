import React, { createContext, useContext, useState } from "react";
import { getProductStock, isPurchasableProduct } from "../data/shopCatalog";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add to Cart
  const addToCart = (product, quantity = 1) => {
    if (!isPurchasableProduct(product)) return;
    const stock = getProductStock(product);
    const requestedQuantity = stock === null ? quantity : Math.min(quantity, stock);
    if (requestedQuantity <= 0) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        const nextQuantity =
          stock === null
            ? existing.quantity + requestedQuantity
            : Math.min(stock, existing.quantity + requestedQuantity);

        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: nextQuantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: requestedQuantity }];
      }
    });
  };

  // ✅ Update Quantity
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id !== id) return item;

        const stock = getProductStock(item);
        const quantity = stock === null ? newQuantity : Math.min(newQuantity, stock);
        return { ...item, quantity: Math.max(1, quantity) };
      })
    );
  };

  // ✅ Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
export const useCart = () => useContext(CartContext);
