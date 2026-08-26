import React from "react";
import { Link } from "react-router-dom";
import Addtocart from "./Addtocart";
import BuyNow from "./BuyNow";
import { getProductPath } from "../utils/productLinks";
import {
  formatProductPrice,
  getProductStock,
  isPurchasableProduct,
  isSoldOutProduct,
} from "../data/shopCatalog";
import { getImageUrl } from "../utils/productImages";

const ShopProductCard = ({ product }) => {
  const canBuy = isPurchasableProduct(product);
  const soldOut = isSoldOutProduct(product);
  const stock = getProductStock(product);
  const imageUrl = getImageUrl(product.main || product.img);

  const category =
    product.category || product.Category || product.Type || product.type;

  const categoryLabel =
    typeof category === "string" ? category : category?.name || "";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E2DDC9] bg-[#FDFCF6] shadow-[0_4px_24px_rgba(26,44,8,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C8A020]/40 hover:shadow-[0_16px_44px_rgba(26,44,8,0.10)]">
      {/* IMAGE */}
      <Link
        to={getProductPath(product)}
        className="relative block overflow-hidden border-b border-[#ECE6D4] bg-white"
      >
        {imageUrl ? (
          <div className="aspect-[4/3.6] overflow-hidden p-2 sm:p-3">
            <img
              src={imageUrl}
              alt={product.title}
              className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3.6] items-center justify-center bg-[#F1EBDD] font-headline text-[#6B7B52]">
            Mamidi
          </div>
        )}
        {soldOut ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#93000a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
            Sold Out
          </span>
        ) : null}
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        {/* CATEGORY EYEBROW */}
        {categoryLabel ? (
          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#A88018] sm:text-[10px]">
            {categoryLabel}
          </p>
        ) : null}

        {/* TITLE */}
        <Link
          to={getProductPath(product)}
          className="font-headline text-[16px] leading-snug text-[#1F2A14] transition-colors duration-300 hover:text-[#B7922D] sm:text-[20px]"
        >
          {product.title}
        </Link>

        {/* PRICE */}
        <p className="mt-1.5 text-[15px] font-semibold text-[#3E5E14] sm:text-base">
          {formatProductPrice(product)}
        </p>
        {stock !== null && !soldOut ? (
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7B52]">
            {stock} available
          </p>
        ) : null}

        {/* DESCRIPTION (hidden on small cards to keep the 2-up grid tidy) */}
        <p className="mt-2 hidden text-[15px] leading-7 text-[#556343] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden sm:[display:-webkit-box]">
          {product.description}
        </p>

        {/* ACTIONS */}
        <div className="mt-4 flex flex-col gap-2 border-t border-[#ECE6D4] pt-4 sm:mt-5">
          {canBuy ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <div className="flex-1">
                <Addtocart product={product} quantity={1} />
              </div>
              <div className="flex-1">
                <BuyNow product={product} />
              </div>
            </div>
          ) : soldOut ? (
            <Link
              to={getProductPath(product)}
              className="flex w-full items-center justify-center border border-[#93000a] bg-[#ffdad6] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#93000a] transition-all duration-300 hover:bg-[#93000a] hover:text-white"
            >
              Sold Out
            </Link>
          ) : (
            <Link
              to={getProductPath(product)}
              className="flex w-full items-center justify-center border border-[#1F2A14] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1F2A14] transition-all duration-300 hover:bg-[#1F2A14] hover:text-[#F8F4EA]"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ShopProductCard;
