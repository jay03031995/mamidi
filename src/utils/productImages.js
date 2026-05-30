// utils/productImages.js

const API_ORIGIN =
  (import.meta.env.VITE_API_BASE_URL ||
    "https://mamidi-backend-qyso.onrender.com/api")
    .replace(/\/api\/?$/, "")
    .replace(/\/+$/, "");


export const getImageUrl = (image) => {
  if (!image) return null;

  // If array → take first
  if (Array.isArray(image)) {
    return getImageUrl(image[0]);
  }

  // If object → extract value
  if (typeof image === "object") {
    return image.value || image.url || image.path || null;
  }

  // If string → already a Cloudinary URL
  if (typeof image === "string") {
    return image;
  }

  return null;
};


export const getImageUrls = (...images) => {
  return images.flatMap((image) => {
    if (!image) return [];

    if (Array.isArray(image)) {
      return image.map(getImageUrl).filter(Boolean);
    }

    return [getImageUrl(image)].filter(Boolean);
  });
};
