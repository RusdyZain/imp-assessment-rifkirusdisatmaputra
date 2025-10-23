const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error ${res.status}`);
  }
  return res.json();
}
