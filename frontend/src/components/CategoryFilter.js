import React from "react";
import PropTypes from "prop-types";

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

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
