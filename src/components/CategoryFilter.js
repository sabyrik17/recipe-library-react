import React from "react";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <section className="panel">
      <label className="panel__label" htmlFor="recipe-category">
        Category
      </label>
      <select
        id="recipe-category"
        className="panel__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  );
}
