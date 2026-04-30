const express = require("express");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");
const validateRecipePayload = require("../utils/validateRecipePayload");
const seedRecipes = require("../data/seedRecipes");

const router = express.Router();

router.get("/", async (_request, response) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  return response.json(recipes);
});

router.post("/", authMiddleware, async (request, response) => {
  const { error, value } = validateRecipePayload(request.body);

  if (error) {
    return response.status(400).json({ message: error });
  }

  const recipe = await Recipe.create({
    ...value,
    isCustom: true,
    owner: request.user._id,
  });

  return response.status(201).json(recipe.toJSON());
});

router.put("/:recipeId", authMiddleware, async (request, response) => {
  const { error, value } = validateRecipePayload(request.body);

  if (error) {
    return response.status(400).json({ message: error });
  }

  const recipe = await Recipe.findById(request.params.recipeId);

  if (!recipe) {
    return response.status(404).json({ message: "Recipe not found." });
  }

  if (!recipe.owner || recipe.owner.toString() !== request.user._id.toString()) {
    return response.status(403).json({ message: "You can edit only your own recipes." });
  }

  Object.assign(recipe, value);
  await recipe.save();

  return response.json(recipe.toJSON());
});

router.delete("/:recipeId", authMiddleware, async (request, response) => {
  const recipe = await Recipe.findById(request.params.recipeId);

  if (!recipe) {
    return response.status(404).json({ message: "Recipe not found." });
  }

  if (!recipe.owner || recipe.owner.toString() !== request.user._id.toString()) {
    return response.status(403).json({ message: "You can delete only your own recipes." });
  }

  await recipe.deleteOne();
  return response.json({ success: true });
});

router.post("/seed", authMiddleware, async (_request, response) => {
  await Recipe.deleteMany({});
  await seedRecipes();
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  return response.json(recipes);
});

module.exports = router;
