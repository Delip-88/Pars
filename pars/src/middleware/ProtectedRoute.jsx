import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../utils/Loader";

export const ProtectedAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch user/token from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    setUser(storedUser);
    setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  // Not authenticated → redirect to /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but not admin → go to home
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If user data is missing, still show loader
  if (!user) {
    return <Loader />;
  }

  // All good → render children
  return children;
};
