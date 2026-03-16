import React from "react";
import RecipeCard from "./RecipeCard";

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
      {recipes.length === 0 ? <p className="empty-state">No recipes match the current filters.</p> : null}
    </section>
  );
}
