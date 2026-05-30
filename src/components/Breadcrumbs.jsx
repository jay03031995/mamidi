import React from "react";
import { Link } from "react-router-dom";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "../utils/seo";

/**
 * Accessible breadcrumb trail + BreadcrumbList structured data.
 * `items`: [{ name, path }] — the last item is rendered as the current page.
 */
const Breadcrumbs = ({ items = [], className = "" }) => {
  if (!items.length) return null;

  return (
    <>
      <JsonLd id="breadcrumbs" data={breadcrumbSchema(items)} />

      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8A9A6A]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.path || item.name} className="flex items-center gap-1.5">
                {isLast || !item.path ? (
                  <span className="text-[#4A5E30]" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="transition-colors duration-200 hover:text-[#C8A020]"
                  >
                    {item.name}
                  </Link>
                )}

                {!isLast && <span className="text-[#C8A020]/60">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
