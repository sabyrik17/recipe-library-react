import React from "react";
import PropTypes from "prop-types";
import "./MainContent.css";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortControl from "./SortControl";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import AddRecipeForm from "./AddRecipeForm";
import FavoritesPanel from "./FavoritesPanel";
import StatsPanel from "./StatsPanel";
import { recipePropType } from "./RecipeCard";

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
          This app is for students and busy people who want one place to search, open, save, and add
          recipes.
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

MainContent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoriteIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  selectedRecipe: recipePropType,
  selectedRecipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sortOption: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    totalRecipes: PropTypes.number.isRequired,
    totalIngredients: PropTypes.number.isRequired,
    customRecipes: PropTypes.number.isRequired,
    byCategory: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  sortedRecipes: PropTypes.arrayOf(recipePropType).isRequired,
  editingRecipe: recipePropType,
  onAddRecipe: PropTypes.func.isRequired,
  onCancelEditingRecipe: PropTypes.func.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
  onStartEditingRecipe: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onUpdateRecipe: PropTypes.func.isRequired,
};
