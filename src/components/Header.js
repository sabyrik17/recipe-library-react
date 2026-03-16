import React from "react";
import "./Header.css";

export default function Header({ recipeCount, favoriteCount }) {
  return (
    <header className="header header--magazine">
      <div className="header__inner">
        <div className="header__brand">
          <img
            className="header__logo"
            src={`${process.env.PUBLIC_URL}/recipe-logo.png`}
            alt="Recipe Library logo"
          />
          <span className="header__title">Recipe Library</span>
        </div>
        <div className="header__actions">
          <span className="header__stat">{recipeCount} recipes</span>
          <span className="header__stat">{favoriteCount} favorites</span>
        </div>
      </div>
    </header>
  );
}
