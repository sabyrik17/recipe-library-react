import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm";
import { useRecipes } from "../context/RecipesContext";

export default function EditRecipePage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { categories, recipes, editRecipe, isSaving } = useRecipes();
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  if (!recipe.isCustom) {
    return (
      <section className="panel">
        <h2>Editing is available only for your own recipes</h2>
        <p className="empty-state">
          Built-in demo recipes stay read-only. Add your own recipe first if you want to test the
          edit route.
        </p>
        <Link className="button button--primary" to={`/recipes/${recipe.id}`}>
          Back to details
        </Link>
      </section>
    );
  }

  async function handleUpdate(updatedRecipe) {
    try {
      await editRecipe(recipe.id, updatedRecipe);
      navigate(`/recipes/${recipe.id}`);
    } catch {
      return undefined;
    }
  }

  return (
    <AddRecipeForm
      categories={categories}
      editingRecipe={recipe}
      onAddRecipe={() => {}}
      onCancelEdit={() => navigate(`/recipes/${recipe.id}`)}
      onUpdateRecipe={handleUpdate}
      isSubmitting={isSaving}
    />
  );
}
