import React, { useState } from "react";

const faqs = [
  {
    question: "What is Madhubani art?",
    answer:
      "Madhubani (also called Mithila art) is a centuries-old folk-painting tradition from the Mithila region of Bihar, India. Traditionally painted by women on walls and floors, it is known for intricate double-line borders, geometric patterns, and motifs from nature and mythology — fish, peacocks, lotus, the sun and moon — filled in with natural dyes. Every Mamidi product is hand-painted in this style.",
  },
  {
    question: "Can I customize my order?",
    answer:
      "Yes, you can customize your order depending on the product. Share names, dates, themes, or references and we will guide you through the best option.",
  },
  {
    question: "How long will my order take?",
    answer:
      "Most orders are delivered within 5-7 business days. Customized orders may take a little longer based on design complexity.",
  },
  {
    question: "Can I add a handwritten note or gift wrap?",
    answer:
      "Yes, gift wrapping and handwritten notes can be added at checkout or requested while placing a custom order.",
  },
  {
    question: "How do I pay for my order?",
    answer:
      "Place your order on the site and confirm it with us on WhatsApp — we will share the payment details (UPI or bank transfer) and a delivery timeline directly. It is a personal, no-hassle checkout, just like ordering from an artisan.",
  },
  {
    question: "Do you accept returns for custom products?",
    answer:
      "Custom products are not eligible for return unless they arrive damaged or defective.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F6F4EC] py-14 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div data-reveal className="translate-y-5 opacity-0 transition-all duration-700">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C8A020]">
            <span className="h-px w-8 bg-[#C8A020]" />
            Got questions?
          </p>
          <h2 className="font-headline text-4xl leading-[1.02] text-[#1A2C08] sm:text-5xl">
            Frequently <br />
            <em className="text-[#C8A020]">Asked</em>
          </h2>
          <p className="mt-5 max-w-md text-sm font-light leading-7 text-[#4A5E30]">
            From personalization to delivery, here are the details that make
            your Mamidi order simple and smooth.
          </p>
        </div>

        <div
          data-reveal
          className="translate-y-5 border-t border-[#D8DEC4] opacity-0 transition-all duration-700"
        >
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={faq.question} className="border-b border-[#D8DEC4]">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-[#1A2C08] transition-colors duration-300 hover:text-[#C8A020]"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center border border-[#D8DEC4] text-lg font-light leading-none text-[#4A5E30] transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-[#3E5E14] text-[#FDFCF5]" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-sm font-light leading-7 text-[#4A5E30]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
