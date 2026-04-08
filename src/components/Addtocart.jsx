import React from "react";
import { useCart } from "../contexts/CartContext"; // adjust path
import { useNavigate } from "react-router-dom";

const Addtocart = ({ product, quantity = 1 }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log("Adding to cart:", product); // debug
    addToCart(product, quantity);
    navigate("/cart"); // redirect to cart page
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 py-2 text-[#2F5965] border border-[#2F5965] hover:bg-gray-700 transition hover:text-white"
    >
      Add to Cart
    </button>
  );
};

export default Addtocart;
