import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { recipePropType } from "./RecipeCard";

const emptyForm = {
  title: "",
  category: "Dinner",
  time: "",
  image: "",
  description: "",
  ingredients: "",
  steps: "",
};

function createFormState(recipe) {
  if (!recipe) {
    return emptyForm;
  }

  return {
    title: recipe.title,
    category: recipe.category,
    time: recipe.time,
    image: recipe.image || "",
    description: recipe.description,
    ingredients: recipe.ingredients.join("\n"),
    steps: recipe.steps.join("\n"),
  };
}

AddRecipeForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  editingRecipe: recipePropType,
  onAddRecipe: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onUpdateRecipe: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export default function AddRecipeForm({
  categories,
  editingRecipe,
  onAddRecipe,
  onCancelEdit,
  onUpdateRecipe,
  isSubmitting,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const titleInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const ingredientsInputRef = useRef(null);
  const stepsInputRef = useRef(null);

  useEffect(() => {
    setForm(createFormState(editingRecipe));
    setError("");
  }, [editingRecipe]);

  function handleChange(event) {
    const { name, value } = event.target;
    setError("");
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const time = form.time.trim();
    const image = form.image.trim();
    const description = form.description.trim();

    const ingredients = form.ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const steps = form.steps
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!title || !time || !description) {
      setError("Please fill in the title, cooking time, and description.");
      if (!title) {
        titleInputRef.current?.focus();
      } else if (!time) {
        timeInputRef.current?.focus();
      } else {
        descriptionInputRef.current?.focus();
      }
      return;
    }

    if (!image) {
      setError("Please add an image URL for the recipe.");
      imageInputRef.current?.focus();
      return;
    }

    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      ingredientsInputRef.current?.focus();
      return;
    }

    if (steps.length === 0) {
      setError("Please add at least one cooking step.");
      stepsInputRef.current?.focus();
      return;
    }

    const recipeData = {
      title,
      category: form.category,
      time,
      image,
      description,
      ingredients,
      steps,
    };

    try {
      if (editingRecipe) {
        await onUpdateRecipe(recipeData);
      } else {
        await onAddRecipe(recipeData);
      }

      setForm(emptyForm);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  function handleCancelClick() {
    setForm(emptyForm);
    setError("");
    onCancelEdit();
  }

  return (
    <section className="panel">
      <h2>{editingRecipe ? "Edit your recipe" : "Add your recipe"}</h2>
      {error ? <p className="form-error">{error}</p> : null}
      <form className="recipe-form" onSubmit={handleSubmit}>
        <input
          ref={titleInputRef}
          className="panel__input"
          name="title"
          placeholder="Recipe title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <select
          className="panel__input"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories
            .filter((category) => category !== "All")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
        <input
          ref={timeInputRef}
          className="panel__input"
          name="time"
          placeholder="Cooking time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <input
          ref={imageInputRef}
          className="panel__input"
          name="image"
          placeholder="Recipe image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <textarea
          ref={descriptionInputRef}
          className="panel__input panel__textarea"
          name="description"
          placeholder="Short recipe description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <textarea
          ref={ingredientsInputRef}
          className="panel__input panel__textarea"
          name="ingredients"
          placeholder="One ingredient per line"
          value={form.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          ref={stepsInputRef}
          className="panel__input panel__textarea"
          name="steps"
          placeholder="One step per line"
          value={form.steps}
          onChange={handleChange}
          required
        />
        <div className="recipe-form__actions">
          <button type="submit" className="button button--primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : editingRecipe ? "Save changes" : "Add recipe"}
          </button>
          {editingRecipe ? (
            <button type="button" className="button button--secondary" onClick={handleCancelClick}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
