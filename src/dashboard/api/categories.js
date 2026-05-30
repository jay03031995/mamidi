import { apiFetch } from "./client";

const BASE = "/categories";

export async function listCategories() {
  const res = await apiFetch(`${BASE}/`);
  return res.data ?? res;
}

export async function createCategory(name) {
  return apiFetch(`${BASE}/`, {
    method: "POST",
    body: { name },
  });
}

export async function updateCategory(id, name) {
  return apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: { name },
  });
}

export async function deleteCategory(id) {
  return apiFetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
}
