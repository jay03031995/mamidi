import React from "react";
import { useCart } from "../contexts/CartContext"; // adjust path
import { useNavigate } from "react-router-dom";

const Addtocart = ({ product, quantity = 1, className = "" }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart"); // redirect to cart page
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`inline-flex w-full flex-1 items-center justify-center whitespace-nowrap border border-[#1A2C08] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A2C08] transition-all duration-300 hover:bg-[#1A2C08] hover:text-[#FDFCF5] ${className}`}
    >
      Add to Cart
    </button>
  );
};

export default Addtocart;
