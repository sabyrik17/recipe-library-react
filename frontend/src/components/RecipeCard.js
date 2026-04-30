import React from "react";
import PropTypes from "prop-types";
import getRecipeImage from "../utils/getRecipeImage";

export default function RecipeCard({ recipe, isSelected, isFavorite, onSelect, onToggleFavorite }) {
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
          <button
            type="button"
            className="button button--primary"
            onClick={() => onSelect(recipe.id)}
          >
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

export const recipePropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  steps: PropTypes.arrayOf(PropTypes.string),
  isCustom: PropTypes.bool,
});

RecipeCard.propTypes = {
  recipe: recipePropType.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
