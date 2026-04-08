import { apiFetch, withQuery } from "./client";

const BASE = "/products";

export async function listProducts({ page = 1, limit = 20, search } = {}) {
  return apiFetch(withQuery(`${BASE}/`, { page, limit, search }));
}

export async function getProduct(id) {
  return apiFetch(`${BASE}/${id}`);
}

function normalizePayload(input) {
  const {
    title,
    category,
    price,
    description,
    main,
    gallery = [],
    occasion,
    material,
    colour,
    dimensions,
    pages,
    print,
  } = input;

  return {
    title,
    Type: category, // aligns to schema field "Type"
    price: price?.toString(),
    description,
    main,
    sideimg1: gallery[0],
    sideimg2: gallery[1],
    sideimg3: gallery[2],
    sideimg4: gallery[3],
    Occasion: occasion,
    Material: material,
    Colour: colour,
    Dimensions: dimensions,
    Pages: pages,
    Print: print,
  };
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
