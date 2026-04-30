import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./components/MainContent.css";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeOverviewPage from "./pages/RecipeOverviewPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import StatsPage from "./pages/StatsPage";
import AddRecipePage from "./pages/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="App">
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="recipes" element={<RecipesPage />}>
              <Route index element={<RecipeOverviewPage />} />
              <Route path=":recipeId" element={<RecipeDetailsPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path=":recipeId/edit" element={<EditRecipePage />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="stats" element={<StatsPage />} />
              <Route path="add" element={<AddRecipePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
