import React, { useEffect, useState } from "react";
import {
  Heart,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

import ShopProductCard from "./ShopProductCard";
import { fetchCatalog } from "../api/catalog";
import { useNavigate } from "react-router-dom";

const trustItems = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "Orders above Rs. 999 delivered India-wide",
  },
  {
    icon: ShieldCheck,
    title: "Handmade Quality",
    text: "Every piece is made with close artisan care",
  },
  {
    icon: Package,
    title: "Eco Packaging",
    text: "Sustainable wrapping that feels like a gift",
  },
  {
    icon: Heart,
    title: "Made with Love",
    text: "Art from the heart, never a factory",
  },
];

const ProductSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;

    const loadProducts = async () => {
      try {
        const response = await fetchCatalog();

        const backendCategories =
          response?.categories || [];

        // ONLY SHOW CATEGORIES WITH PRODUCTS
        const filteredCategories =
          backendCategories.filter(
            (category) =>
              category.products &&
              category.products.length > 0
          );

        if (alive) {
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );

        if (alive) {
          setCategories([]);
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      {/* PRODUCTS SECTION */}
      <section className="border-y border-[#D8DEC4] bg-[#E8EBD8] py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* HEADING */}
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C8A020]">
                <span className="h-px w-8 bg-[#C8A020]" />
                Hand-painted Madhubani
              </p>

              <h2 className="font-headline text-[2rem] leading-[1.04] text-[#1A2C08] sm:text-5xl lg:text-6xl">
                Calendars and keepsakes carrying the
                motifs of{" "}
                <em className="text-[#C8A020]">
                  Mithila
                </em>.
              </h2>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="w-fit border-b border-[#C8A020] pb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C8A020] transition-all duration-300 hover:pr-2"
            >
              View all
            </button>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="border border-[#D8DEC4] bg-[#FDFCF5] p-10 text-center text-sm uppercase tracking-[0.18em] text-[#4A5E30]">
              Loading products...
            </div>
          ) : categories.length === 0 ? (
            <div className="border border-[#D8DEC4] bg-[#FDFCF5] p-10 text-center">
              <p className="font-headline text-2xl text-[#1A2C08]">
                Products are being prepared.
              </p>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#4A5E30]">
                Categories and products added from your
                dashboard will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
  {categories.slice(0, 2).map(
    (category, categoryIndex) => (
      <section
        key={category.id}
        aria-labelledby={`home-${category.id}-title`}
      >
        {/* CATEGORY INFO */}
        <div className="mb-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A9A6A]">
            {category.eyebrow}
          </p>

          <div className="mt-2 grid gap-3 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <h3
              id={`home-${category.id}-title`}
              className="font-headline text-3xl text-[#1A2C08]"
            >
              {category.label}
            </h3>

            <p className="max-w-2xl text-sm font-light leading-7 text-[#4A5E30]">
              {category.description}
            </p>
          </div>
        </div>


       {/* PRODUCTS GRID */}
<div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
  {category.products
    .slice(0, 3)
    .map((product, productIndex) => (
      <div
        key={product._id || product.title}
        style={{
          transitionDelay: `${
            (categoryIndex + productIndex) * 60
          }ms`,
        }}
        className="
          transition-all
          duration-700
        "
      >
        <ShopProductCard
          product={product}
        />
      </div>
    ))}
</div>
      </section>
    )
  )}
</div>
          )}

          {/* BUTTON */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex border-2 border-[#1A2C08] bg-[#1A2C08] px-8 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FDFCF5] transition-all duration-300 hover:bg-transparent hover:text-[#1A2C08]"
            >
              Explore full collection
            </button>
          </div>
        </div>
      </section>


{/* TRUST SECTION */}
<section className="bg-[#1A2C08] overflow-x-auto scrollbar-hide">
  
  <div className="flex min-w-max md:grid md:min-w-0 md:grid-cols-4">

    {trustItems.map(
      ({ icon: Icon, title, text }, index) => (
        <div
          key={title}
          style={{
            transitionDelay: `${index * 60}ms`,
          }}
          className="w-[260px] flex-shrink-0 border-r border-white/10 p-6 transition-all duration-700 last:border-r-0 md:w-auto md:border-b-0 md:p-7 lg:p-9"
        >
          <Icon className="mb-5 h-7 w-7 text-[#C8A020]" />

          <p className="text-sm font-bold tracking-[0.05em] text-[#FDFCF5]">
            {title}
          </p>

          <p className="mt-2 text-xs font-light leading-6 text-white/45">
            {text}
          </p>
        </div>
      )
    )}

  </div>
</section>
    </>
  );
};

export default ProductSection;