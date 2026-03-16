import React from "react";
import getRecipeImage from "../utils/getRecipeImage";

export default function RecipeDetails({
  recipe,
  isFavorite,
  onDeleteRecipe,
  onEditRecipe,
  onToggleFavorite,
}) {
  if (!recipe) {
    return (
      <section className="panel">
        <h2>Recipe details</h2>
        <p className="empty-state">Select a recipe to view ingredients and steps.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <img className="details__image" src={getRecipeImage(recipe)} alt={recipe.title} />
      <div className="panel__header">
        <h2>{recipe.title}</h2>
        <div className="details__actions">
          <button
            type="button"
            className="button button--ghost"
            onClick={() => onToggleFavorite(recipe.id)}
          >
            {isFavorite ? "In favorites" : "Save to favorites"}
          </button>
          {recipe.isCustom ? (
            <button
              type="button"
              className="button button--secondary"
              onClick={() => onEditRecipe(recipe.id)}
            >
              Edit recipe
            </button>
          ) : null}
          {recipe.isCustom ? (
            <button
              type="button"
              className="button button--danger"
              onClick={() => onDeleteRecipe(recipe.id)}
            >
              Delete recipe
            </button>
          ) : null}
        </div>
      </div>
      <p className="details__meta">
        {recipe.category} | {recipe.time}
      </p>
      <p>{recipe.description}</p>

      <h3>Ingredients</h3>
      <ul className="details__list">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <h3>Steps</h3>
      <ol className="details__list">
        {recipe.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
