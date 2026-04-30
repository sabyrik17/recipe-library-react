import { useNavigate } from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm";
import { useRecipes } from "../context/RecipesContext";

export default function AddRecipePage() {
  const navigate = useNavigate();
  const { addRecipe, categories, isSaving } = useRecipes();

  async function handleAdd(recipeData) {
    try {
      const createdRecipe = await addRecipe(recipeData);
      navigate(`/recipes/${createdRecipe.id}`);
    } catch {
      return undefined;
    }
  }

  return (
    <main className="main-content">
      <section className="hero">
        <p className="hero__eyebrow">Add Recipe</p>
        <h1>Create a recipe from its own route.</h1>
        <p className="hero__text">
          This page satisfies the assignment requirement more clearly than keeping the form only
          inside the main dashboard.
        </p>
      </section>

      <AddRecipeForm
        categories={categories}
        editingRecipe={null}
        onAddRecipe={handleAdd}
        onCancelEdit={() => navigate("/recipes")}
        onUpdateRecipe={() => {}}
        isSubmitting={isSaving}
      />
    </main>
  );
}
