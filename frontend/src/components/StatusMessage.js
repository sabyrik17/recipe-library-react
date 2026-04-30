import PropTypes from "prop-types";

export default function StatusMessage({
  title,
  message,
  actionLabel,
  onAction,
  variant = "neutral",
}) {
  return (
    <section className={`panel status-message status-message--${variant}`}>
      <h2>{title}</h2>
      <p className="empty-state">{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="button button--primary" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

StatusMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  variant: PropTypes.string,
};
