import React from "react";

const reviews = [
  {
    name: "Riya",
    city: "Delhi",
    avatar: "R",
    quote:
      "The packaging was super cute and eco-friendly too. Unboxing it felt like opening a gift.",
  },
  {
    name: "Meera",
    city: "Delhi",
    avatar: "M",
    quote:
      "The rocking horse ornament brought back childhood memories. Such a thoughtful piece. Thank you!",
  },
  {
    name: "Ananya",
    city: "Mumbai",
    avatar: "A",
    quote:
      "Cutest thing I've ordered. It felt like receiving a handmade gift from a friend.",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-[#FDFCF5] py-14 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* HEADING */}
        <div
          data-reveal
          className="mx-auto mb-12 max-w-2xl translate-y-5 text-center opacity-0 transition-all duration-700"
        >
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C8A020]">
            Customer Notes
          </p>

          <h2 className="font-headline text-4xl leading-tight text-[#1A2C08] sm:text-5xl">
            What customers <em className="text-[#C8A020]">say</em>
          </h2>
        </div>

        {/* MOBILE CAROUSEL + DESKTOP GRID */}
        <div className="overflow-x-auto scrollbar-hide">
          
          <div className="flex gap-5 md:grid md:grid-cols-3 md:gap-6">

            {reviews.map((review, index) => (
              <article
                key={review.name}
                data-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
                className="flex w-[85vw] sm:w-[70vw] md:w-auto flex-shrink-0 translate-y-5 flex-col border border-[#D8DEC4] bg-[#FDFCF5] p-7 opacity-0 transition-all duration-700 hover:border-[#C8A020]"
              >
                {/* STARS */}
                <p className="mb-5 text-sm tracking-[0.2em] text-[#A88018]">
                  ★★★★★
                </p>

                {/* REVIEW */}
                <blockquote className="flex-1 text-base font-light leading-8 text-[#1A2C08]">
                  "{review.quote}"
                </blockquote>

                {/* USER */}
                <div className="mt-8 flex items-center gap-4 border-t border-[#D8DEC4] pt-5">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8DEC4] bg-[#F5EED8] font-headline text-xl text-[#A88018]">
                    {review.avatar}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1A2C08]">
                      {review.name}
                    </p>

                    <p className="text-xs uppercase tracking-[0.16em] text-[#8A9A6A]">
                      {review.city}
                    </p>
                  </div>

                </div>
              </article>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;