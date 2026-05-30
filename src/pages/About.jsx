import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo";
import hero from "/banner.jpg";
import pic3 from "../assets/img.jpeg";
import pic4 from "/about.jpeg";
import pic5 from "../assets/g4.jpeg";
import pic1 from "../assets/p8.jpeg";
import pic2 from "../assets/g1.jpeg";
import pic6 from "../assets/g2.jpeg";
import vdo1 from "/vid.mp4";
import vdo2 from "/vid2.mp4";
import { useNavigate } from "react-router-dom";


const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const About = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const touchStartX = useRef(0);
const navigate = useNavigate();
  const gallery = [
    { img: pic1, title: "Sketch", desc: "Every design begins by hand, slowly taking form." },
    { img: pic2, title: "Process", desc: "Refining details with care and patience." },
    { img: pic3, title: "Inspiration", desc: "Moments from nature that spark each idea." },
    { img: pic4, title: "Sketch", desc: "Every design begins by hand, slowly taking form." },
    { img: pic5, title: "Process", desc: "Refining details with care and patience." },
    { img: pic6, title: "Inspiration", desc: "Moments from nature that spark each idea." }
  ];

  const close = () => setSelectedIndex(null);
  const next = () => setSelectedIndex((prev) => (prev + 1) % gallery.length);
  const prev = () => setSelectedIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  return (
    <div className="bg-[#fcfbe6] text-gray-900">
      <Seo
        title="About Mamidi — Madhubani (Mithila) Folk Art Studio"
        description="Mamidi is a studio reviving Madhubani (Mithila) folk art — the centuries-old painting tradition of Bihar — through hand-painted calendars, keepsakes and gifts made in India."
        path="/about"
      />

      {/* HERO */}
      <div
        className="relative h-[260px] md:h-[380px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <motion.div {...fadeUp}
className="relative border border-white/20 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-2xl text-center shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
          <h1 className="text-3xl text-white font-semibold" style={{ fontFamily: "Playfair Display" }}>
            Our Story
          </h1>
          <p className="text-sm text-white/60 mt-1">Home / Our Story</p>
        </motion.div>
      </div>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-24">

{/* MISSION */}
<motion.div {...fadeUp} className="grid md:grid-cols-2 gap-12 items-center">
  <video
    src={vdo1}
    autoPlay
    muted
    loop
    playsInline
    className="rounded-xl shadow-md h-[320px] w-full object-cover"
  />

  <div>
    <h2 className="text-3xl font-semibold mb-4">
      Bringing nature’s poetry into everyday moments
    </h2>

    <p className="text-gray-600 leading-relaxed">
      At Mamidi, we believe beauty does not need to be loud to be meaningful.
      It exists quietly — in the veins of a leaf, in the texture of handmade paper,
      and in the stillness of moments we often overlook.
    </p>

    <p className="text-gray-600 mt-4 leading-relaxed">
      Our creations are an invitation to slow down — to reconnect with nature,
      with creativity, and with yourself. Each piece is designed to carry a sense
      of calm, warmth, and quiet joy into your everyday life.
    </p>

    <p className="text-[#3a5419] mt-4 font-medium">
      Because sometimes, the smallest details hold the deepest meaning.
    </p>
  </div>
</motion.div>


{/* STORY */}
<motion.div {...fadeUp} className="grid md:grid-cols-2 gap-12 items-center">
  <div>
    <h2 className="text-3xl font-semibold mb-4">Our story</h2>

    <p className="text-gray-600 leading-relaxed italic">
      “Every story begins with a moment of realization…”
    </p>

    <p className="text-gray-600 mt-4 leading-relaxed">
      We realized we had creative souls yearning to share beauty with the world.
      Welcome to <span className="font-medium text-gray-800">Mamidi</span> — where
      ancient art meets everyday elegance.
    </p>

    <p className="text-gray-600 mt-4 leading-relaxed">
      Our hands craft the timeless beauty of Madhubani art and the spontaneous
      magic of freehand sketches, bringing nature’s stories to life. From nostalgic
      glimpses of childhood gardens to mythological tales that have inspired
      generations — we paint memories that feel both personal and timeless.
    </p>

    <p className="text-gray-600 mt-4 leading-relaxed">
      Because art isn’t meant to hang on walls alone. It’s meant to live with you,
      inspire you, and remind you that beauty belongs everywhere.
    </p>

    <p className="text-gray-700 mt-4 font-medium">
      Mamidi — Spreading art, spreading joy, one creation at a time. ✨
    </p>

<div className="mt-6 flex flex-wrap gap-4">
  {/* Primary CTA */}
  <button
    onClick={() => navigate("/shop")}
    className="bg-[#3a5419] text-white px-4 py-3 rounded-lg font-medium shadow-sm hover:bg-[#3a5419] transition-all duration-300"
  >
   Ready to make your world more beautiful?
  </button>

  {/* Secondary CTA */}
  <button
    onClick={() => navigate("/shop")}
    className="border border-[#3a5419] text-[#3a5419] px-6 py-3 rounded-lg font-medium hover:bg-[#3a5419] hover:text-white transition-all duration-300"
  >
    Explore Collection
  </button>
</div>
  </div>

  <video
    src={vdo2}
    autoPlay
    muted
    loop
    playsInline
    className="rounded-xl shadow-md h-[320px] w-full object-cover"
  />
</motion.div>

      </section>

      {/* WHY */}
      <section className="py-20 px-4 bg-[#E2F2CF]">
        <h2 className="text-4xl font-semibold text-center mb-16">
          Why Our Story Blooms Differently
        </h2>

        <div className="grid md:grid-cols-3 gap-10 items-center max-w-6xl mx-auto">

          <div className="space-y-10 text-center md:text-right">
            <p><strong>Rooted in Nature</strong><br />Inspired by real elements.</p>
            <p><strong>Hand-Touched Originals</strong><br />Crafted by hand first.</p>
            <p><strong>Crafted with Purpose</strong><br />Designed with intention.</p>
          </div>

          <img src={pic3} className="rounded-2xl shadow-lg" />

          <div className="space-y-10 text-center md:text-left">
            <p><strong>Inspired by Culture</strong><br />Reflecting tradition.</p>
            <p><strong>Seasonal Soul</strong><br />Aligned with nature.</p>
            <p><strong>Your Story, Our Canvas</strong><br />Made personal.</p>
          </div>

        </div>
      </section>

      {/* ✨ CRAFT PROCESS (RESTORED) */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-semibold mb-4">
            Our Craft Process
          </h2>

          <h3 className="text-xl font-semibold mb-3">
            From Paper to Product—Every Step Tells a Story
          </h3>

          <p className="text-gray-600 leading-relaxed">
            At the heart of everything we create is a process that honors time,
            intention, and tradition. Each piece begins in a quiet corner of our studio—
            often with a warm cup of chai, a sketchbook, and a mind tuned into the rhythms of nature.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="text-center">
          <img src={pic4} className="rounded-xl shadow-md" />

          <div className="mt-4">
            <h4 className="text-lg font-semibold">Sketch</h4>
            <p className="text-gray-600 text-sm mt-2">
              It all starts with a pencil and a quiet moment. We sketch our ideas by hand,
              often inspired by leaves, flowers, or everyday stories.
            </p>
          </div>
        </motion.div>

      </section>

{/* GALLERY */}
<section className="py-20 px-4 bg-[#E2F2CF]">
  <h2 className="text-4xl font-semibold text-center mb-12">
    Our Story in Pictures
  </h2>

  {/* 📱 Mobile Carousel */}
  <div className="flex md:hidden overflow-x-auto gap-4 px-2 snap-x snap-mandatory scrollbar-hide">
    {gallery.map((item, i) => (
      <motion.div
        key={i}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedIndex(i)}
        className="min-w-[80%] snap-center rounded-xl overflow-hidden cursor-pointer"
      >
        <img
          src={item.img}
          className="w-full h-[260px] object-cover rounded-xl"
        />
      </motion.div>
    ))}
  </div>
  {/* 💻 Desktop Grid (same as before) */}
  <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {gallery.map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.03 }}
        onClick={() => setSelectedIndex(i)}
        className="cursor-pointer rounded-xl overflow-hidden"
      >
        <img
          src={item.img}
          className="w-full h-[260px] object-cover"
        />
      </motion.div>
    ))}
  </div>
  {/* Modal stays SAME */}
  <AnimatePresence>
    {selectedIndex !== null && (
      <motion.div
        className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
        onClick={close}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img src={gallery[selectedIndex].img} className="max-h-[70%]" />
        <div className="text-white text-center mt-4">
          <h3 className="text-lg font-semibold">
            {gallery[selectedIndex].title}
          </h3>
          <p className="text-sm text-gray-300">
            {gallery[selectedIndex].desc}
          </p>
        </div>
        <div className="flex gap-6 mt-6 text-white text-2xl">
          <button onClick={(e)=>{e.stopPropagation();prev();}}>←</button>
          <button onClick={(e)=>{e.stopPropagation();close();}}>✕</button>
          <button onClick={(e)=>{e.stopPropagation();next();}}>→</button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</section>
    </div>
  );
};
export default About;