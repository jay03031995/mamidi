import { apiFetch, withQuery } from "./client";

const BASE = "/products";
const SIDE_IMAGE_LIMIT = 12;

export async function listProducts({ page = 1, limit = 20, search } = {}) {
  return apiFetch(withQuery(`${BASE}/`, { page, limit, search }));
}

/**
 * Fetch EVERY product, regardless of how many pages the API splits them into.
 * Pages through `/products` (using the `total` the API returns) until the whole
 * catalog is collected, so newly-added products are never stranded on a later
 * page. Returns the same shape as listProducts: { data, total }.
 */
export async function listAllProducts({ search, pageSize = 100 } = {}) {
  const all = [];
  let page = 1;
  let total = Infinity;

  while (all.length < total) {
    const res = await apiFetch(
      withQuery(`${BASE}/`, { page, limit: pageSize, search })
    );
    const batch = Array.isArray(res?.data) ? res.data : [];
    all.push(...batch);

    total = typeof res?.total === "number" ? res.total : all.length;

    if (batch.length === 0) break; // safety: stop if a page returns nothing
    page += 1;
  }

  return { data: all, total: all.length };
}

export async function getProduct(id) {
  return apiFetch(`${BASE}/${id}`);
}

function appendValue(formData, key, value) {
  if (value === undefined || value === null || value === "") return;
  formData.append(key, value);
}

function appendImageValue(formData, key, value) {
  if (!value) return;

  if (Array.isArray(value)) {
    value.forEach((item) => appendImageValue(formData, key, item));
    return;
  }

  if (typeof value === "object") {
    const url = value.value || value.url || value.path;
    if (url) formData.append(key, url);
    return;
  }

  if (typeof value === "string" && value.includes("{")) {
    try {
      const parsed = JSON.parse(value);
      const url = parsed.value || parsed.url || parsed.path;
      if (url) formData.append(key, url);
    } catch {
      return;
    }
    return;
  }

  formData.append(key, value);
}

function normalizePayload(input) {
  const {
    title,
    category,
    price,
    description,
    main,
    mainFiles = [],
    gallery = [],
    galleryFiles = [],
    occasion,
    material,
    colour,
    dimensions,
    pages,
    print,
    isSoldOut = false,
    stock,
  } = input;

  const formData = new FormData();
  const sideImageCount = gallery.reduce((count, image, index) => {
    const files = galleryFiles[index] || [];
    return count + (files.length || (image ? 1 : 0));
  }, 0);

  if (mainFiles.length > 1) {
    throw new Error("Only one main image is allowed");
  }

  if (!mainFiles.length && !main) {
    throw new Error("One main image is required");
  }

  if (sideImageCount > SIDE_IMAGE_LIMIT) {
    throw new Error(`A product can have at most ${SIDE_IMAGE_LIMIT} side images`);
  }

  appendValue(formData, "title", title);
  appendValue(formData, "category", category);
  appendValue(formData, "price", price?.toString());
  appendValue(formData, "description", description);
  appendValue(formData, "Occasion", occasion);
  appendValue(formData, "Material", material);
  appendValue(formData, "Colour", colour);
  appendValue(formData, "Dimensions", dimensions);
  appendValue(formData, "Pages", pages);
  appendValue(formData, "Print", print);
  appendValue(formData, "stock", stock?.toString());
  appendValue(formData, "isSoldOut", isSoldOut ? "true" : "false");
  appendValue(formData, "isPurchasable", isSoldOut ? "false" : "true");

  if (mainFiles.length > 0) {
    formData.append("main", mainFiles[0]);
  } else {
    appendImageValue(formData, "main", main);
  }

  if (!gallery.length) {
    formData.append("sideImages", "[]");
  }

  gallery.forEach((image, index) => {
    const files = galleryFiles[index] || [];

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("sideImages", file);
      });
      return;
    }

    appendImageValue(formData, "sideImages", image);
  });

  return formData;
}

export async function createProduct(payload) {
  return apiFetch(`${BASE}/`, {
    method: "POST",
    body: normalizePayload(payload),
  });
}

export async function updateProduct(id, payload) {
  return apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: normalizePayload(payload),
  });
}

export async function deleteProduct(id) {
  return apiFetch(`${BASE}/${id}`, { method: "DELETE" });
}
