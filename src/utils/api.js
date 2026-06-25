export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:4174";

export function getAdminToken() {
  return localStorage.getItem("portfolio_admin_token") || "";
}

export function setAdminToken(token) {
  localStorage.setItem("portfolio_admin_token", token);
}

export function clearAdminToken() {
  localStorage.removeItem("portfolio_admin_token");
}

export async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
}

export async function adminRequest(path, options = {}) {
  return apiRequest(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${getAdminToken()}`,
      ...(options.headers || {}),
    },
  });
}
