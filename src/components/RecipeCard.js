import React from "react";
import getRecipeImage from "../utils/getRecipeImage";

export default function RecipeCard({
  recipe,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  return (
    <article className={`recipe-card${isSelected ? " recipe-card--selected" : ""}`}>
      <img className="recipe-card__image" src={getRecipeImage(recipe)} alt={recipe.title} />
      <div className="recipe-card__content">
        <div className="recipe-card__top">
          <span className="recipe-card__category">{recipe.category}</span>
          <span className="recipe-card__time">{recipe.time}</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="recipe-card__actions">
          <button type="button" className="button button--primary" onClick={() => onSelect(recipe.id)}>
            View recipe
          </button>
          <button
            type="button"
            className="button button--ghost"
            onClick={() => onToggleFavorite(recipe.id)}
          >
            {isFavorite ? "Remove favorite" : "Add favorite"}
          </button>
        </div>
      </div>
    </article>
  );
}
