import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  resetRecipes,
  updateRecipe,
} from "../services/recipeService";
import { calculateRecipeStats, getRecipeCategories, sortRecipes } from "../utils/recipeUtils";
import { STORAGE_KEYS } from "../utils/storageKeys";
import { useAuth } from "./AuthContext";
import { useFeedback } from "./FeedbackContext";

const defaultFilters = {
  searchTerm: "",
  selectedCategory: "All",
  sortOption: "newest",
};

const RecipesContext = createContext(null);

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useLocalStorage(STORAGE_KEYS.favorites, []);
  const [filters, setFilters] = useLocalStorage(STORAGE_KEYS.filters, defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { showFeedback } = useFeedback();
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 250);

  const loadRecipes = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getRecipes();
      setRecipes(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  useEffect(() => {
    if (recipes.length === 0) {
      return;
    }

    const validRecipeIds = new Set(recipes.map((recipe) => String(recipe.id)));

    setFavoriteIds((currentFavorites) => {
      const normalizedFavorites = currentFavorites
        .map((favoriteId) => String(favoriteId))
        .filter((favoriteId) => validRecipeIds.has(favoriteId));

      const hasChanged =
        normalizedFavorites.length !== currentFavorites.length ||
        normalizedFavorites.some((favoriteId, index) => favoriteId !== currentFavorites[index]);

      return hasChanged ? normalizedFavorites : currentFavorites;
    });
  }, [recipes, setFavoriteIds]);

  const categories = useMemo(() => getRecipeCategories(recipes), [recipes]);
  const stats = useMemo(() => calculateRecipeStats(recipes), [recipes]);

  const favoriteRecipes = useMemo(
    () => recipes.filter((recipe) => favoriteIds.includes(String(recipe.id))),
    [favoriteIds, recipes]
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory =
        filters.selectedCategory === "All" || recipe.category === filters.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearchTerm, filters.selectedCategory, recipes]);

  const sortedRecipes = useMemo(
    () => sortRecipes(filteredRecipes, filters.sortOption),
    [filteredRecipes, filters.sortOption]
  );

  const updateFilters = useCallback(
    (nextFilters) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        ...nextFilters,
      }));
    },
    [setFilters]
  );

  const toggleFavorite = useCallback(
    (recipeId) => {
      const normalizedRecipeId = String(recipeId);

      setFavoriteIds((currentFavorites) =>
        currentFavorites.includes(normalizedRecipeId)
          ? currentFavorites.filter((id) => id !== normalizedRecipeId)
          : [...currentFavorites, normalizedRecipeId]
      );
    },
    [setFavoriteIds]
  );

  const addRecipe = useCallback(
    async (recipeData) => {
      setIsSaving(true);

      try {
        const createdRecipe = await createRecipe(recipeData, user?.token);
        setRecipes((currentRecipes) => [createdRecipe, ...currentRecipes]);
        updateFilters({
          searchTerm: "",
          selectedCategory: "All",
        });
        showFeedback("Recipe created successfully.", "success");
        return createdRecipe;
      } catch (error) {
        showFeedback(error.message, "error");
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [showFeedback, updateFilters, user?.token]
  );

  const editRecipe = useCallback(
    async (recipeId, recipeData) => {
      setIsSaving(true);

      try {
        const updatedRecipe = await updateRecipe(recipeId, recipeData, user?.token);
        setRecipes((currentRecipes) =>
          currentRecipes.map((recipe) =>
            String(recipe.id) === String(recipeId) ? updatedRecipe : recipe
          )
        );
        showFeedback("Recipe updated successfully.", "success");
        return updatedRecipe;
      } catch (error) {
        showFeedback(error.message, "error");
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [showFeedback, user?.token]
  );

  const removeRecipe = useCallback(
    async (recipeId) => {
      setIsSaving(true);

      try {
        await deleteRecipe(recipeId, user?.token);
        setRecipes((currentRecipes) =>
          currentRecipes.filter((recipe) => String(recipe.id) !== String(recipeId))
        );
        setFavoriteIds((currentFavorites) =>
          currentFavorites.filter((id) => id !== String(recipeId))
        );
        showFeedback("Recipe deleted.", "success");
      } catch (error) {
        showFeedback(error.message, "error");
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [setFavoriteIds, showFeedback, user?.token]
  );

  const restoreSeedData = useCallback(async () => {
    setIsSaving(true);

    try {
      const seededRecipes = await resetRecipes(user?.token);
      setRecipes(seededRecipes);
      setFavoriteIds([]);
      setFilters(defaultFilters);
      showFeedback("Demo recipe data restored.", "success");
    } catch (error) {
      showFeedback(error.message, "error");
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [setFavoriteIds, setFilters, showFeedback, user?.token]);

  const reloadRecipes = useCallback(async () => {
    await loadRecipes();
  }, [loadRecipes]);

  const value = useMemo(
    () => ({
      recipes,
      categories,
      stats,
      favoriteIds,
      favoriteRecipes,
      filters,
      sortedRecipes,
      isLoading,
      isSaving,
      error,
      setSearchTerm: (searchTerm) => updateFilters({ searchTerm }),
      setSelectedCategory: (selectedCategory) => updateFilters({ selectedCategory }),
      setSortOption: (sortOption) => updateFilters({ sortOption }),
      toggleFavorite,
      addRecipe,
      editRecipe,
      removeRecipe,
      reloadRecipes,
      restoreSeedData,
    }),
    [
      addRecipe,
      categories,
      editRecipe,
      error,
      favoriteIds,
      favoriteRecipes,
      filters,
      isLoading,
      isSaving,
      recipes,
      reloadRecipes,
      removeRecipe,
      restoreSeedData,
      sortedRecipes,
      stats,
      toggleFavorite,
      updateFilters,
    ]
  );

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

export function useRecipes() {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error("useRecipes must be used within RecipesProvider");
  }

  return context;
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
