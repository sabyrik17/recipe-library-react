import { Navigate, useNavigate, useParams } from "react-router-dom";
import RecipeDetails from "../components/RecipeDetails";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeDetailsPage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { favoriteIds, recipes, isSaving, removeRecipe, toggleFavorite } = useRecipes();
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  async function handleDelete() {
    try {
      await removeRecipe(recipe.id);
      navigate("/recipes");
    } catch {
      return undefined;
    }
  }

  function handleEdit() {
    navigate(`/recipes/${recipe.id}/edit`);
  }

  return (
    <RecipeDetails
      recipe={recipe}
      isFavorite={favoriteIds.includes(recipe.id)}
      onDeleteRecipe={handleDelete}
      onEditRecipe={handleEdit}
      onToggleFavorite={toggleFavorite}
      isSaving={isSaving}
    />
  );
}
