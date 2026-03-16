import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <section className="panel">
      <label className="panel__label" htmlFor="recipe-search">
        Search recipes
      </label>
      <input
        id="recipe-search"
        className="panel__input"
        type="search"
        placeholder="Type a recipe name"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
}
