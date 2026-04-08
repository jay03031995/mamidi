import React, { useState } from "react";
import { Phone, Mail, Camera } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "916304492660";

    const text = `📩 *New Contact Message*

👤 Name: ${form.firstName} ${form.lastName}
📧 Email: ${form.email}
📞 Phone: ${form.phone}

📝 Subject: ${form.subject}

💬 Message:
${form.message}`;

    const encodedText = encodeURIComponent(text);

    const appLink = `whatsapp://send?phone=${whatsappNumber}&text=${encodedText}`;
    const webLink = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.location.href = appLink;

    setTimeout(() => {
      window.open(webLink, "_blank");
    }, 1500);
  };

  return (
    <div className="bg-[#F5FDFF] text-gray-800">
      <section className="py-8 px-4 sm:px-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          CONTACT US
        </h1>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-6 md:space-y-0 mb-10">

          {/* Phone */}
          <div className="text-center group cursor-pointer">
            <h3 className="font-semibold text-base sm:text-lg flex items-center justify-center gap-2">
              <Phone size={18} className="text-[#1d4e56]" />
              PHONE
            </h3>
            <a
              href="tel:+916304492660"
              className="text-sm sm:text-base text-blue-600 group-hover:underline"
            >
              +91 6304492660
            </a>
          </div>

          {/* Email */}
          <div className="text-center group cursor-pointer">
            <h3 className="font-semibold text-base sm:text-lg flex items-center justify-center gap-2">
              <Mail size={18} className="text-[#1d4e56]" />
              EMAIL
            </h3>
            <a
              href="mailto:mamidi.artstore@gmail.com"
              className="text-sm sm:text-base text-blue-600 group-hover:underline"
            >
              mamidi.artstore@gmail.com
            </a>
          </div>

          {/* Instagram */}
          <div className="text-center group cursor-pointer">
            <h3 className="font-semibold text-base sm:text-lg flex items-center justify-center gap-2">
              <Camera size={18} className="text-[#1d4e56]" />
              INSTAGRAM
            </h3>
            <a
              href="https://www.instagram.com/mamidi___"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-blue-600 group-hover:underline"
            >
              @mamidi___
            </a>
          </div>

        </div>

        <hr className="border-gray-300 mb-10" />

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-[#f0f7f8] p-6 sm:p-8 rounded-lg shadow-sm">
          <h2 className="text-center text-base sm:text-lg font-semibold mb-6">
            Send Us A Message
          </h2>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="border p-2 rounded w-full text-sm sm:text-base"
                onChange={handleChange}
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded w-full text-sm sm:text-base"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="border p-2 rounded w-full text-sm sm:text-base"
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="border p-2 rounded w-full text-sm sm:text-base"
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="subject"
              type="text"
              placeholder="Subject"
              className="border p-2 rounded w-full text-sm sm:text-base"
              onChange={handleChange}
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Message"
              className="border p-2 rounded w-full text-sm sm:text-base"
              onChange={handleChange}
              required
            ></textarea>

            <button
              type="submit"
              className="bg-[#1d4e56] text-white px-6 py-2 rounded hover:bg-[#163c42] w-full sm:w-fit mx-auto transition"
            >
              Send Message on WhatsApp
            </button>
          </form>

          <p className="text-center text-green-600 text-sm mt-4">
            After clicking, tap <strong>Send</strong> on WhatsApp to complete.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;