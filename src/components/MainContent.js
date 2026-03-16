import React from "react";
import "./MainContent.css";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortControl from "./SortControl";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import AddRecipeForm from "./AddRecipeForm";
import FavoritesPanel from "./FavoritesPanel";
import StatsPanel from "./StatsPanel";

export default function MainContent({
  categories,
  favoriteIds,
  recipes,
  searchTerm,
  selectedCategory,
  selectedRecipe,
  selectedRecipeId,
  sortOption,
  stats,
  sortedRecipes,
  editingRecipe,
  onAddRecipe,
  onCancelEditingRecipe,
  onDeleteRecipe,
  onSearchChange,
  onSelectCategory,
  onSelectRecipe,
  onStartEditingRecipe,
  onSortChange,
  onToggleFavorite,
  onUpdateRecipe,
}) {
  return (
    <main className="main-content">
      <section className="hero">
        <p className="hero__eyebrow">Recipe Library</p>
        <h1>Choose a dish fast, save it, and come back later.</h1>
        <p className="hero__text">
          This app is for students and busy people who want one place to search,
          open, save, and add recipes.
        </p>
      </section>

      <section className="main-content__controls">
        <SearchBar value={searchTerm} onChange={onSearchChange} />
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={onSelectCategory}
        />
        <SortControl value={sortOption} onChange={onSortChange} />
        <FavoritesPanel
          recipes={recipes}
          favoriteIds={favoriteIds}
          onSelectRecipe={onSelectRecipe}
        />
      </section>

      <StatsPanel stats={stats} />

      <section className="main-content__layout">
        <RecipeList
          recipes={sortedRecipes}
          selectedRecipeId={selectedRecipeId}
          favoriteIds={favoriteIds}
          onSelectRecipe={onSelectRecipe}
          onToggleFavorite={onToggleFavorite}
        />
        <div className="main-content__sidebar">
          <RecipeDetails
            recipe={selectedRecipe}
            isFavorite={selectedRecipe ? favoriteIds.includes(selectedRecipe.id) : false}
            onDeleteRecipe={onDeleteRecipe}
            onEditRecipe={onStartEditingRecipe}
            onToggleFavorite={onToggleFavorite}
          />
          <AddRecipeForm
            categories={categories}
            editingRecipe={editingRecipe}
            onAddRecipe={onAddRecipe}
            onCancelEdit={onCancelEditingRecipe}
            onUpdateRecipe={onUpdateRecipe}
          />
        </div>
      </section>
    </main>
  );
}
