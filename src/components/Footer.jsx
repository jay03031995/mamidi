import React from "react";
import { FaWhatsapp, FaEnvelope, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#519CAB] text-center px-6 py-10 text-gray-900 fredoka">

      {/* Brand */}
      <h4 className="font-medium text-2xl md:text-[28px]">MAMIDI</h4>

      {/* Main Nav */}
      <div className="flex flex-wrap justify-center gap-4 md:space-x-8 md:gap-0 mt-3 font-medium">
        <a href="/shop" className="hover:underline text-[16px] md:text-[18px]">SHOP</a>
        <a href="/about" className="hover:underline text-[16px] md:text-[18px]">ABOUT</a>
        <a href="/contact" className="hover:underline text-[16px] md:text-[18px]">CONTACT</a>
      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-4 w-full md:w-11/12 mx-auto" />

      {/* Secondary Nav */}
      {/* <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm mb-6">
        <a href="/shop" className="hover:underline">SHOP</a>
        <a href="/about" className="hover:underline">ABOUT</a>
        <a href="/contact" className="hover:underline">CONTACT</a>
      </div> */}

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-6">
       
           <a
  href="https://wa.me/916304492660"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 shadow hover:bg-gray-100 transition"
>
  <FaWhatsapp className="text-[#2D3E50]" />
</a>

<a
  href="mailto:mamidi.artstore@gmail.com"
  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 shadow hover:bg-gray-100 transition"
>
  <FaEnvelope className="text-[#2D3E50]" />
</a>
            <a href="https://www.instagram.com/mamidi___?igsh=MTRmMnNreDd0bGJwcQ%3D%3D&utm_source=qr" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 shadow hover:bg-gray-100 transition">
              <FaInstagram className="text-[#2D3E50]" />
            </a>
      </div>

      {/* Bottom Links */}
      {/* <div className="flex flex-wrap justify-center items-center text-sm text-gray-900 gap-2 mb-2">
        <a href="#privacy" className="hover:underline">Privacy Policy</a>
        <span className="hidden md:block">·</span>
        <a href="#terms" className="hover:underline">Terms & Conditions</a>
      </div> */}

{/* Copyright */}
<p className="text-xs md:text-sm">
  © 2025 Mamidi. All rights reserved.{" "}
  <span className="mx-1">|</span>
  Powered by{" "}
  <a
    href="https://genesisvirtue.com"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-gray-300 transition"
  >
    Genesis Virtue
  </a>
</p>
    </footer>
  );
};

export default Footer;
