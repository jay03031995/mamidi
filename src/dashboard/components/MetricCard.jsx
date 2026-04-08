import React from "react";

export function MetricCard({ label, value, accent, icon, children }) {
  return (
    <div
      className={`rounded-xl p-4 shadow-sm ${
        accent === "primary"
          ? "bg-[#4f6d2f] text-white"
          : "bg-[#f6f4e1] text-[#1c1c11]"
      }`}
    >
      <p className="text-xs font-label uppercase tracking-wider opacity-80 mb-1">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-headline font-bold">{value}</h3>
        {icon ? (
          <span className="material-symbols-outlined text-lg opacity-80">
            {icon}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
