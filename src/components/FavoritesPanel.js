import React from "react";

export default function FavoritesPanel({ recipes, favoriteIds, onSelectRecipe }) {
  const favoriteRecipes = recipes.filter((recipe) => favoriteIds.includes(recipe.id));

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Favorites</h2>
        <span>{favoriteRecipes.length}</span>
      </div>
      {favoriteRecipes.length === 0 ? (
        <p className="empty-state">Your saved recipes will appear here.</p>
      ) : (
        <div className="favorites-list">
          {favoriteRecipes.map((recipe) => (
            <button
              key={recipe.id}
              type="button"
              className="favorite-chip"
              onClick={() => onSelectRecipe(recipe.id)}
            >
              {recipe.title}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
