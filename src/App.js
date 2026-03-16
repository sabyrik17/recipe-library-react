import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import initialRecipes from "./data/initialRecipes";

const RECIPES_STORAGE_KEY = "recipe-library-recipes";
const FAVORITES_STORAGE_KEY = "recipe-library-favorites";

function getStoredRecipes() {
  const savedRecipes = localStorage.getItem(RECIPES_STORAGE_KEY);
  return savedRecipes ? JSON.parse(savedRecipes) : initialRecipes;
}

function getStoredFavorites() {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
  return savedFavorites ? JSON.parse(savedFavorites) : [];
}

function App() {
  const [recipes, setRecipes] = useState(getStoredRecipes);
  const [favoriteIds, setFavoriteIds] = useState(getStoredFavorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedRecipeId, setSelectedRecipeId] = useState(getStoredRecipes()[0]?.id ?? null);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  useEffect(() => {
    localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const categories = ["All", ...new Set(recipes.map((recipe) => recipe.category))];

  const stats = recipes.reduce(
    (summary, recipe) => {
      summary.totalRecipes += 1;
      summary.totalIngredients += recipe.ingredients.length;
      summary.customRecipes += recipe.isCustom ? 1 : 0;
      summary.byCategory[recipe.category] = (summary.byCategory[recipe.category] || 0) + 1;
      return summary;
    },
    {
      totalRecipes: 0,
      totalIngredients: 0,
      customRecipes: 0,
      byCategory: {},
    }
  );

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ? true : recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedRecipes = [...filteredRecipes].sort((firstRecipe, secondRecipe) => {
    if (sortOption === "title-asc") {
      return firstRecipe.title.localeCompare(secondRecipe.title);
    }

    if (sortOption === "title-desc") {
      return secondRecipe.title.localeCompare(firstRecipe.title);
    }

    if (sortOption === "time-asc") {
      const firstTime = Number.parseInt(firstRecipe.time, 10) || 0;
      const secondTime = Number.parseInt(secondRecipe.time, 10) || 0;
      return firstTime - secondTime;
    }

    return secondRecipe.id - firstRecipe.id;
  });

  const selectedRecipe =
    recipes.find((recipe) => recipe.id === selectedRecipeId) ?? sortedRecipes[0] ?? null;
  const editingRecipe = recipes.find((recipe) => recipe.id === editingRecipeId) ?? null;

  function handleSelectRecipe(recipeId) {
    setSelectedRecipeId(recipeId);
  }

  function handleToggleFavorite(recipeId) {
    setFavoriteIds((currentFavorites) =>
      currentFavorites.includes(recipeId)
        ? currentFavorites.filter((id) => id !== recipeId)
        : [...currentFavorites, recipeId]
    );
  }

  function handleAddRecipe(recipe) {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      isCustom: true,
    };

    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
    setSelectedRecipeId(newRecipe.id);
    setSelectedCategory("All");
    setSearchTerm("");
    setEditingRecipeId(null);
  }

  function handleStartEditingRecipe(recipeId) {
    setEditingRecipeId(recipeId);
    setSelectedRecipeId(recipeId);
  }

  function handleCancelEditingRecipe() {
    setEditingRecipeId(null);
  }

  function handleUpdateRecipe(updatedRecipe) {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === editingRecipeId
          ? {
              ...recipe,
              ...updatedRecipe,
            }
          : recipe
      )
    );
    setEditingRecipeId(null);
  }

  function handleDeleteRecipe(recipeId) {
    setRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== recipeId));
    setFavoriteIds((currentFavorites) => currentFavorites.filter((id) => id !== recipeId));
    setSelectedRecipeId((currentSelectedId) => (currentSelectedId === recipeId ? null : currentSelectedId));
    setEditingRecipeId((currentEditingId) => (currentEditingId === recipeId ? null : currentEditingId));
  }

  return (
    <div className="App">
      <Header recipeCount={recipes.length} favoriteCount={favoriteIds.length} />
      <MainContent
        categories={categories}
        favoriteIds={favoriteIds}
        recipes={recipes}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedRecipe={selectedRecipe}
        selectedRecipeId={selectedRecipeId}
        sortOption={sortOption}
        stats={stats}
        sortedRecipes={sortedRecipes}
        editingRecipe={editingRecipe}
        onAddRecipe={handleAddRecipe}
        onCancelEditingRecipe={handleCancelEditingRecipe}
        onDeleteRecipe={handleDeleteRecipe}
        onSearchChange={setSearchTerm}
        onSelectCategory={setSelectedCategory}
        onSelectRecipe={handleSelectRecipe}
        onStartEditingRecipe={handleStartEditingRecipe}
        onSortChange={setSortOption}
        onToggleFavorite={handleToggleFavorite}
        onUpdateRecipe={handleUpdateRecipe}
      />
      <Footer />
    </div>
  );
}

export default App;
