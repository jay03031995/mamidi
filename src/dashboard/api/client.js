const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://mamidi-backend-qyso.onrender.com/api";

/**
 * Lightweight fetch wrapper for JSON APIs.
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const { body, headers, ...rest } = options;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(url, {
    headers: isFormData
      ? { ...headers }
      : {
          "Content-Type": "application/json",
          ...headers,
        },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
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
