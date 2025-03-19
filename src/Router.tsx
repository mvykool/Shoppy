import { Routes, Route, Navigate } from "react-router";
import Home from "./views/HomeView";
import LoginView from "./views/LoginView";
import SearchView from "./views/SearchView";
import { useAuth } from "./hooks/useAuth";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //import isAuthenticated from useAuth
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchView />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
