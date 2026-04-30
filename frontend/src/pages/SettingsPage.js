import useLocalStorage from "../hooks/useLocalStorage";
import { useRecipes } from "../context/RecipesContext";
import { STORAGE_KEYS } from "../utils/storageKeys";

export default function SettingsPage() {
  const [forceApiError, setForceApiError] = useLocalStorage(STORAGE_KEYS.forceApiError, false);
  const { isSaving, restoreSeedData } = useRecipes();

  async function handleRestoreData() {
    try {
      await restoreSeedData();
    } catch {
      return undefined;
    }
  }

  return (
    <main className="main-content">
      <section className="hero">
        <p className="hero__eyebrow">Settings</p>
        <h1>Control persistence and demo behavior.</h1>
        <p className="hero__text">
          This page helps during defense: you can reset recipe data and simulate API failures to
          prove your error handling works with the real backend too.
        </p>
      </section>

      <section className="page-grid">
        <section className="panel">
          <h2>API behavior</h2>
          <label className="settings-toggle" htmlFor="force-api-error">
            <input
              id="force-api-error"
              type="checkbox"
              checked={Boolean(forceApiError)}
              onChange={(event) => setForceApiError(event.target.checked)}
            />
            <span>Simulate API failures for all requests</span>
          </label>
          <p className="empty-state">
            Turn this on before opening recipes or submitting a form to demonstrate loading and
            error states live.
          </p>
        </section>

        <section className="panel">
          <h2>Demo data</h2>
          <p className="empty-state">
            Restore the original seeded recipes if you want to clean up custom entries before the
            defense.
          </p>
          <button
            type="button"
            className="button button--secondary"
            onClick={handleRestoreData}
            disabled={isSaving}
          >
            {isSaving ? "Restoring..." : "Restore starter recipes"}
          </button>
        </section>
      </section>
    </main>
  );
}
