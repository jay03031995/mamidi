import { apiFetch, withQuery } from "./client";

// Pending backend implementation. Contract captured in the summary.
const BASE = "/analytics";

export async function getRevenueSummary(range = "30d") {
  return apiFetch(withQuery(`${BASE}/revenue`, { range }));
}

export async function getOrderStats(range = "30d") {
  return apiFetch(withQuery(`${BASE}/orders`, { range }));
}

export async function getBestSellers(range = "90d", limit = 5) {
  return apiFetch(withQuery(`${BASE}/best-sellers`, { range, limit }));
}

export async function getActivityFeed({ limit = 10 } = {}) {
  return apiFetch(withQuery(`${BASE}/activity`, { limit }));
}
