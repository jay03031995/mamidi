import React, { useState } from "react";
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";
import processImage from "../assets/bespoke-mamidi.jpg";

const steps = [
  {
    title: "Share Your Story",
    text: "Tell us the occasion, recipient, and ideas you have in mind.",
  },
  {
    title: "We Design for You",
    text: "Our artists shape a thoughtful concept for your feedback.",
  },
  {
    title: "Delivered with Love",
    text: "Your piece is handcrafted and packed with care.",
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

    const whatsappURL = `https://wa.me/919885866281?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section id="contact" className="bg-[#3E5E14]">
      <div className="grid min-h-[620px] lg:grid-cols-2">
        <div
          data-reveal
          className="group min-h-[300px] translate-y-5 overflow-hidden bg-[#1A2C08] opacity-0 transition-all duration-700 lg:min-h-full"
        >
          <img
            src={processImage}
            alt="Mamidi folk-art peacock illustration"
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-14">
          <div data-reveal className="translate-y-5 opacity-0 transition-all duration-700">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/55">
              Bespoke Gifting
            </p>
            <h2 className="mt-5 font-headline text-4xl leading-[0.98] text-[#FDFCF5] sm:text-5xl">
              Make it <br />
              <em>truly yours</em>
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-8 text-white/65">
              Have something to share, ask, or co-create? Reach out and we will
              respond with warmth, care, and clarity.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
                className="flex translate-y-5 gap-4 opacity-0 transition-all duration-700"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 text-[11px] font-bold text-white/75">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#FDFCF5]">{step.title}</p>
                  <p className="mt-1 text-xs font-light leading-6 text-white/50">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            data-reveal
            onSubmit={handleSubmit}
            className="mt-10 grid translate-y-5 grid-cols-1 gap-4 opacity-0 transition-all duration-700 sm:grid-cols-2"
          >
            {[
              { name: "firstName", placeholder: "First Name", required: true },
              { name: "lastName", placeholder: "Last Name" },
              { name: "email", placeholder: "Email", type: "email", required: true },
              { name: "phone", placeholder: "Contact Number", required: true },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-[#FDFCF5] placeholder:text-white/35 transition-all duration-300 focus:border-[#C8A020] focus:outline-none"
              />
            ))}

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-[#FDFCF5] placeholder:text-white/35 transition-all duration-300 focus:border-[#C8A020] focus:outline-none sm:col-span-2"
            />

            <button
              type="submit"
              className="border-2 border-[#C8A020] bg-[#C8A020] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1A2C08] transition-all duration-300 hover:bg-transparent hover:text-[#C8A020] sm:col-span-2"
            >
              Start a custom order
            </button>
          </form>

          <div
            data-reveal
            className="mt-8 flex translate-y-5 gap-3 opacity-0 transition-all duration-700"
          >
            {[
              { icon: <FaWhatsapp />, link: "https://wa.me/919885866281" },
              { icon: <FaEnvelope />, link: "mailto:mamidi.artstore@gmail.com" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/mamidi___" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#FDFCF5] transition-all duration-300 hover:border-[#C8A020] hover:bg-[#C8A020]/10 hover:text-[#C8A020]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
