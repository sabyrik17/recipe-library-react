import React from "react";
import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";
import { recipePropType } from "./RecipeCard";

export default function RecipeList({
  recipes,
  selectedRecipeId,
  favoriteIds,
  onSelectRecipe,
  onToggleFavorite,
}) {
  return (
    <section className="panel panel--stretch">
      <div className="panel__header">
        <h2>Recipe list</h2>
        <span>{recipes.length} recipes</span>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isSelected={recipe.id === selectedRecipeId}
            isFavorite={favoriteIds.includes(recipe.id)}
            onSelect={onSelectRecipe}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
      {recipes.length === 0 ? (
        <p className="empty-state">No recipes match the current filters.</p>
      ) : null}
    </section>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  selectedRecipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  favoriteIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
