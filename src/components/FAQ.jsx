import React from "react";

const faqs = [
  {
    question: "Can I customize my order?",
    answer: "Yes, you can customize your order depending on the product. Please check the product page for customization options."
  },
  {
    question: "How long will my order take?",
    answer: "Most orders are delivered within 5-7 business days. Customized orders may take a little longer."
  },
  {
    question: "Can I add a handwritten note or gift wrap?",
    answer: "Yes, we offer gift wrapping and handwritten notes. You can add this option at checkout."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, Net Banking, and Wallets."
  },
  {
    question: "Do you accept returns for custom products?",
    answer: "Custom products are not eligible for return unless they arrive damaged or defective."
  }
];

const FAQ = () => {
  return (
    <section className="px-4 md:px-8 py-12 w-full md:h-[541px] mt-10 md:mt-30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Left side */}
        <div className="flex justify-center items-center">
          <div className="md:w-[488px] text-center md:text-left">
            <h3 className="text-[28px] md:text-[40px] font-[600] text-gray-900 mb-4 leading-tight">
              Frequently asked questions
            </h3>
            <p className="text-gray-600 text-[16px] md:text-[18px]">
              From personalization to delivery, we’ve answered your most
              common queries to make shopping smoother.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-3 flex flex-col justify-start w-full md:w-[500px]">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <summary className="px-4 py-3 cursor-pointer font-medium flex justify-between items-center text-[15px] md:text-[16px]">
                <span>{idx + 1}. {faq.question}</span>
                <span className="ml-2 text-gray-500">▾</span>
              </summary>
              <div className="px-4 pb-4 text-gray-600 text-sm md:text-base">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
