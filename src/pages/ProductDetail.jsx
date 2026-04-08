import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTruck, FaLock, FaMoneyBill } from "react-icons/fa"; // icons
import Addtocart from "../components/Addtocart";

const ProductDetail = () => {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showDesc, setShowDesc] = useState(false);
  const [showSpec, setShowSpec] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://mamidi-backend.onrender.com/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImg(data.main); // default image
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center py-16">Loading...</p>;

  return (
  <>
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Images */}
      <div className="flex flex-col md:flex-row gap-6 ">
         {/* Main Image */}
        <div className="flex-1">
          <img
            src={selectedImg}
            alt={product.title}
            className="w-[507px] h-[444px] object-cover rounded-md"
          />
        </div>
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4 h-[507px]">
          {[ product.sideimg1, product.sideimg2, product.sideimg3, product.sideimg4]
            .filter(Boolean)
            .map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumbnail-${idx}`}
                className={`w-24 h-24 object-cover border cursor-pointer rounded-md ${
                  selectedImg === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedImg(img)}
              />
            ))}
        </div>

       
      </div>

      {/* Right: Product Info */}
      <div>
        <h1 className="text-[24px] font-[600] mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-3 text-[12px] font-[400]">
          Featuring the alphabets of each month and their essence.
        </p>
        <p className="text-[24px] font-[500] text-gray-900 mb-4">
          ₹{product.price}
        </p>

        {/* Features */}
        <div className="flex items-center gap-8 mb-6">
          <div className="flex flex-col items-center text-gray-700 p-3 border-r-[0.5px]">
            <FaMoneyBill size={24} />
            <span className="text-sm mt-1">Cash on Delivery</span>
          </div>
          <div className="flex flex-col items-center text-gray-700 p-3 border-r-[0.5px]">
            <FaTruck size={24} />
            <span className="text-sm mt-1">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center text-gray-700 ">
            <FaLock size={24} />
            <span className="text-sm mt-1">Secure Payments</span>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded-lg"
          >
            -
          </button>
          <span className="px-4 py-1 ">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 bg-[#20373B] rounded-lg text-white"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-10 w-[200px]">
  
           <Addtocart product={product} quantity={1} />
        </div>


      </div>
   
    </div>
     <div className="flex flex-col mx-auto p-6 w-[1160px]">
                  {/* Accordion: Description */}
        <div className="border-t border-b">
          <button
            className="w-full flex justify-between items-center  font-medium p-4"
            onClick={() => setShowDesc(!showDesc)}
          >
            Description  <span>{showDesc ? "-" : "+"}</span>
          </button>
          {showDesc && (
            <p className="pb-4 text-gray-600">{product.description}</p>
          )}
        </div>

        {/* Accordion: Specification */}
        <div className="border-b">
          <button
            className="w-full flex justify-between items-center p-4 font-medium"
            onClick={() => setShowSpec(!showSpec)}
          >
            Specification <span>{showSpec ? "-" : "+"}</span>
          </button>
          {showSpec && (
            <ul className="pb-4 text-gray-700 space-y-1">
              <li><strong>Occasion:</strong> {product.Occasion}</li>
              <li><strong>Type:</strong> {product.Type}</li>
              <li><strong>Material:</strong> {product.Material}</li>
              <li><strong>Colour:</strong> {product.Colour}</li>
              <li><strong>Dimensions:</strong> {product.Dimensions}</li>
              <li><strong>Pages:</strong> {product.Pages}</li>
              <li><strong>Print:</strong> {product.Print}</li>
            </ul>
          )}
        </div>
    </div>
  </>
  );
};

export default ProductDetail;
