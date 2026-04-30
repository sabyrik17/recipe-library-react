import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute() {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const location = useLocation();

  if (isCheckingAuth) {
    return <LoadingSpinner label="Checking your saved session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
