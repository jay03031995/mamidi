import React from "react";

export function CatalogFilters({ categories, activeCategory, onCategoryChange, search, onSearch }) {
  const pills = ["All Products", ...(categories ?? [])];

  return (
    <div className="flex flex-wrap gap-4 mb-8 bg-[#f6f4e1] p-2 rounded-2xl">
      {pills.map((pill) => {
        const isActive = pill === activeCategory || (pill === "All Products" && !activeCategory);
        return (
          <button
            key={pill}
            onClick={() => onCategoryChange?.(pill === "All Products" ? "" : pill)}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-colors ${
              isActive
                ? "bg-white text-[#385419] shadow-sm"
                : "text-[#44483d] hover:bg-[#ebe9d6]"
            }`}
          >
            {pill}
          </button>
        );
      })}

      <div className="ml-auto flex items-center bg-[#e5e3d0] px-4 rounded-xl border border-[#c4c8b9]/40">
        <span className="material-symbols-outlined text-[#44483d] text-sm mr-2">
          search
        </span>
        <input
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-sm font-body py-2 w-48 placeholder:text-[#44483d]/60"
          placeholder="Search collection..."
          type="text"
        />
      </div>
    </div>
  );
}
