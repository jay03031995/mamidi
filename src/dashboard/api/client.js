const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://mamidi-backend.onrender.com/api";

/**
 * Lightweight fetch wrapper for JSON APIs.
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const { body, headers, ...rest } = options;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message;
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return data;
}

export function withQuery(path, params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return qs ? `${path}?${qs}` : path;
}
