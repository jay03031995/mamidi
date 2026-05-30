
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Seo from "../components/Seo";



const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does delivery take?",
        answer:
          "Most handcrafted orders are dispatched within 4–7 working days. Custom and made-to-order pieces may take a little longer depending on detailing and personalization.",
      },
      {
        question: "Do you ship across India?",
        answer:
          "Yes, we deliver pan India. Shipping timelines may vary slightly depending on your location.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Currently we primarily ship within India. For international orders, you can contact us directly for availability and shipping details.",
      },
    ],
  },
  {
    category: "Custom Orders",
    questions: [
      {
        question: "Can I place a personalized order?",
        answer:
          "Absolutely. Mamidi specializes in custom handcrafted creations including illustrated calendars, embroidery hoops, keepsakes, and gifting collections designed around your story.",
      },
      {
        question: "How do custom orders work?",
        answer:
          "You can contact us with your idea, references, occasion, and preferences. We’ll discuss the concept, timeline, and pricing before beginning the artwork.",
      },
      {
        question: "Can I request changes after placing a custom order?",
        answer:
          "Minor revisions may be possible during the design stage. Once production begins, major changes may not be possible because each item is handcrafted.",
      },
    ],
  },
  {
    category: "Products & Care",
    questions: [
      {
        question: "Are all products handmade?",
        answer:
          "Yes. Every Mamidi piece is thoughtfully handcrafted with close attention to detail, artistry, and finishing.",
      },
      {
        question: "How should I care for my products?",
        answer:
          "Keep handcrafted items away from excessive moisture and direct sunlight. For embroidered and painted products, gentle cleaning is recommended.",
      },
      {
        question: "Will handmade items look exactly like the photos?",
        answer:
          "Since every piece is handcrafted, slight variations in texture, brushwork, or embroidery are natural and make each product unique.",
      },
    ],
  },
  {
    category: "Payments & Returns",
    questions: [
      {
        question: "Which payment methods do you accept?",
        answer:
          "We accept secure online payments including UPI, debit cards, credit cards, and net banking.",
      },
      {
        question: "Do you offer returns or exchanges?",
        answer:
          "Because most products are handmade and personalized, returns are only accepted for damaged or incorrect items.",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "Please contact us within 48 hours of delivery with photos of the product and packaging so we can assist you quickly.",
      },
    ],
  },
];

const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#D8DEC4] py-5">
      <button
        onClick={onClick}
        className="flex w-full items-start justify-between gap-6 text-left"
      >
        <h3 className="font-['DM_Sans'] text-base font-semibold leading-7 text-[#1A2C08] sm:text-lg">
          {item.question}
        </h3>

        <div
          className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#D8DEC4] transition-all duration-300 ${
            isOpen
              ? "rotate-180 bg-[#1A2C08] text-white"
              : "bg-white text-[#1A2C08]"
          }`}
        >
          <ChevronDown size={16} />
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl text-sm leading-8 text-[#4A5E30] sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState("0-0");

  return (
    <>
      <Seo
        title="FAQ — Madhubani Art, Orders & Shipping | Mamidi"
        description="Answers about Madhubani art, customizing orders, delivery timelines, gift wrapping, and how to pay for your Mamidi order via WhatsApp."
        path="/faq"
      />

      <main className="bg-[#FDFCF5]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1e06] via-[#1a2c08] to-[#2e4a10] py-24 sm:py-28 lg:py-32">
          <div className="absolute -right-[10%] top-0 h-[35vw] w-[35vw] rounded-full bg-[radial-gradient(circle,rgba(200,160,32,0.12)_0%,transparent_70%)]" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C8A020]">
                <span className="h-px w-8 bg-[#C8A020]" />
                Support & Information
              </p>

              <h1 className="font-headline text-5xl leading-[0.95] tracking-tight text-[#FDFCF5] sm:text-6xl lg:text-7xl">
                Frequently Asked
                <span className="block italic text-[#C8A020]">
                  Questions
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base font-light leading-8 text-white/70 sm:text-lg">
                Everything you need to know about our handcrafted products,
                custom orders, shipping, care, and gifting experience.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ CONTENT */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
            <div className="space-y-16">
              {faqData.map((section, sectionIndex) => (
                <div key={section.category}>
                  <div className="mb-8">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C8A020]">
                      Section {sectionIndex + 1}
                    </p>

                    <h2 className="font-headline text-3xl text-[#1A2C08] sm:text-4xl">
                      {section.category}
                    </h2>
                  </div>

                  <div className="rounded-[28px] border border-[#D8DEC4] bg-white px-6 py-3 shadow-sm sm:px-8">
                    {section.questions.map((item, itemIndex) => {
                      const currentId = `${sectionIndex}-${itemIndex}`;

                      return (
                        <FAQItem
                          key={item.question}
                          item={item}
                          isOpen={openIndex === currentId}
                          onClick={() =>
                            setOpenIndex(
                              openIndex === currentId
                                ? null
                                : currentId
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="pb-20 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="overflow-hidden rounded-[36px] bg-[#1A2C08] px-8 py-14 text-center sm:px-12 sm:py-16">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C8A020]">
                Still Have Questions?
              </p>

              <h2 className="font-headline text-4xl leading-tight text-[#FDFCF5] sm:text-5xl">
                We’d love to help you.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
                Reach out for custom orders, gifting inquiries, collaborations,
                or anything else related to Mamidi handcrafted creations.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-[#C8A020] bg-[#C8A020] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1A2C08] transition-all duration-300 hover:bg-transparent hover:text-[#C8A020]"
                >
                  Contact Us
                </a>

                <a
                  href="/shop"
                  className="inline-flex items-center justify-center border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-[#1A2C08]"
                >
                  Explore Collection
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

    
    </>
  );
};

export default FAQ;

