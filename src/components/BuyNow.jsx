import React from "react";
import { useNavigate } from "react-router-dom";

const BuyNow = ({ productId, className = "" }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <button
      onClick={handleBuyNow}
      className={`flex-1 py-2 bg-[#2F5965] text-white hover:bg-gray-900 transition ${className}`}
    >
      Buy Now
    </button>
  );
};

export default BuyNow;
