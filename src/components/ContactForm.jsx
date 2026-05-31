import React, { useState } from "react";
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";
import peacockMotif from "../assets/peacock-motif.jpg";

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

const fields = [
  { name: "firstName", placeholder: "First Name", required: true },
  { name: "lastName", placeholder: "Last Name" },
  { name: "email", placeholder: "Email", type: "email", required: true },
  { name: "phone", placeholder: "Contact Number", required: true },
];

const socials = [
  { icon: <FaWhatsapp />, link: "https://wa.me/919885866281" },
  { icon: <FaEnvelope />, link: "mailto:mamidi.artstore@gmail.com" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/mamidi___" },
];

const inputClass =
  "w-full rounded-md border border-[#3E5E14]/25 bg-white/55 px-4 py-3 text-sm text-[#1A2C08] placeholder:text-[#3E5E14]/45 transition-all duration-300 focus:border-[#C8A020] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A020]/25";

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
    <section id="contact" className="bg-[#3E5E14] px-5 py-20 sm:px-8 lg:py-28">
      <div
        data-reveal
        className="mx-auto max-w-3xl translate-y-5 rounded-3xl bg-[#F4EDDB] px-6 py-12 opacity-0 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-[#3E5E14]/10 transition-all duration-700 sm:px-12 sm:py-14"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="overflow-hidden rounded-2xl border border-[#C8A020]/40 bg-[#EFE6CE] shadow-md">
            <img
              src={peacockMotif}
              alt="Mamidi folk-art peacock illustration"
              className="h-28 w-auto object-cover sm:h-32"
            />
          </div>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C8A020]">
            Bespoke Gifting
          </p>
          <h2 className="mt-3 font-headline text-4xl leading-[1.02] text-[#1A2C08] sm:text-5xl">
            Make it <em>truly yours</em>
          </h2>
          <p className="mt-5 max-w-xl text-base font-light leading-8 text-[#3E5E14]/75">
            Have something to share, ask, or co-create? Reach out and we will
            respond with warmth, care, and clarity.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid gap-6 border-y border-[#3E5E14]/15 py-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center sm:text-left">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#3E5E14]/30 text-[11px] font-bold text-[#3E5E14] sm:mx-0">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="mt-3 text-sm font-bold text-[#1A2C08]">
                {step.title}
              </p>
              <p className="mt-1 text-xs font-light leading-6 text-[#3E5E14]/60">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              className={inputClass}
            />
          ))}

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            className={`${inputClass} sm:col-span-2`}
          />

          <button
            type="submit"
            className="rounded-md border-2 border-[#C8A020] bg-[#C8A020] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1A2C08] transition-all duration-300 hover:bg-transparent hover:text-[#8a6e15] sm:col-span-2"
          >
            Start a custom order
          </button>
        </form>

        {/* Socials */}
        <div className="mt-8 flex justify-center gap-3">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#3E5E14]/20 text-[#3E5E14] transition-all duration-300 hover:border-[#C8A020] hover:bg-[#C8A020]/10 hover:text-[#8a6e15]"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
