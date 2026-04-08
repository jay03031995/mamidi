import { apiFetch, withQuery } from "./client";

// NOTE: Backend does not yet expose these routes. See "Missing backend APIs"
// in the summary for the proposed contract.
const BASE = "/orders";

export async function listOrders({ page = 1, limit = 20, status, search } = {}) {
  return apiFetch(withQuery(`${BASE}/`, { page, limit, status, search }));
}

export async function getOrder(id) {
  return apiFetch(`${BASE}/${id}`);
}

export async function updateOrderStatus(id, status) {
  return apiFetch(`${BASE}/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}
