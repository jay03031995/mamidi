import React from "react";
import { Badge, GhostButton } from "./DashboardShell";

export function FeaturedProductCard({ product, onEdit, onDelete }) {
  if (!product) return null;
  const { title, main, description, price, _id, stock = 0, sku = "" } = product;
  return (
    <div className="md:col-span-7 group relative overflow-hidden bg-white rounded-2xl shadow-sm transition-all hover:shadow-xl">
      <div className="grid md:grid-cols-2 h-full">
        <div className="relative h-60 md:h-72 overflow-hidden">
          <img
            src={main}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge>Featured</Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-5">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-headline text-[#1c1c11] line-clamp-2">{title}</h3>
            <Badge tone="success">In Stock ({stock})</Badge>
          </div>
          <p className="text-[#44483d] font-body leading-relaxed line-clamp-3">
            {description}
          </p>
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[10px] text-[#44483d] uppercase tracking-widest mb-1">
                SKU
              </p>
              <p className="font-mono text-sm">{sku || _id}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#44483d] uppercase tracking-widest mb-1">
                Price
              </p>
              <p className="font-bold text-lg text-[#385419]">₹{price}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onEdit?.(product)}
              className="flex-1 bg-[#f0efdb] py-3 rounded-lg font-bold text-sm hover:bg-[#ebe9d6] transition-colors"
            >
              Edit Product
            </button>
            <button
              onClick={() => onDelete?.(product)}
              className="w-12 h-12 flex items-center justify-center border border-[#c4c8b9] rounded-lg text-[#44483d] hover:text-[#ba1a1a] transition-colors"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product, onQuickEdit, onDelete }) {
  const { title, main, description, price, stockStatus = "" } = product;
  const badgeTone =
    stockStatus === "low"
      ? "bg-[#fed65b] text-[#745c00]"
      : "bg-[#caeea1] text-[#324e14]";

  return (
    <div className="bg-[#f6f4e1] rounded-[2rem] p-6 flex flex-col shadow-sm">
      <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
        <img src={main} alt={title} className="w-full h-full object-cover" />
        {stockStatus ? (
          <span className={`absolute top-3 right-3 ${badgeTone} px-3 py-1 rounded-full text-[10px] font-bold uppercase`}>
            {stockStatus === "low" ? "Low Stock" : "In Stock"}
          </span>
        ) : null}
      </div>
      <h3 className="text-xl font-headline text-[#1c1c11] mb-2">{title}</h3>
      <p className="text-sm text-[#44483d] font-body mb-6 line-clamp-2">
        {description}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-[#385419]">₹{price}</span>
        <div className="flex gap-3">
          <button
            onClick={() => onQuickEdit?.(product)}
            className="text-[#385419] font-bold text-sm hover:underline decoration-2 underline-offset-4"
          >
            Quick Edit
          </button>
          <button
            onClick={() => onDelete?.(product)}
            className="text-[#ba1a1a] font-bold text-sm hover:underline decoration-2 underline-offset-4"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
