import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { FeedbackProvider } from "./context/FeedbackContext";
import { RecipesProvider } from "./context/RecipesContext";
import { ThemeProvider } from "./context/ThemeContext";

beforeEach(() => {
  window.localStorage.clear();
  window.history.pushState({}, "", "/");
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    headers: {
      get: () => "application/json",
    },
    json: async () => [],
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders public navigation and login entrypoint", async () => {
  render(
    <FeedbackProvider>
      <ThemeProvider>
        <AuthProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </AuthProvider>
      </ThemeProvider>
    </FeedbackProvider>
  );

  expect(screen.getAllByText(/recipe library/i)[0]).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: "Home" })).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: "Login" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Favorites" })).not.toBeInTheDocument();
});

test("redirects protected routes to login when user is not authenticated", async () => {
  window.history.pushState({}, "", "/favorites");

  render(
    <FeedbackProvider>
      <ThemeProvider>
        <AuthProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </AuthProvider>
      </ThemeProvider>
    </FeedbackProvider>
  );

  expect(await screen.findByRole("heading", { name: /welcome back/i })).toBeInTheDocument();
});

test("renders custom not found page for unmatched routes", async () => {
  window.history.pushState({}, "", "/unknown-route");

  render(
    <FeedbackProvider>
      <ThemeProvider>
        <AuthProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </AuthProvider>
      </ThemeProvider>
    </FeedbackProvider>
  );

  expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
});
