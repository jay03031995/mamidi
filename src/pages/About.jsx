import React from "react";

import hero from "../assets/aboutcover.jpg";
import pic3 from "../assets/center.jpg";
import pic4 from "../assets/process1.jpg";
import pic5 from "../assets/process2.png";
import vdo1 from "/vdo1.mp4";
import vdo2 from "/vdo2.mp4";

const About = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[250px] md:h-[330px] flex items-center justify-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="bg-white px-6 py-3 shadow-md h-auto w-64 md:w-80 flex flex-col justify-center items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-center">OUR STORY</h1>
          <p className="text-sm text-gray-600 text-center">Home / Our Story</p>
        </div>
      </div>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-16">

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <video
            src={vdo1}
            autoPlay
            muted
            loop
            playsInline
            className="rounded shadow-md w-full h-[250px] md:h-[325px] object-cover"
          ></video>

          <div className="text-center px-2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Our mission is to bring nature’s poetry into everyday moments.
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-light">
              Bridging the warmth of hand-drawn traditions with timeless
              printables—made for those who find beauty in the little things.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center px-2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Our story</h2>
            <p className="text-gray-600 text-base md:text-lg font-light">
              Born from a love of sketchbooks and the soul of the wild. We
              believe that art and nature are inseparable. Each of our diaries,
              calendars, and gifts is rooted in slow living, mindful creativity,
              and a quiet admiration for indigenous artistry.
            </p>
          </div>

          <video
            src={vdo2}
            autoPlay
            muted
            loop
            playsInline
            className="rounded shadow-md w-full h-[250px] md:h-[325px] object-cover"
          ></video>
        </div>
      </section>

      {/* Why Our Story Blooms Differently */}
      <section className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Why Our Story Blooms Differently?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">

          {/* Left */}
          <div className="space-y-8 text-center md:text-right">
            <div>
              <h3 className="text-xl font-semibold">Rooted in Nature</h3>
              <p className="text-gray-600">
                Every design starts with a leaf, a petal, or a breeze—our muse is the earth itself.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Hand-Touched Originals</h3>
              <p className="text-gray-600">
                From sketch to print, each piece is hand-drawn with care and intention.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Crafted with Purpose</h3>
              <p className="text-gray-600">
                Thoughtfully created to blend utility with beauty—no detail left behind.
              </p>
            </div>
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <img
              src={pic3}
              alt="Blooms"
              className="rounded shadow-md max-w-full object-cover"
            />
          </div>

          {/* Right */}
          <div className="space-y-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold">Inspired by Culture</h3>
              <p className="text-gray-600">
                Echoing indigenous patterns and folklore—our prints celebrate tradition.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Seasonal Soul</h3>
              <p className="text-gray-600">
                We follow nature's rhythm, creating pieces that shift with the seasons.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Your Story, Our Canvas</h3>
              <p className="text-gray-600">
                Custom printables that reflect your memories, moods, and milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Our Craft Process
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left */}
          <div className="px-2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              From Paper to Product—Every Step Tells a Story
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              At the heart of everything we create is a process that honors time,
              intention, and tradition. Each piece begins in a quiet corner of our
              studio—often with a warm cup of chai, a sketchbook, and a mind tuned
              into the rhythms of nature.
            </p>
          </div>

          {/* Image */}
          <div className="text-center">
            <img
              src={pic4}
              alt="Sketch process"
              className="rounded shadow-md w-full max-w-md mx-auto object-cover"
            />
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Sketch</h4>
              <p className="text-gray-600 text-sm md:text-base mx-auto max-w-sm">
                It all starts with a pencil and a quiet moment. We sketch our ideas by
                hand, often inspired by leaves, flowers, or everyday stories.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <img
            src={pic5}
            alt="gallery"
            className="w-full max-w-4xl object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
