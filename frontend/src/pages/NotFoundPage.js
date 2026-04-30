import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="main-content">
      <section className="panel">
        <h2>Page not found</h2>
        <p className="empty-state">The route does not exist. Use the navigation to get back.</p>
        <Link className="button button--primary" to="/">
          Go home
        </Link>
      </section>
    </main>
  );
}
