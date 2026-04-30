import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const FeedbackContext = createContext(null);

const initialState = {
  message: "",
  type: "success",
};

function feedbackReducer(state, action) {
  if (action.type === "SHOW_FEEDBACK") {
    return {
      message: action.payload.message,
      type: action.payload.type,
    };
  }

  if (action.type === "CLEAR_FEEDBACK") {
    return initialState;
  }

  return state;
}

export function FeedbackProvider({ children }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  useEffect(() => {
    if (!state.message) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: "CLEAR_FEEDBACK" });
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [state.message]);

  function showFeedback(message, type = "success") {
    dispatch({
      type: "SHOW_FEEDBACK",
      payload: { message, type },
    });
  }

  function clearFeedback() {
    dispatch({ type: "CLEAR_FEEDBACK" });
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback: state,
        showFeedback,
        clearFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }

  return context;
}

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
