import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Addtocart from "../components/Addtocart";
import { useCart } from "../contexts/CartContext";
import {
  formatProductPrice,
  isPurchasableProduct,
} from "../data/shopCatalog";
import { getImageUrl, getImageUrls } from "../utils/productImages";
import { slugifyTitle, getProductPath } from "../utils/productLinks";
import { apiFetch } from "../dashboard/api/client";
import { listAllProducts } from "../dashboard/api/products";
import JsonLd from "../components/JsonLd";
import Breadcrumbs from "../components/Breadcrumbs";
import Seo from "../components/Seo";
import { productSchema } from "../utils/seo";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // GALLERY STATES
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProduct(null);
        setNotFound(false);

        const listData = await listAllProducts();

        const products = Array.isArray(listData.data)
          ? listData.data
          : [];

        let matchedProduct = products.find(
          (item) =>
            slugifyTitle(item.title) === slug || item._id === slug
        );

        if (!matchedProduct && slug) {
          try {
            const data = await apiFetch(`/products/${slug}`);
            matchedProduct = data?.data || data;
          } catch {
            //
          }
        }

        if (matchedProduct?._id) {
          setProduct(matchedProduct);

          setSelectedImg(
            getImageUrl(matchedProduct.main || matchedProduct.img)
          );

          return;
        }

        setNotFound(true);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      }
    };

    fetchProduct();
  }, [slug]);

  const specificationRows = useMemo(() => {
    if (!product) return [];

    const rows = [
      ["Category", product.category || product.Type || product.type],
      ["Occasion", product.Occasion || product.occasion],
      ["Material", product.Material || product.material],
      ["Colour", product.Colour || product.colour],
      ["Dimensions", product.Dimensions || product.dimensions],
      ["Pages", product.Pages || product.pages],
      ["Print", product.Print || product.print],
    ];

    const customSpecs =
      product.specs?.map((spec, index) => [
        `Option ${index + 1}`,
        spec,
      ]) || [];

    return [...rows, ...customSpecs].filter(([, value]) => value);
  }, [product]);

  if (notFound)
    return <p className="py-16 text-center">Product not found.</p>;

  if (!product)
    return <p className="py-16 text-center">Loading...</p>;

  const canBuy = isPurchasableProduct(product);

  const category =
    product.category ||
    product.Type ||
    product.type ||
    "Mamidi Product";

  const mainImage =
    selectedImg || getImageUrl(product.main || product.img);

  const thumbnails = getImageUrls(
    product.main || product.img,
    ...(Array.isArray(product.gallery)
      ? product.gallery
      : []),
    ...(Array.isArray(product.sideImages)
      ? product.sideImages
      : [])
  );

  const visibleThumbnails = thumbnails.slice(0, 4);

  const remainingCount = thumbnails.length - 4;

  return (
    <main className="bg-[#fcfbe6]">

      {/* SEO: title/meta + Product + breadcrumb structured data */}
      <Seo
        title={`${product.title} — Mamidi`}
        description={
          product.description ||
          `${product.title}: a hand-painted Madhubani (Mithila) folk-art piece by Mamidi.`
        }
        path={getProductPath(product)}
        image={mainImage}
      />
      <JsonLd id="product" data={productSchema(product)} />

      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: category, path: `/shop?category=${encodeURIComponent(category)}` },
            { name: product.title },
          ]}
        />
      </div>

      {/* TOP SECTION */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-6 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-14">

        {/* LEFT */}
        <div className="flex flex-col-reverse gap-5 md:flex-row">

          {/* THUMBNAILS */}
          {thumbnails.length > 1 ? (
            <div className="flex gap-3 overflow-x-auto pb-2 md:w-24 md:flex-col md:overflow-visible">

              {/* FIRST 4 IMAGES */}
              {visibleThumbnails.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImg(img)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-[#E8EBD8] shadow-sm transition-all duration-300 ${
                    selectedImg === img
                      ? "border-[#4D6A2D] ring-2 ring-[#4D6A2D]/20"
                      : "border-[#dbe9e6]"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title}-${index}`}
                    className="h-full w-full bg-white object-contain p-1"
                  />
                </button>
              ))}

              {/* MORE BUTTON */}
              {remainingCount > 0 && (
                <button
                  type="button"
                  onClick={() => setShowGallery(true)}
                  className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#dbe9e6] bg-[#E8EBD8] shadow-sm"
                >
                  <img
                    src={thumbnails[4]}
                    alt="More"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/45" />

                  <span className="relative z-10 text-lg font-semibold text-white">
                    +{remainingCount}
                  </span>
                </button>
              )}
            </div>
          ) : null}

          {/* MAIN IMAGE */}
          <div className="flex min-h-[320px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[#dbe9e6] bg-[#E8EBD8] p-2 shadow-[0_18px_42px_rgba(32,55,59,0.12)] md:min-h-[420px]">

            <img
              src={mainImage}
              alt={product.title}
              className="max-h-[450px] w-full rounded-xl object-contain"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="self-center">

          <p className="mb-3 inline-flex rounded-full bg-[#fcfbe6]/60 px-4 py-2 text-sm font-semibold uppercase text-[#395419]">
            {category}
          </p>

          <h1 className="mb-4 text-3xl font-semibold leading-tight text-gray-950 md:text-5xl">
            {product.title}
          </h1>

          <p className="mb-5 overflow-hidden text-base leading-7 text-gray-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {product.description}
          </p>

          <p className="mb-7 text-3xl font-semibold text-gray-950">
            {formatProductPrice(product)}
          </p>

          {/* BUY SECTION */}
          {canBuy ? (
            <div className="space-y-5">

              {/* QUANTITY */}
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-800">
                  Quantity
                </p>

                <div className="inline-flex items-center rounded-xl border border-[#dbe9e6] bg-[#E8EBD8]">

                  <button
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                    className="px-4 py-2 text-lg text-gray-700"
                  >
                    -
                  </button>

                  <span className="min-w-10 px-3 py-2 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 text-lg text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ADD TO CART + CHECKOUT */}
              <div className="flex max-w-md flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Addtocart
                    product={product}
                    quantity={quantity}
                    className="rounded-xl py-3 font-semibold"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, quantity);
                    navigate("/checkout");
                  }}
                  className="flex-1 rounded-xl bg-[#1A2C08] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FDFCF5] transition-all duration-300 hover:bg-[#2e4a10]"
                >
                  Checkout
                </button>
              </div>

              <p className="text-xs text-gray-500">
                No online payment needed — confirm your order on WhatsApp at
                checkout (UPI / bank transfer / cash on delivery).
              </p>
            </div>
          ) : (
            <Link
              to="/contact"
              className="inline-flex rounded-xl bg-[#395419] px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              Enquire for Custom Order
            </Link>
          )}
        </div>
      </section>

      {/* DESCRIPTION + DETAILS */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-14 lg:grid-cols-[1.1fr_0.9fr]">

        {/* DESCRIPTION */}
        <div className="rounded-2xl border border-[#dbe9e6] bg-[#E8EBD8] p-6 shadow-[0_10px_28px_rgba(32,55,59,0.08)]">

          <p className="mb-2 text-sm font-semibold uppercase text-[#4D6A2D]">
            Description
          </p>

          <h2 className="mb-3 text-2xl font-semibold text-gray-950">
            About this piece
          </h2>

          <p className="text-base leading-7 text-gray-700">
            {product.description ||
              "Product description will appear here soon."}
          </p>
        </div>

        {/* DETAILS */}
        <div className="rounded-2xl border border-[#dbe9e6] bg-[#E8EBD8] p-6 shadow-[0_10px_28px_rgba(32,55,59,0.08)]">

          <p className="mb-2 text-sm font-semibold uppercase text-[#4D6A2D]">
            Details
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-950">
            Product information
          </h2>

          {specificationRows.length ? (
            <dl className="divide-y divide-[#e8f1ef] text-sm">

              {specificationRows.map(([label, value]) => (
                <div
                  key={`${label}-${value}`}
                  className="grid grid-cols-[120px_1fr] gap-4 py-3"
                >
                  <dt className="font-semibold text-gray-900">
                    {label}
                  </dt>

                  <dd className="text-gray-700">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm leading-6 text-gray-700">
              More product details will appear here soon.
            </p>
          )}
        </div>
      </section>

      {/* POPUP GALLERY */}
     {/* POPUP GALLERY */}
{showGallery && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">

    {/* CLOSE */}
    <button
      onClick={() => setShowGallery(false)}
      className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg"
    >
      ×
    </button>

    {/* LEFT ARROW */}
    <button
      onClick={() => {
        const currentIndex = thumbnails.indexOf(selectedImg);

        const prevIndex =
          currentIndex === 0
            ? thumbnails.length - 1
            : currentIndex - 1;

        setSelectedImg(thumbnails[prevIndex]);
      }}
      className="absolute left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-lg"
    >
      ←
    </button>

    {/* RIGHT ARROW */}
    <button
      onClick={() => {
        const currentIndex = thumbnails.indexOf(selectedImg);

        const nextIndex =
          currentIndex === thumbnails.length - 1
            ? 0
            : currentIndex + 1;

        setSelectedImg(thumbnails[nextIndex]);
      }}
      className="absolute right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-lg"
    >
      →
    </button>

    {/* GALLERY CONTENT */}
    <div className="flex w-full max-w-6xl flex-col items-center">

      {/* MAIN IMAGE */}
     <div className="flex h-[70vh] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

        <img
          src={selectedImg}
          alt={product.title}
          className="h-full w-full rounded-2xl object-contain"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="mt-5 flex max-w-full gap-3 overflow-x-auto pb-2">

        {thumbnails.map((img, index) => (
          <button
            key={img}
            onClick={() => setSelectedImg(img)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
              selectedImg === img
                ? "border-white scale-105"
                : "border-transparent opacity-80"
            }`}
          >
            <img
              src={img}
              alt={`${product.title}-${index}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}

      </div>
    </div>
  </div>
)}
    </main>
  );
};

export default ProductDetail;
