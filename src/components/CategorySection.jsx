import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  CalendarDays,
  Gift,
  Heart,
  Leaf,
  Palette,
  PenLine,
  Sparkles,
} from "lucide-react";

import { fetchCatalog } from "../api/catalog";

const iconForCategory = (name = "") => {
  const normalized = name.toLowerCase();

  if (
    normalized.includes("calendar") ||
    normalized.includes("calender")
  ) {
    return CalendarDays;
  }

  if (
    normalized.includes("custom") ||
    normalized.includes("story")
  ) {
    return PenLine;
  }

  if (normalized.includes("gift")) {
    return Gift;
  }

  if (
    normalized.includes("ceramic") ||
    normalized.includes("coaster")
  ) {
    return Leaf;
  }

  if (normalized.includes("decor")) {
    return Sparkles;
  }

  if (
    normalized.includes("art") ||
    normalized.includes("paint")
  ) {
    return Palette;
  }

  return Heart;
};

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetchCatalog();

        setCategories(response.categories || []);
      } catch (error) {
        console.error("CATEGORY ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCatalog();
  }, []);

  return (
    <section className="bg-[#FDFCF7] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8A020]">
              Explore Collection
            </p>

            <h2 className="font-headline text-3xl text-[#1A2C08] sm:text-4xl">
              Shop by{" "}
              <em className="text-[#C8A020]">
                Category
              </em>
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A9A6A] transition-colors duration-300 hover:text-[#C8A020] sm:block"
          >
            View All
          </Link>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="py-10 text-center text-[#4A5E30]">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="py-10 text-center text-[#4A5E30]">
            No categories found
          </div>
        ) : (

          /* CATEGORY ROW */
          <div className="flex flex-wrap items-start justify-center gap-6 sm:justify-start sm:gap-8 lg:gap-10">

            {categories.slice(0, 7).map((category) => {
              const Icon = iconForCategory(
                category.label
              );

              return (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.slug}`}
                  className="group flex w-[92px] flex-col items-center text-center sm:w-[105px]"
                >

                  {/* CIRCLE */}
                  <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#F3F4EE] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#E8EBD8] group-hover:shadow-[0_10px_25px_rgba(26,44,8,0.08)] sm:h-[100px] sm:w-[100px]">

                    {/* INNER RING */}
                    <div className="absolute inset-[7px] rounded-full border border-[#E2E6D5] transition-all duration-300 group-hover:border-[#C8A020]/40" />

                    {/* ICON */}
                    <Icon className="relative h-8 w-8 text-[#5B6D50] transition-all duration-300 group-hover:scale-110 group-hover:text-[#C8A020] sm:h-9 sm:w-9" />
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-4 font-medium leading-tight text-[#1A2C08] text-[13px] transition-colors duration-300 group-hover:text-[#C8A020]">
                    {category.label}
                  </h3>

                  {/* COUNT */}
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#8A9A6A]">
                    {category.products?.length || 0}+
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;