import { apiRequest } from "./apiClient";

export function getRecipes() {
  return apiRequest("/recipes");
}

export function createRecipe(payload, token) {
  return apiRequest("/recipes", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateRecipe(recipeId, payload, token) {
  return apiRequest(`/recipes/${recipeId}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteRecipe(recipeId, token) {
  return apiRequest(`/recipes/${recipeId}`, {
    method: "DELETE",
    token,
  });
}

export function resetRecipes(token) {
  return apiRequest("/recipes/seed", {
    method: "POST",
    token,
  });
}
