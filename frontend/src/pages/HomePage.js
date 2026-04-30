import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusMessage from "../components/StatusMessage";
import StatsPanel from "../components/StatsPanel";
import { useAuth } from "../context/AuthContext";
import { useRecipes } from "../context/RecipesContext";
import getRecipeImage from "../utils/getRecipeImage";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { favoriteRecipes, recipes, stats, isLoading, error, reloadRecipes } = useRecipes();
  const featuredRecipes = recipes.slice(0, 3);

  if (isLoading) {
    return (
      <main className="main-content">
        <LoadingSpinner label="Preparing your recipe dashboard..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <StatusMessage
          title="Could not prepare the homepage"
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
      <section className="hero hero--home">
        <p className="hero__eyebrow">Recipe Library</p>
        <h1>Build a small recipe app with real navigation, not just one long screen.</h1>
        <p className="hero__text">
          Browse all recipes, open a nested detail page, track favorites, review stats, and add your
          own dishes from a dedicated route.
        </p>
        <div className="hero__actions">
          <Link className="button button--primary" to={isAuthenticated ? "/recipes" : "/login"}>
            {isAuthenticated ? "Explore recipes" : "Login to continue"}
          </Link>
          <Link className="button button--ghost" to={isAuthenticated ? "/add" : "/login"}>
            Add a new recipe
          </Link>
        </div>
      </section>

      <StatsPanel stats={stats} />

      <section className="page-grid">
        <section className="panel">
          <div className="panel__header">
            <h2>Featured recipes</h2>
            <span>{featuredRecipes.length} cards</span>
          </div>
          <div className="feature-grid">
            {featuredRecipes.map((recipe) => (
              <article key={recipe.id} className="feature-card">
                <img
                  src={getRecipeImage(recipe)}
                  alt={recipe.title}
                  className="feature-card__image"
                />
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <Link className="button button--secondary" to={`/recipes/${recipe.id}`}>
                  Open details
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Favorites preview</h2>
            <span>{favoriteRecipes.length} saved</span>
          </div>
          {favoriteRecipes.length === 0 ? (
            <p className="empty-state">
              You have not saved anything yet. Visit the recipes page and mark a few favorites.
            </p>
          ) : (
            <div className="favorites-list">
              {favoriteRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  className="favorite-chip favorite-chip--link"
                  to={`/recipes/${recipe.id}`}
                >
                  {recipe.title}
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
