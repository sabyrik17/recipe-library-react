import StatsPanel from "../components/StatsPanel";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusMessage from "../components/StatusMessage";
import { useRecipes } from "../context/RecipesContext";

export default function StatsPage() {
  const { categories, recipes, stats, isLoading, error, reloadRecipes } = useRecipes();
  const categoryCards = categories
    .filter((category) => category !== "All")
    .map((category) => ({
      category,
      count: recipes.filter((recipe) => recipe.category === category).length,
    }));

  if (isLoading) {
    return (
      <main className="main-content">
        <LoadingSpinner label="Calculating recipe statistics..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <StatusMessage
          title="Could not load statistics"
          message={error}
          actionLabel="Retry"
          onAction={reloadRecipes}
          variant="error"
        />
      </main>
    );
  }

  return (
    <main className="main-content">
      <section className="hero">
        <p className="hero__eyebrow">Stats</p>
        <h1>Track what is inside the library.</h1>
        <p className="hero__text">
          Separate statistics page for the routing task: totals, custom recipes, and category
          breakdown.
        </p>
      </section>

      <StatsPanel stats={stats} />

      <section className="panel">
        <div className="panel__header">
          <h2>Category breakdown</h2>
          <span>{categoryCards.length} categories</span>
        </div>
        <div className="stats-panel__grid">
          {categoryCards.map(({ category, count }) => (
            <article key={category} className="stats-card">
              <span className="stats-card__label">{category}</span>
              <strong>{count}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
