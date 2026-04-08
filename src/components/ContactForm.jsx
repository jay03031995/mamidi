import React, { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaInstagram } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit → WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, message } = formData;

    const text = `
Hello Mamidi,

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;

    const whatsappURL = `https://wa.me/916304492660?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section id="contact" className="bg-[#C9E8F3] px-4 md:px-8 py-12">
      
      {/* Heading */}
      <div className="flex justify-center">
        <div className="w-full md:w-[422px] text-center">
          <h3 className="text-[28px] md:text-[40px] font-[600] mb-3 text-gray-900">
            We’re Here to Listen
          </h3>
          <p className="mb-8 text-gray-700 text-[15px] md:text-[16px] font-[400]">
            Have something to share, ask, or co-create? Reach out and we’ll get
            back with warmth, care, and clarity.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side */}
        <div>
          <p className="text-sm mb-3 text-gray-600">You can reach us anytime</p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded w-full"
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded w-full"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded w-full"
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded md:col-span-2 w-full"
              rows="4"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-[#2D3E50] text-white py-2 px-6 rounded md:col-span-2 w-full hover:bg-[#1f2d3a] transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center w-full md:w-[510px]">
          
          <div className="bg-white/30 p-6 rounded-md shadow-md mb-6 text-center w-full max-w-[330px] flex justify-center items-center">
            <div className="w-full md:w-[195px]">
              <h4 className="font-bold text-gray-800 mb-2">MAMIDI</h4>
              <p className="text-gray-600 text-sm">
                “Where every print tells a story, and every page holds a piece of nature.”
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6">

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

            <a
              href="https://www.instagram.com/mamidi___?igsh=MTRmMnNreDd0bGJwcQ%3D%3D&utm_source=qr"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 shadow hover:bg-gray-100 transition"
            >
              <FaInstagram className="text-[#2D3E50]" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;