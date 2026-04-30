import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import getRecipeImage from "../utils/getRecipeImage";

export default function RecipeOverviewPage() {
  const { sortedRecipes } = useRecipes();
  const recipes = sortedRecipes;
  const previewRecipe = recipes[0] ?? null;

  if (!previewRecipe) {
    return (
      <section className="panel">
        <h2>Recipe details</h2>
        <p className="empty-state">No recipes match the current filters.</p>
      </section>
    );
  }

  return (
    <>
      <section className="panel">
        <img
          className="details__image"
          src={getRecipeImage(previewRecipe)}
          alt={previewRecipe.title}
        />
        <div className="panel__header">
          <h2>{previewRecipe.title}</h2>
          <span>
            {previewRecipe.category} | {previewRecipe.time}
          </span>
        </div>
        <p>{previewRecipe.description}</p>
        <h3>Why this route matters</h3>
        <p className="empty-state">
          This is the default child route for <code>/recipes</code>. When you open a specific
          recipe, the URL changes to a nested route and this panel is replaced with recipe details.
        </p>
      </section>
      <section className="panel panel--accent">
        <h2>Nested route example</h2>
        <p>
          The recipe list stays on the left, and the content on the right is controlled by nested
          routes like <code>/recipes/{previewRecipe.id}</code>.
        </p>
        <Link className="button button--primary" to={`/recipes/${previewRecipe.id}`}>
          Open nested details
        </Link>
      </section>
    </>
  );
}
