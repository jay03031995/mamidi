// Canonical site origin (no trailing slash) — used for SEO / structured data.
export const SITE_URL = "https://mamidi.in";

// Single source of truth for the studio's WhatsApp number.
// Used by checkout, product order buttons, contact form, and footer.
export const WHATSAPP_NUMBER = "919885866281";

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
