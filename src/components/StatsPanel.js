import React from "react";

export default function StatsPanel({ stats }) {
  const topCategory =
    Object.entries(stats.byCategory).sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1])[0] ??
    null;

  return (
    <section className="panel stats-panel">
      <div className="panel__header">
        <h2>Recipe stats</h2>
        <span>{stats.totalRecipes} total</span>
      </div>
      <div className="stats-panel__grid">
        <article className="stats-card">
          <span className="stats-card__label">Ingredients tracked</span>
          <strong>{stats.totalIngredients}</strong>
        </article>
        <article className="stats-card">
          <span className="stats-card__label">Your added recipes</span>
          <strong>{stats.customRecipes}</strong>
        </article>
        <article className="stats-card">
          <span className="stats-card__label">Top category</span>
          <strong>{topCategory ? `${topCategory[0]} (${topCategory[1]})` : "No data yet"}</strong>
        </article>
      </div>
    </section>
  );
}
