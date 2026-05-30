import React from "react";
import {
  MdInventory2,
  MdLocalShipping,
  MdAnalytics,
} from "react-icons/md";
import mamidiprofile from "../../assets/mamidi_profile.jpeg";

const navItems = [
  { label: "Product Catalog", href: "/dashboard/catalog" },
  { label: "Order Ledger", href: "/dashboard/orders" },
  { label: "Sales Analytics", href: "/dashboard/analytics" },
];

export function DashboardShell({ title, subtitle, actions, children }) {
  return (
    <div className="min-h-screen bg-[#fcfae6] text-[#1c1c11] pb-24 md:pb-0">
      <header className="fixed top-0 w-full z-40 bg-[#fcfae6] flex items-center justify-between px-6 h-16 shadow-sm">
        <div className="flex items-center gap-3">
          
          <h1 className="font-serif text-2xl font-bold text-[#385419] tracking-tight">
            Mamidi
          </h1>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`font-sans text-sm ${
                title === item.label
                  ? "bg-[#f6f4e1] text-[#385419] px-3 py-1 rounded-lg font-semibold"
                  : "text-[#1c1c11] hover:opacity-80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="hidden md:inline-flex px-3 py-2 rounded-lg border border-[#c4c8b9] text-sm font-semibold text-[#385419] hover:bg-[#f6f4e1] transition"
          >
            Logout
          </a>
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-[#4f6d2f]">
              <img
                className="w-full h-full object-cover object-top"
                src={mamidiprofile}
                alt="Mamidi"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

      </header>

      <main className="pt-24 pb-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#1c1c11] mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[#44483d] font-body max-w-2xl">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
        {children}
      </main>

      {/* Bottom navigation for mobile - compact floating pill */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 bg-white shadow-lg shadow-black/5 border border-[#e5e3d0] rounded-full px-3 py-2">
          {navItems.map((item) => {
            const active = title === item.label;
            const Icon =
              item.label.includes("Product")
                ? MdInventory2
                : item.label.includes("Order")
                ? MdLocalShipping
                : MdAnalytics;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                  active
                    ? "bg-[#385419] text-white"
                    : "text-[#44483d] hover:bg-[#f6f4e1]"
                }`}
              >
                {Icon && <Icon className="text-base leading-none" />}
                <span>{item.label.split(" ")[0]}</span>
              </a>
            );
          })}
          <a
            href="/"
            className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#f6f4e1] text-[#385419] hover:bg-[#e5e3d0] transition"
          >
            <span className="material-symbols-outlined text-base leading-none">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export function PrimaryButton({ children, icon, ...props }) {
  return (
    <button
      className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#385419] to-[#4f6d2f] text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-95 active:scale-95 transition-all"
      {...props}
    >
      {icon ? <span className="material-symbols-outlined">{icon}</span> : null}
      <span className="font-label font-bold tracking-wide">{children}</span>
    </button>
  );
}

export function GhostButton({ children, icon, ...props }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#c4c8b9] text-[#385419] hover:bg-[#f6f4e1] transition-colors"
      {...props}
    >
      {icon ? <span className="material-symbols-outlined text-sm">{icon}</span> : null}
      <span className="font-semibold text-sm">{children}</span>
    </button>
  );
}

export function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`bg-[#f6f4e1] rounded-2xl p-6 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

export function Badge({ tone = "primary", children }) {
  const toneClass =
    tone === "warning"
      ? "bg-[#fed65b] text-[#745c00]"
      : tone === "success"
      ? "bg-[#caeea1] text-[#324e14]"
      : tone === "error"
      ? "bg-[#ffdad6] text-[#93000a]"
      : "bg-[#4f6d2f] text-white";
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${toneClass}`}>
      {children}
    </span>
  );
}
