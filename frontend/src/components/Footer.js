import React from "react";
import "./Footer.css";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Recipe Library | Current theme:{" "}
        {theme === "light" ? "Light" : "Dark"}
      </p>
    </footer>
  );
}
