import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialLoginForm = {
  email: "",
  password: "",
};

const initialRegisterForm = {
  name: "",
  email: "",
  password: "",
};

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isSubmitting, login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [error, setError] = useState("");
  const redirectPath = location.state?.from?.pathname ?? "/recipes";

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
  }

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setError("");
    setLoginForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleRegisterChange(event) {
    const { name, value } = event.target;
    setError("");
    setRegisterForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();

    try {
      await login(loginForm);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleRegisterSubmit(event) {
    event.preventDefault();

    try {
      await register(registerForm);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="main-content">
      <section className="hero">
        <p className="hero__eyebrow">{mode === "login" ? "Login" : "Register"}</p>
        <h1>
          {mode === "login"
            ? "Sign in to manage your recipe workspace."
            : "Create an account and start building your own recipe collection."}
        </h1>
        <p className="hero__text">
          Authentication now uses the real backend API, JWT-based sessions, and MongoDB-backed
          users.
        </p>
      </section>

      <section className="auth-layout">
        <section className="panel">
          <h2>Account access</h2>
          <div className="auth-switcher">
            <button
              type="button"
              className={`button ${mode === "login" ? "button--primary" : "button--ghost"}`}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`button ${mode === "register" ? "button--primary" : "button--ghost"}`}
              onClick={() => switchMode("register")}
            >
              Register
            </button>
          </div>
          <p className="empty-state">
            Registration creates a real user record in MongoDB. Login returns a JWT token that the
            frontend stores and rechecks on reload.
          </p>
        </section>

        <section className="panel">
          <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          {error ? <p className="form-error">{error}</p> : null}

          {mode === "login" ? (
            <form className="recipe-form" onSubmit={handleLoginSubmit}>
              <input
                className="panel__input"
                name="email"
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
              <input
                className="panel__input"
                name="password"
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" className="button button--primary" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </form>
          ) : (
            <form className="recipe-form" onSubmit={handleRegisterSubmit}>
              <input
                className="panel__input"
                name="name"
                placeholder="Your name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                required
              />
              <input
                className="panel__input"
                name="email"
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
              />
              <input
                className="panel__input"
                name="password"
                type="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />
              <button type="submit" className="button button--primary" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Register"}
              </button>
            </form>
          )}

          <p className="empty-state">
            Want to explore first? <Link to="/">Go back home</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
