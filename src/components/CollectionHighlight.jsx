import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import artisanImage from "../assets/aboutpic1.jpg";

// SLIDER IMAGES
import slide1 from "/1.jpg";
import slide2 from "/2.jpg";
import slide3 from "/3.jpg";

const CollectionHighlight = () => {
  const images = [slide1, slide2, slide3];

  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#F6F4EC] py-14 sm:py-24">

      {/* TOP SECTION */}
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] lg:px-12">


       {/* IMAGE SLIDER */}
<div className="flex flex-col">

  {/* SLIDER */}
  <div className="relative aspect-[3/2] w-full overflow-hidden border border-[#D8DEC4] bg-[#E8EBD8]">

    {/* SLIDES */}
    <div
      className="flex h-full transition-transform duration-700 ease-in-out"
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
      }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="min-w-full h-full"
        >
          <img
            src={image}
            alt={`Curated item ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>

  {/* DOTS OUTSIDE */}
  <div className="mt-4 flex justify-center gap-2">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`transition-all duration-300 rounded-full ${
          currentSlide === index
            ? "w-6 h-2.5 bg-[#1A2C08]"
            : "w-2.5 h-2.5 bg-[#B8BEA7]"
        }`}
      />
    ))}
  </div>

</div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center border border-[#D8DEC4] bg-[#FDFCF5] p-6 sm:p-10">

          <p className="mb-5 flex items-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#C8A020]">
            <span className="h-px w-8 bg-[#C8A020]" />
            The Art of Mithila
          </p>

          <h2 className="font-headline text-3xl leading-[1.02] text-[#1A2C08] sm:text-5xl">
            Handpicked pieces with a{" "}
            <em className="text-[#C8A020]">story</em>.
          </h2>

          <p className="mt-5 sm:mt-6 text-sm sm:text-base font-light leading-7 sm:leading-8 text-[#4A5E30]">
            Every Mamidi piece carries a Madhubani story — the folk art of
            Mithila, built from intricate double-line borders, nature motifs,
            and the earthy natural-dye palette of Bihar. We reimagine it for
            calendars, keepsakes, and everyday joy.
          </p>

          {/* MOTIF CHIPS */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {["Fish · prosperity", "Peacock · love", "Lotus · purity", "Sun · life"].map((motif) => (
              <li
                key={motif}
                className="rounded-full border border-[#D8DEC4] bg-[#F3F4EE] px-3 py-1.5 text-[11px] font-medium tracking-[0.02em] text-[#4A5E30]"
              >
                {motif}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

            <Link
              to="/shop"
              className="inline-flex items-center justify-center border-2 border-[#1A2C08] bg-[#1A2C08] px-6 sm:px-7 py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#FDFCF5] transition-all duration-300 hover:bg-transparent hover:text-[#1A2C08]"
            >
              Explore shop
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center border border-[#1A2C08] px-6 sm:px-7 py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#1A2C08] transition-all duration-300 hover:bg-[#1A2C08] hover:text-[#FDFCF5]"
            >
              Our story
            </Link>

          </div>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-5 sm:px-8 sm:mt-20 md:grid-cols-[1fr_1px_1fr] lg:px-12">

        {/* LEFT */}
        <div>
          <p className="mb-5 flex items-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#C8A020]">
            <span className="h-px w-8 bg-[#C8A020]" />
            Our Craft Story
          </p>

          <p className="font-headline text-3xl italic leading-tight text-[#1A2C08] sm:text-5xl">
            "Where every stroke tells{" "}
            <span className="text-[#C8A020]">
              a story.
            </span>"
          </p>
        </div>

        {/* DIVIDER */}
        <div
          className="hidden bg-[#D8DEC4] md:block"
          aria-hidden="true"
        />

        {/* RIGHT */}
        <div className="flex flex-col gap-6">

          {/* IMAGE */}
          <img
            src={artisanImage}
            alt="Mamidi artist at work"
            className="h-[260px] w-full border border-[#D8DEC4] object-cover sm:h-[320px] md:h-48"
          />

          {/* TEXT */}
          <div>
            <p className="text-sm sm:text-base font-light leading-7 sm:leading-8 text-[#4A5E30]">
              Madhubani was born on the mud walls of Mithila, painted by women
              to bless festivals and weddings. Mamidi carries that living
              tradition into contemporary gifting — each motif hand-painted with
              the patience and devotion of folk artists, so every piece feels
              personal, grounded, and lasting.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center border border-[#1A2C08] px-6 sm:px-7 py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#1A2C08] transition-all duration-300 hover:bg-[#1A2C08] hover:text-[#FDFCF5]"
            >
              Start a custom order
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CollectionHighlight;