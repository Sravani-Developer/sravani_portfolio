export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://portfolio-api-kap0.onrender.com";

export function getAdminToken() {
  return localStorage.getItem("portfolio_admin_token") || "";
}

export function setAdminToken(token) {
  localStorage.setItem("portfolio_admin_token", token);
}

export function clearAdminToken() {
  localStorage.removeItem("portfolio_admin_token");
}

export class ApiRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
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
    throw new ApiRequestError(data.error || "API request failed", response.status);
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
