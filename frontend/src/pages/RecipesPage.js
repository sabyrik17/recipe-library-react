import { Outlet, useNavigate, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortControl from "../components/SortControl";
import FavoritesPanel from "../components/FavoritesPanel";
import RecipeList from "../components/RecipeList";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusMessage from "../components/StatusMessage";
import { useRecipes } from "../context/RecipesContext";

export default function RecipesPage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const {
    categories,
    favoriteIds,
    filters,
    sortedRecipes,
    isLoading,
    error,
    setSearchTerm,
    setSelectedCategory,
    setSortOption,
    toggleFavorite,
    reloadRecipes,
  } = useRecipes();

  function handleSelectRecipe(recipeId) {
    navigate(`/recipes/${recipeId}`);
  }

  if (isLoading) {
    return (
      <main className="main-content">
        <LoadingSpinner label="Loading recipes from the service layer..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <StatusMessage
          title="Could not load recipes"
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
        <p className="hero__eyebrow">Recipes</p>
        <h1>Browse, filter, and open recipe details with nested routes.</h1>
        <p className="hero__text">
          This page keeps the recipe list visible while the right side changes between the overview,
          recipe details, and edit form.
        </p>
      </section>

      <section className="main-content__controls">
        <SearchBar value={filters.searchTerm} onChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          value={filters.selectedCategory}
          onChange={setSelectedCategory}
        />
        <SortControl value={filters.sortOption} onChange={setSortOption} />
        <FavoritesPanel onSelectRecipe={handleSelectRecipe} />
      </section>

      <section className="main-content__layout">
        <RecipeList
          recipes={sortedRecipes}
          selectedRecipeId={recipeId || null}
          favoriteIds={favoriteIds}
          onSelectRecipe={handleSelectRecipe}
          onToggleFavorite={toggleFavorite}
        />
        <div className="main-content__sidebar">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
