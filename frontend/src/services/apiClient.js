import { STORAGE_KEYS } from "../utils/storageKeys";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function buildHeaders(token, hasBody) {
  const headers = {};

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}

export async function apiRequest(endpoint, options = {}) {
  if (window.localStorage.getItem(STORAGE_KEYS.forceApiError) === "true") {
    throw new Error("Simulated API failure. Disable it in Settings and try again.");
  }

  const { body, method = "GET", token } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: buildHeaders(token, body !== undefined),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  return parseResponse(response);
}
