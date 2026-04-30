import { apiRequest } from "./apiClient";

export function login(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export function register(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function getCurrentUser(token) {
  return apiRequest("/auth/me", {
    token,
  });
}
