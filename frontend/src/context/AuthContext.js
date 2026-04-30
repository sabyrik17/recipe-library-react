import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  getCurrentUser,
  login as loginRequest,
  register as registerRequest,
} from "../services/authService";
import { STORAGE_KEYS } from "../utils/storageKeys";
import { useFeedback } from "./FeedbackContext";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.authUser, null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(Boolean(user?.token));
  const { showFeedback } = useFeedback();

  useEffect(() => {
    async function validateStoredSession() {
      if (!user?.token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const refreshedUser = await getCurrentUser(user.token);
        setUser(refreshedUser);
      } catch (_error) {
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    validateStoredSession();
  }, [setUser, user?.token]);

  const login = useCallback(
    async (credentials) => {
      setIsSubmitting(true);

      try {
        const authenticatedUser = await loginRequest(credentials);
        setUser(authenticatedUser);
        showFeedback(`Welcome back, ${authenticatedUser.name}.`, "success");
        return authenticatedUser;
      } catch (error) {
        showFeedback(error.message, "error");
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [setUser, showFeedback]
  );

  const register = useCallback(
    async (payload) => {
      setIsSubmitting(true);

      try {
        const authenticatedUser = await registerRequest(payload);
        setUser(authenticatedUser);
        showFeedback(`Account created. Welcome, ${authenticatedUser.name}.`, "success");
        return authenticatedUser;
      } catch (error) {
        showFeedback(error.message, "error");
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [setUser, showFeedback]
  );

  const logout = useCallback(() => {
    setUser(null);
    showFeedback("You have been logged out.", "success");
  }, [setUser, showFeedback]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.token),
      isSubmitting,
      isCheckingAuth,
      login,
      register,
      logout,
    }),
    [isCheckingAuth, isSubmitting, login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
