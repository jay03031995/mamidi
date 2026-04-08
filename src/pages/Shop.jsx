import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Addtocart from "../components/Addtocart";

import HeroBg from "../assets/hero.png";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import ProductsSection from "../components/ProductSection";

const Shop = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const products = [
    {
      _id: "1", // ⚠️ must match backend format (_id)
      img: HeroBg,
      title: "Mini Desktop Calendar",
      desc: "Hand-painted coloured Madhubani Motifs",
      price: "2000",
    },
    {
      _id: "2",
      img: Card1,
      title: "Calendar F",
      desc: "Creative monthly illustrations",
      price: "1800",
    },
    {
      _id: "3",
      img: Card2,
      title: "Artistic Calendar",
      desc: "Unique hand-drawn art with every month",
      price: "2200",
    },
  ];

  // ✅ Navigate to Product Detail
  const handleLearnMore = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <>
      <section className="w-full flex flex-col md:flex-row h-auto md:h-[612px]">

        {/* Left Section */}
        <div
          className="flex flex-col justify-between items-center px-6 pt-10 pb-6 md:px-12 md:pt-16 md:pb-10 w-full md:w-[1006px] relative min-h-[350px]"
          style={{
            backgroundImage: selected ? `url(${selected.img})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!selected ? (
            <div className="relative z-10 text-center max-w-[612px]">
              <h2 className="text-[32px] md:text-[48px] font-semibold mb-4 text-gray-900">
                Our Handpicked Favourites
              </h2>
              <p className="text-gray-700 text-[18px] md:text-[24px] font-medium mx-auto">
                Explore themed sets, seasonal picks, and timeless pieces loved by many.
              </p>
            </div>
          ) : (
            <div className="relative z-10 text-center md:text-start px-4 text-black w-full md:w-auto mt-auto">
              <h2 className="text-[28px] md:text-[26px] mt-5 mb-2">{selected.title}</h2>
              <p className="text-base md:text-lg mb-1">{selected.desc}</p>
              <p className="text-lg md:text-xl mb-3">₹{selected.price}</p>

              <div className="flex gap-3 justify-center md:justify-start">

                {/* ✅ SAME WORKING COMPONENT */}
                <Addtocart product={selected} quantity={1} />

                {/* ✅ Learn More */}
                <button
                  onClick={() => handleLearnMore(selected)}
                  className="px-5 py-2 bg-transparent border border-white text-black rounded-lg hover:bg-white hover:text-black transition"
                >
                  Learn More
                </button>

              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="bg-[#F5C745] flex justify-center md:items-start p-6 md:p-8 w-full md:w-[574px] h-auto md:h-[612px] overflow-y-auto no-scrollbar">
          <div className="flex flex-wrap md:flex-col gap-6 w-full justify-center items-center mt-4 md:mt-10">
            {products.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelected(item)}
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition w-[280px] md:w-[400px] h-[270px] md:h-[310px]"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[200px] md:h-[252px] object-cover"
                />
                <p className="text-center font-medium py-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <ProductsSection />
    </>
  );
};

export default Shop;