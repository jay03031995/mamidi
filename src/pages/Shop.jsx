import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import ShopProductCard from "../components/ShopProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Seo from "../components/Seo";
import { fetchCatalog } from "../api/catalog";
import { hasPrice } from "../data/shopCatalog";

const LEAF_SKETCH_URL = "/shop2.png";
const LEAF_SKETCH_URL1 = "/shop1.png";
const LEAF_SKETCH_URL2 = "/shop3.png";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name: A–Z" },
];

const slugifyCategory = (str = "") =>
  str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const urlCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return slugifyCategory(params.get("category") || "");
  }, [location.search]);

  const [activeCategory, setActiveCategory] = useState(urlCategory || "all");

  // Initialise search from ?search= (deep links / homepage searchbox action)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get("search");
    if (s) setSearch(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveCategory(urlCategory || "all");
  }, [urlCategory]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { categories: cats } = await fetchCatalog();
        const withProducts = (cats || []).filter((c) => c.products?.length > 0);
        if (alive) setCategories(withProducts);
      } catch (error) {
        console.error("Error loading shop:", error);
        if (alive) setCategories([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Flatten products and tag each with its category for filtering.
  const allProducts = useMemo(
    () =>
      categories.flatMap((c) =>
        c.products.map((p) => ({
          ...p,
          _categorySlug: slugifyCategory(c.slug || c.label),
          _categoryLabel: c.label,
        }))
      ),
    [categories]
  );

  const activeCategoryMeta = useMemo(() => {
    if (activeCategory === "all") return null;
    return (
      categories.find(
        (c) =>
          slugifyCategory(c.slug || c.label) === activeCategory ||
          slugifyCategory(c.label) === activeCategory
      ) || null
    );
  }, [categories, activeCategory]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = allProducts;

    if (activeCategory !== "all") {
      list = list.filter(
        (p) =>
          p._categorySlug === activeCategory ||
          slugifyCategory(p._categoryLabel) === activeCategory
      );
    }

    if (q) {
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p._categoryLabel || "").toLowerCase().includes(q)
      );
    }

    const priceOf = (p) => (hasPrice(p) ? Number(p.price) : null);
    const list2 = [...list];

    if (sort === "price-asc")
      list2.sort((a, b) => (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity));
    else if (sort === "price-desc")
      list2.sort((a, b) => (priceOf(b) ?? -Infinity) - (priceOf(a) ?? -Infinity));
    else if (sort === "name")
      list2.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

    return list2;
  }, [allProducts, activeCategory, search, sort]);

  const selectCategory = (slug) => {
    setActiveCategory(slug);
    navigate(slug === "all" ? "/shop" : `/shop?category=${slug}`);
  };

  const clearFilters = () => {
    setSearch("");
    setSort("featured");
    selectCategory("all");
  };

  const hasActiveFilters = search.trim() || activeCategory !== "all" || sort !== "featured";

  return (
    <main className="bg-[#fcfbe6]">
      <Seo
        title="Shop Hand-painted Madhubani Calendars & Keepsakes — Mamidi"
        description="Browse Mamidi's collection of hand-painted Madhubani (Mithila) folk-art calendars, keepsakes, jute bags and gifts. Handcrafted in India, shipped nationwide."
        path="/shop"
      />

      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Shop" }]} />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FCFBE6] px-6 py-12 md:py-16">
        <div
          className="pointer-events-none absolute right-[-60px] top-[-80px] z-0 h-[320px] w-[320px] opacity-[0.18] md:h-[460px] md:w-[460px]"
          style={{
            backgroundImage: `url(${LEAF_SKETCH_URL})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            transform: "rotate(12deg)",
          }}
        />
        <div
          className="pointer-events-none absolute left-[-140px] top-[20%] z-0 h-[240px] w-[240px] opacity-[0.16] md:h-[380px] md:w-[380px]"
          style={{
            backgroundImage: `url(${LEAF_SKETCH_URL2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            transform: "rotate(-18deg)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#3A5419]">
            Mamidi Shop
          </p>
          <h1 className="font-headline text-4xl leading-[1.02] text-[#1E2814] md:text-5xl">
            Artful calendars and custom keepsakes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#556343]">
            Hand-painted Madhubani pieces — search the collection, filter by
            category, and find a story worth holding.
          </p>
        </div>
      </section>

      {/* SHOP CONTROLS + GRID */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        {/* CONTROLS BAR */}
        <div className="sticky top-0 z-30 -mx-6 mb-7 border-y border-[#E2DDC9] bg-[#fcfbe6]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9A6A]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search calendars, keepsakes, jute bags…"
                className="w-full rounded-full border border-[#D8DEC4] bg-white py-2.5 pl-10 pr-9 text-sm text-[#1A2C08] outline-none transition focus:border-[#C8A020]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9A6A] hover:text-[#1A2C08]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* SORT */}
            <div className="relative">
              <SlidersHorizontal
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9A6A]"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="w-full appearance-none rounded-full border border-[#D8DEC4] bg-white py-2.5 pl-10 pr-8 text-sm text-[#1A2C08] outline-none transition focus:border-[#C8A020] sm:w-auto"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CATEGORY CHIPS */}
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-0.5">
            <button
              onClick={() => selectCategory("all")}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-wide transition ${
                activeCategory === "all"
                  ? "border-[#1A2C08] bg-[#1A2C08] text-[#FDFCF5]"
                  : "border-[#D8DEC4] bg-white text-[#4A5E30] hover:border-[#C8A020]"
              }`}
            >
              All
            </button>
            {categories.map((c) => {
              const slug = slugifyCategory(c.slug || c.label);
              const active = slug === activeCategory;
              return (
                <button
                  key={c.id || slug}
                  onClick={() => selectCategory(slug)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-wide transition ${
                    active
                      ? "border-[#1A2C08] bg-[#1A2C08] text-[#FDFCF5]"
                      : "border-[#D8DEC4] bg-white text-[#4A5E30] hover:border-[#C8A020]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="font-headline text-2xl text-[#1A2C08] sm:text-3xl">
              {search.trim()
                ? `Results for “${search.trim()}”`
                : activeCategoryMeta?.label || "All products"}
            </h2>
            {activeCategoryMeta?.description && !search.trim() && (
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#556343]">
                {activeCategoryMeta.description}
              </p>
            )}
          </div>
          {!loading && (
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A9A6A]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* GRID / STATES */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-xl border border-[#E2DDC9] bg-[#f0eede]"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#E2DDC9] bg-white p-10 text-center">
            <p className="font-headline text-2xl text-[#1A2C08]">
              No pieces match your search.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#556343]">
              Try a different keyword or category.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-5 inline-flex items-center justify-center rounded-full border-2 border-[#1A2C08] bg-[#1A2C08] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FDFCF5] transition hover:bg-transparent hover:text-[#1A2C08]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ShopProductCard
                key={product._id || product.title}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Shop;
