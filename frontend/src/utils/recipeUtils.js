export const DEFAULT_CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert"];

export function parseCookingTime(timeLabel) {
  return Number.parseInt(timeLabel, 10) || 0;
}

export function normalizeRecipe(recipe) {
  return {
    ...recipe,
    createdAt: recipe.createdAt ?? new Date().toISOString(),
    isCustom: recipe.isCustom ?? false,
  };
}

export function sanitizeRecipePayload(payload) {
  return {
    title: payload.title.trim(),
    category: payload.category,
    time: payload.time.trim(),
    image: payload.image.trim(),
    description: payload.description.trim(),
    ingredients: payload.ingredients.map((item) => item.trim()).filter(Boolean),
    steps: payload.steps.map((item) => item.trim()).filter(Boolean),
  };
}

export function sortRecipes(recipes, sortOption) {
  const items = [...recipes];

  return items.sort((firstRecipe, secondRecipe) => {
    if (sortOption === "title-asc") {
      return firstRecipe.title.localeCompare(secondRecipe.title);
    }

    if (sortOption === "title-desc") {
      return secondRecipe.title.localeCompare(firstRecipe.title);
    }

    if (sortOption === "time-asc") {
      return parseCookingTime(firstRecipe.time) - parseCookingTime(secondRecipe.time);
    }

    return new Date(secondRecipe.createdAt).getTime() - new Date(firstRecipe.createdAt).getTime();
  });
}

export function getRecipeCategories(recipes) {
  if (recipes.length === 0) {
    return ["All", ...DEFAULT_CATEGORIES];
  }

  return ["All", ...new Set(recipes.map((recipe) => recipe.category))];
}

export function calculateRecipeStats(recipes) {
  return recipes.reduce(
    (summary, recipe) => {
      summary.totalRecipes += 1;
      summary.totalIngredients += recipe.ingredients.length;
      summary.customRecipes += recipe.isCustom ? 1 : 0;
      summary.byCategory[recipe.category] = (summary.byCategory[recipe.category] || 0) + 1;
      return summary;
    },
    {
      totalRecipes: 0,
      totalIngredients: 0,
      customRecipes: 0,
      byCategory: {},
    }
  );
}
