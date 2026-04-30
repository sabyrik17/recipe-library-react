const initialRecipes = require("./initialRecipes");
const Recipe = require("../models/Recipe");

async function seedRecipes() {
  const existingRecipesCount = await Recipe.countDocuments();

  if (existingRecipesCount > 0) {
    return;
  }

  const preparedRecipes = initialRecipes.map((recipe) => ({
    ...recipe,
    isCustom: false,
    owner: null,
  }));

  await Recipe.insertMany(preparedRecipes);
}

module.exports = seedRecipes;
