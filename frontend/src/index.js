import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { FeedbackProvider } from "./context/FeedbackContext";
import { RecipesProvider } from "./context/RecipesContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FeedbackProvider>
      <ThemeProvider>
        <AuthProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </AuthProvider>
      </ThemeProvider>
    </FeedbackProvider>
  </React.StrictMode>
);
