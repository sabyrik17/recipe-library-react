import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeList from "../components/RecipeList";
import StatusMessage from "../components/StatusMessage";
import { useRecipes } from "../context/RecipesContext";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favoriteIds, favoriteRecipes, toggleFavorite, isLoading, error, reloadRecipes } =
    useRecipes();

  if (isLoading) {
    return (
      <main className="main-content">
        <LoadingSpinner label="Loading your favorite recipes..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <StatusMessage
          title="Could not load favorites"
          message={error}
          actionLabel="Retry"
          onAction={reloadRecipes}
          variant="error"
        />
      </main>
    );
  }

  return (
    <main className="main-content">
      <section className="hero">
        <p className="hero__eyebrow">Favorites</p>
        <h1>Your saved recipes live on their own route.</h1>
        <p className="hero__text">
          This page is one of the extra required routes and shows only the recipes you marked.
        </p>
      </section>

      {favoriteRecipes.length === 0 ? (
        <section className="panel">
          <h2>No favorites yet</h2>
          <p className="empty-state">Save recipes from the recipes page to see them here.</p>
          <Link className="button button--primary" to="/recipes">
            Browse recipes
          </Link>
        </section>
      ) : (
        <RecipeList
          recipes={favoriteRecipes}
          selectedRecipeId={null}
          favoriteIds={favoriteIds}
          onSelectRecipe={(recipeId) => navigate(`/recipes/${recipeId}`)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </main>
  );
}
