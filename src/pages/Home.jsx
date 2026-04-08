import React from 'react'

import HeroSection from "../components/Herosection";
import CollectionHighlight from "../components/CollectionHighlight";
import Testimonials from "../components/Testimonial";
import FAQ from "../components/FAQ";
import ContactForm from "../components/ContactForm";


const Home = () => {
  return (
    <div>
   
      <HeroSection />
      <CollectionHighlight />
      <Testimonials />
      <FAQ />
      <ContactForm />
     
    </div>
  )
}

export default Home
