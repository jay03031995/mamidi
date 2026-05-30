import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Calendar", href: "/shop?category=calender" },
      { label: "Play & Bond", href: "/shop?category=play-and-bond" },
      { label: "Sustainable Picks", href: "/shop?category=sustainable-picks" },
      { label: "Handpaper Envelopes", href: "/shop?category=handpaper-envelopes" },
     

    ],
  },
  {
    title: "Help",
    links: [
      { label: "Custom Orders", href: "/contact" },
      { label: "Shipping Info", href: "/contact" },
      { label: "Returns Policy", href: "/contact" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Artists", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#1A2C08] text-[#FDFCF5]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div>
            <div className="font-headline text-3xl tracking-[0.04em]">
              MAMIDI<span className="text-[#C8A020]">.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm font-light leading-7 text-white/40">
              Where every print tells a story, and every page holds a piece of
              nature. Art handcrafted with love from India.
            </p>

            <div className="mt-7 flex gap-3">
              {[
                { icon: <FaWhatsapp />, link: "https://wa.me/919885866281" },
                { icon: <FaEnvelope />, link: "mailto:mamidi.artstore@gmail.com" },
                {
                  icon: <FaInstagram />,
                  link: "https://www.instagram.com/mamidi___?igsh=MTRmMnNreDd0bGJwcQ%3D%3D&utm_source=qr",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-all duration-300 hover:border-[#C8A020] hover:bg-[#C8A020]/10 hover:text-[#C8A020]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/25">
                {column.title}
              </h4>
              <ul className="grid gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm font-light text-white/45 transition-colors duration-300 hover:text-[#FDFCF5]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 py-6 text-[11px] uppercase tracking-[0.12em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Mamidi. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://genesisvirtue.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A88018] transition-colors duration-300 hover:text-[#C8A020]"
            >
              Genesis Virtue
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
