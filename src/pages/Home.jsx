import React, { useEffect } from 'react'

import Seo from "../components/Seo";
import HeroSection from "../components/Herosection";
import CollectionHighlight from "../components/CollectionHighlight";
import ProductSection from "../components/ProductSection";
import Testimonials from "../components/Testimonial";
import FAQ from "../components/FAQ";
import ContactForm from "../components/ContactForm";
import CategorySection from "../components/CategorySection";

const Home = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll("[data-reveal]");

    if (reduceMotion) {
      elements.forEach((element) => {
        element.classList.remove("opacity-0", "translate-y-5");
        element.classList.add("opacity-100", "translate-y-0");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-5");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#F6F4EC] text-[#1A2C08]">
      <Seo
        title="Mamidi | Hand-painted Madhubani Art, Calendars & Keepsakes"
        description="Mamidi brings the centuries-old Madhubani (Mithila) folk art of Bihar into hand-painted calendars, keepsakes and gifts. Handcrafted in India, shipped nationwide."
        path="/"
      />

      <HeroSection />
      <CategorySection />
      <CollectionHighlight />
      <ProductSection />
      <Testimonials />
      <FAQ />
      <ContactForm />
     
    </div>
  )
}

export default Home
