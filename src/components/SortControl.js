import React from "react";

export default function SortControl({ value, onChange }) {
  return (
    <section className="panel">
      <label className="panel__label" htmlFor="recipe-sort">
        Sort recipes
      </label>
      <select
        id="recipe-sort"
        className="panel__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="newest">Newest first</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="time-asc">Fastest first</option>
      </select>
    </section>
  );
}
