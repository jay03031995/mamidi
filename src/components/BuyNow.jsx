import React from "react";
import { useNavigate } from "react-router-dom";
import { getProductPath } from "../utils/productLinks";

const BuyNow = ({ product, productId, className = "" }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(getProductPath(product || { _id: productId }));
  };

  return (
    <button
      onClick={handleBuyNow}
      className={`inline-flex w-full flex-1 items-center justify-center whitespace-nowrap border border-[#C8A020] bg-[#C8A020] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A2C08] transition-all duration-300 hover:bg-transparent hover:text-[#C8A020] ${className}`}
    >
      Buy Now
    </button>
  );
};

export default BuyNow;
