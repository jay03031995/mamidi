import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const tickerItems = [
  "Handcrafted Art",
  "Embroidery Keepsakes",
  "Illustrated Calendars 2026",
  "Custom Orders Open",
  "Eco-Friendly Packaging",
  "200+ Happy Customers",
  "Made with Love · India",
];

const HeroSection = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1e06] via-[#1a2c08] to-[#2e4a10] min-h-[58vh] sm:min-h-[62vh] md:min-h-[68vh] flex flex-col">
        
        {/* TOP GLOW */}
        <div className="pointer-events-none absolute -right-[15%] -top-[20%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(ellipse,rgba(200,160,32,0.12)_0%,transparent_65%)]" />

        {/* BOTTOM GLOW */}
        <div className="pointer-events-none absolute bottom-0 left-[10%] h-[40vw] w-[50vw] rounded-full bg-[radial-gradient(ellipse,rgba(200,160,32,0.07)_0%,transparent_70%)]" />

        {/* DECORATIVE OWL (fills the blank right side; blended so it glows on the green) */}
        <img
          src="/hero.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[28%] z-0 w-[48vw] max-w-[230px] -translate-y-1/2 opacity-75 mix-blend-screen sm:opacity-90 md:top-[37%] md:w-[38vw] md:max-w-[440px] lg:right-6"
        />

        {/* INNER */}
        <div className="relative z-10 flex flex-auto flex-col justify-between gap-6 px-4 py-8 sm:px-8 sm:py-10 lg:px-12">

          {/* TOP ROW */}
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

            {/* LABEL */}
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[#C8A020]" />

              <span className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#C8A020]">
                Mamidi · Handcrafted in India
              </span>
            </div>

{/* INLINE STATS */}
<div className="overflow-x-auto scrollbar-hide">
  <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap text-[10px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-white/45">

    <span>
      <strong className="text-white/80">
        200+
      </strong>{" "}
      Customers
    </span>

    <span className="text-white/20">
      ·
    </span>

    <span>
      <strong className="text-white/80">
        50+
      </strong>{" "}
      Designs
    </span>

    <span className="text-white/20">
      ·
    </span>

    <span>
      <strong className="text-white/80">
        100%
      </strong>{" "}
      Handcrafted
    </span>

  </div>
</div>
          </div>

          {/* HERO CONTENT */}
          <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center py-6">

            {/* HEADLINE */}
            <div>
              <h1 className="font-headline text-[2.5rem] leading-[0.96] tracking-[-0.025em] text-[#FDFCF5] sm:text-6xl md:text-7xl lg:text-[6.5rem]">

                <span className="block">
                  Art lives
                </span>

                <span className="block text-transparent [-webkit-text-stroke:1px_rgba(200,160,32,0.45)] sm:[-webkit-text-stroke:1.5px_rgba(200,160,32,0.45)]">
                  in every
                </span>

                <span className="block italic text-[#C8A020]">
                  stroke.
                </span>

              </h1>
            </div>

            {/* BOTTOM ROW */}
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">

              {/* STORY */}
              <p className="max-w-2xl border-l-2 border-[#C8A020]/50 pl-4 sm:pl-5 text-[13px] sm:text-sm font-light leading-7 sm:leading-8 text-white/55">
                We are Mamidi — keepers of <span className="text-white/85">Madhubani</span>,
                the centuries-old folk art of the Mithila region of Bihar.
                Every calendar, envelope, and keepsake is hand-painted with the
                same fish, peacocks, and lotus motifs once drawn on village
                walls — the warmth of an artisan's hand in every line.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">

                {/* PRIMARY */}
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#1A2C08] bg-[#1A2C08] px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#FDFCF5] transition-all duration-300 hover:bg-transparent hover:text-white"
                >
                  Explore Collection

                  <ArrowRight size={14} />
                </Link>

                {/* SECONDARY */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center border border-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-[#1A2C08]"
                >
                  Custom Order
                </Link>

              </div>
            </div>
          </div>
        </div>

        {/* RULE */}
        <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-[#C8A020]/30 to-transparent" />

        {/* STATS BAR */}
        <div className="relative z-10 grid grid-cols-2 border-t border-white/10 bg-black/20 backdrop-blur-sm md:grid-cols-4">

          {[
            {
              number: "200+",
              label: "Happy Customers",
            },

            {
              number: "50+",
              label: "Art Designs",
            },

            {
              number: "100%",
              label: "Handcrafted",
            },

            {
              number: "5★",
              label: "Rated",
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`p-4 sm:p-6 lg:p-8 ${
                index !== 3
                  ? "border-r border-white/10"
                  : ""
              } ${
                index > 1
                  ? "border-t border-white/10 md:border-t-0"
                  : ""
              }`}
            >
              <div className="text-2xl sm:text-3xl font-light tracking-[-0.03em] text-[#FDFCF5]">
                {item.number}
              </div>

              <div className="mt-2 text-[11px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/35">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden bg-[#C8A020] py-3">

        <div className="flex animate-[ticker_22s_linear_infinite] whitespace-nowrap">

          {[...tickerItems, ...tickerItems].map(
            (item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 sm:gap-6 pr-8 sm:pr-12"
              >
                <span className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#1A2C08]">
                  {item}
                </span>

                <span className="h-[3px] w-[3px] rounded-full bg-[#1A2C08]/40" />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default HeroSection;