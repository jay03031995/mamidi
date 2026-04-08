import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-[#72B1B5] px-4 md:px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="text-white text-xl font-bold">
          Mamidi
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg text-black">
          <Link to="/shop" className="hover:underline">SHOP</Link>
          <Link to="/contact" className="hover:underline">CONTACT</Link>
          <Link to="/about" className="hover:underline">ABOUT</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Desktop Login */}
          <Link
            to="/login"
            className="hidden md:block px-4 py-2 rounded-full bg-white text-[#385419] font-semibold shadow hover:shadow-md transition"
          >
            Login
          </Link>

          {/* Cart (VISIBLE ALWAYS) */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-white" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-black text-lg">

          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            SHOP
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            CONTACT
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            ABOUT
          </Link>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-full bg-white text-[#385419] font-semibold w-fit"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;