function validateRecipePayload(payload) {
  const title = payload.title?.trim();
  const category = payload.category?.trim();
  const time = payload.time?.trim();
  const image = payload.image?.trim();
  const description = payload.description?.trim();
  const ingredients = Array.isArray(payload.ingredients)
    ? payload.ingredients.map((item) => item.trim()).filter(Boolean)
    : [];
  const steps = Array.isArray(payload.steps)
    ? payload.steps.map((item) => item.trim()).filter(Boolean)
    : [];

  if (!title || !category || !time || !image || !description) {
    return { error: "All recipe fields are required." };
  }

  if (ingredients.length === 0 || steps.length === 0) {
    return { error: "Ingredients and steps must each contain at least one item." };
  }

  return {
    value: {
      title,
      category,
      time,
      image,
      description,
      ingredients,
      steps,
    },
  };
}

module.exports = validateRecipePayload;
