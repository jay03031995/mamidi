import { useEffect } from "react";
import { SITE_URL } from "../constants/site";

function upsertMeta({ name, property, content }) {
  if (!content) return;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    if (name) el.setAttribute("name", name);
    else el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-page <title>, meta description, canonical, and Open Graph tags.
 * Runs on the client and — because routes are prerendered — also bakes unique
 * metadata into each page's static HTML.
 */
const Seo = ({ title, description, path = "", image }) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const desc = description ? description.replace(/\s+/g, " ").trim().slice(0, 160) : "";

    if (title) document.title = title;
    upsertMeta({ name: "description", content: desc });
    upsertMeta({ property: "og:title", content: title });
    upsertMeta({ property: "og:description", content: desc });
    upsertMeta({ property: "og:url", content: url });
    upsertMeta({ name: "twitter:title", content: title });
    upsertMeta({ name: "twitter:description", content: desc });
    if (image) {
      upsertMeta({ property: "og:image", content: image });
      upsertMeta({ name: "twitter:image", content: image });
    }
    upsertCanonical(url);
  }, [title, description, path, image]);

  return null;
};

export default Seo;
