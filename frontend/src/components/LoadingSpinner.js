import PropTypes from "prop-types";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <section className="panel loading-state" aria-live="polite" aria-busy="true">
      <div className="loading-state__spinner" />
      <p>{label}</p>
    </section>
  );
}

LoadingSpinner.propTypes = {
  label: PropTypes.string,
};
