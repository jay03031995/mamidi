import React from "react";
import plateImage from "../assets/plate.jpg";
import { Link } from "react-router-dom";
const CollectionHighlight = () => {
  return (
    <section
      className="
        flex flex-col md:flex-row 
        items-center justify-center 
        gap-6 w-full 
        h-auto md:h-[492px] 
        px-4 py-10
      "
    >

      {/* Left Side */}
      <div
        className="
          relative flex items-center justify-center 
          bg-black 
          w-full md:w-[735px] 
          h-[300px] sm:h-[380px] md:h-[416px] 
          rounded-lg overflow-hidden
        "
      >
        <img
          src={plateImage}
          alt="Plate"
          className="w-full h-full object-cover"
        />

      <Link to="/shop" className="absolute px-5 py-2 " >
            <button
          className="
            p-2
            border border-black text-black 
            rounded bg-white/80 
            hover:bg-black hover:text-white transition
          "
        >
          Explore Collection
        </button>
      </Link>
      </div>

      {/* Right Side */}
      <div
        className="
          flex flex-col text-center md:text-left 
          bg-[#F5FDFF] p-5 
          justify-center rounded-lg shadow-sm 
          w-full md:w-[426px] 
          h-auto md:h-[416px]
        "
      >
        <h3 className="text-xl sm:text-2xl font-semibold mb-3">
          “Handpicked Favourites”
        </h3>

        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          Our collection is a celebration of the small joys in life — playful
          miniatures, colorful curios, and handcrafted details that turn
          everyday moments into something magical.
        </p>
      </div>

    </section>
  );
};

export default CollectionHighlight;
