import React, { useState, useEffect } from "react";
import BuyNow from "./BuyNow";
const HeroSection = () => {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://mamidi-backend.onrender.com/api/products`);
        const result = await res.json();

        // ✅ Use the actual array inside "data"
        if (result && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          console.error("Unexpected response format:", result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Auto-slide every 8s
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0) {
    return (
      <section className="flex items-center justify-center h-[90vh] bg-gray-100">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </section>
    );
  }

  const activeProduct = products[activeIndex];
  const previewProducts = products.filter((_, i) => i !== activeIndex);

  return (
    <section
      className="relative w-full h-[90vh] sm:h-[100vh] md:h-[120vh] flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-10 bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${activeProduct.main})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#C9D9E4]/50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between w-full h-full">

        {/* Left Content */}
        <div className="max-w-lg text-center md:text-left transition-opacity duration-700 ease-in-out p-4 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-bold">{activeProduct.title}</h2>
          <p className="text-gray-800 my-4 text-sm sm:text-base px-2 sm:px-0">
            {activeProduct.description}
          </p>
          <p className="font-semibold">INR {activeProduct.price}</p>

          <BuyNow productId={activeProduct._id} className="p-4"/>
        </div>

        {/* Right Preview Cards */}
        <div className="flex gap-4 sm:gap-6 mt-6 md:mt-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {previewProducts.map((p, index) => (
            <div
              key={p._id || index}
              className="bg-white p-3 rounded-xl shadow-md cursor-pointer hover:scale-105 transition min-w-[100px] sm:min-w-fit"
              onClick={() => setActiveIndex(products.findIndex((i) => i._id === p._id))}
            >
              <img
                src={p.main}
                alt={p.title}
                className="w-[90px] sm:w-[120px] h-[120px] object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
