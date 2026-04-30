import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useRecipes } from "../context/RecipesContext";

const publicNavItems = [
  { to: "/", label: "Home" },
  { to: "/login", label: "Login" },
];

const privateNavItems = [
  { to: "/recipes", label: "Recipes" },
  { to: "/favorites", label: "Favorites" },
  { to: "/stats", label: "Stats" },
  { to: "/add", label: "Add recipe" },
  { to: "/settings", label: "Settings" },
];

export default function Header() {
  const { favoriteRecipes, recipes } = useRecipes();
  const { isAuthenticated, logout, user } = useAuth();
  const navItems = isAuthenticated ? [publicNavItems[0], ...privateNavItems] : publicNavItems;

  return (
    <header className="header header--magazine">
      <div className="header__inner">
        <div className="header__top-row">
          <div className="header__brand">
            <img
              className="header__logo"
              src={`${process.env.PUBLIC_URL}/recipe-logo.png`}
              alt="Recipe Library logo"
            />
            <span className="header__title">Recipe Library</span>
          </div>
          <div className="header__actions">
            <span className="header__stat">{recipes.length} recipes</span>
            <span className="header__stat">{favoriteRecipes.length} favorites</span>
            {isAuthenticated ? (
              <span className="header__stat">Signed in as {user.name}</span>
            ) : null}
            <ThemeToggle />
            {isAuthenticated ? (
              <button type="button" className="header__action-button" onClick={logout}>
                Logout
              </button>
            ) : null}
          </div>
        </div>
        <nav className="header__nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `header__nav-link${isActive ? " header__nav-link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
