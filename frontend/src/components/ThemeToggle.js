import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const themeLabel = theme === "light" ? "Light" : "Dark";

  return (
    <div className="theme-toggle" aria-live="polite">
      <span className="theme-toggle__status">Theme: {themeLabel}</span>
      <button type="button" className="theme-toggle__button" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
