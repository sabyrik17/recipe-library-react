import { useFeedback } from "../context/FeedbackContext";

export default function FeedbackBanner() {
  const { feedback, clearFeedback } = useFeedback();

  if (!feedback.message) {
    return null;
  }

  return (
    <div className={`feedback-banner feedback-banner--${feedback.type}`} role="status">
      <span>{feedback.message}</span>
      <button type="button" className="feedback-banner__close" onClick={clearFeedback}>
        Dismiss
      </button>
    </div>
  );
}
