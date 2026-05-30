import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* TOP STRIP */}
      <div className="flex items-center justify-center gap-3 overflow-hidden bg-[#1A2C08] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[10px]">
        <span>Eco-friendly packaging every order</span>

        <span className="hidden text-[#C8A020] sm:inline">
          Free shipping above Rs. 999
        </span>

        <Link
          to="/contact"
          className="hidden underline-offset-4 hover:underline md:inline"
        >
          Custom orders open
        </Link>
      </div>

      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 border-b border-[#D8DEC4] bg-[#F6F4EC] transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* LEFT NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4A5E30] transition hover:text-[#C8A020]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="font-headline text-[28px] tracking-[0.04em] text-[#1A2C08] transition hover:text-[#A88018] sm:text-[32px]"
          >
            MAMIDI<span className="text-[#C8A020]">.</span>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              to="/contact"
              className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-[#4A5E30] transition hover:text-[#C8A020] md:inline"
            >
              Contact
            </Link>

            <Link
              to="/login"
              className="hidden border border-[#1A2C08] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A2C08] transition hover:bg-[#1A2C08] hover:text-white lg:inline-flex"
            >
              Login
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="relative inline-flex text-[#1A2C08]"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-[20px]" />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C8A020] px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8DEC4] bg-white text-[#1A2C08] transition hover:bg-[#1A2C08] hover:text-white md:hidden"
            >
              {menuOpen ? (
                <HiX className="text-[24px]" />
              ) : (
                <HiOutlineMenuAlt3 className="text-[24px]" />
              )}
            </button>
          </div>
        </div>

        {/* OVERLAY */}
        <div
          onClick={closeMenu}
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />

        {/* MOBILE MENU */}
        <div
          className={`fixed right-0 top-0 z-50 h-screen w-[78%] max-w-[320px] bg-[#F6F4EC] shadow-2xl transition-transform duration-300 md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* TOP */}
          <div className="flex items-center justify-between border-b border-[#D8DEC4] px-5 py-5">
            <Link
              to="/"
              onClick={closeMenu}
              className="font-headline text-2xl text-[#1A2C08]"
            >
              MAMIDI<span className="text-[#C8A020]">.</span>
            </Link>

            <button
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8DEC4]"
            >
              <HiX className="text-[22px] text-[#1A2C08]" />
            </button>
          </div>

          {/* LINKS */}
          <nav className="flex flex-col px-5 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="border-b border-[#E5E5E5] py-4 text-[15px] font-semibold uppercase tracking-[0.12em] text-[#1A2C08] transition hover:text-[#C8A020]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-6 flex items-center justify-center rounded-lg bg-[#1A2C08] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#C8A020]"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;