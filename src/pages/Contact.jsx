import React, { useState } from "react";
import { Phone, Mail, Camera } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import { WHATSAPP_NUMBER, whatsappLink } from "../constants/site";

const CONTACT_INFO = [
  {
    icon: <Phone size={18} />,
    title: "Phone / WhatsApp",
    value: "+91 98858 66281",
    link: `tel:+${WHATSAPP_NUMBER}`,
  },
  {
    icon: <Mail size={18} />,
    title: "Email",
    value: "mamidi.artstore@gmail.com",
    link: "mailto:mamidi.artstore@gmail.com",
  },
  {
    icon: <Camera size={18} />,
    title: "Instagram",
    value: "@mamidi___",
    link: "https://www.instagram.com/mamidi___",
  },
];

const inputClass =
  "w-full rounded-lg border border-[#D8DEC4] bg-white px-4 py-3 text-sm text-[#1A2C08] outline-none transition focus:border-[#C8A020] focus:ring-2 focus:ring-[#C8A020]/20";

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

    const text = `🌸 *New Enquiry — Mamidi*

👤 ${form.firstName} ${form.lastName}
📧 ${form.email}
📞 ${form.phone}

📝 *Subject:* ${form.subject || "—"}

${form.message}`;

    // Universal wa.me link (works on mobile app + desktop web, no error popup)
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#fcfbe6] text-[#1A2C08]">
      <Seo
        title="Contact Mamidi — Custom Madhubani Orders & Enquiries"
        description="Get in touch with Mamidi for custom Madhubani art, bulk orders, and enquiries. Reach us on WhatsApp, email, or Instagram — handcrafted in India."
        path="/contact"
      />

      <div className="mx-auto max-w-5xl px-6 pt-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact" }]} />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* HEADING */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C8A020]">
            Get in touch
          </p>
          <h1 className="font-headline text-4xl leading-[1.02] text-[#1A2C08] md:text-5xl">
            Let's create something{" "}
            <em className="text-[#C8A020]">together</em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#556343] md:text-base">
            Questions, custom Madhubani orders, or bulk gifting — reach out and
            we'll respond with warmth, care, and clarity.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {CONTACT_INFO.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-[#E2DDC9] bg-white/70 px-5 py-6 text-center transition hover:-translate-y-1 hover:border-[#C8A020] hover:shadow-[0_14px_40px_rgba(26,44,8,0.08)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2C08] text-[#C8A020] transition group-hover:scale-105">
                {item.icon}
              </span>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8A9A6A]">
                {item.title}
              </p>
              <p className="text-sm font-medium text-[#1A2C08] group-hover:text-[#A88018]">
                {item.value}
              </p>
            </a>
          ))}
        </div>

        {/* FORM CARD */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#E2DDC9] bg-white p-6 shadow-[0_10px_40px_rgba(26,44,8,0.06)] md:p-10">
          <h2 className="mb-6 text-center font-headline text-2xl text-[#1A2C08]">
            Send us a message
          </h2>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <input
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
              className={inputClass}
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Tell us about your idea…"
              onChange={handleChange}
              required
              className={inputClass}
            />

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-[#0b3d1f] transition hover:bg-[#1ebe5a]"
            >
              <FaWhatsapp className="text-lg" />
              Send via WhatsApp
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-[#8A9A6A]">
            Tapping send opens WhatsApp with your message ready to go.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
