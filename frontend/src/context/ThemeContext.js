import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { STORAGE_KEYS } from "../utils/storageKeys";

const ThemeContext = createContext(null);

function getStoredTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  return savedTheme === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
