import { Routes, Route, Navigate } from "react-router";
import Home from "./views/HomeView";
import LoginView from "./views/LoginView";
import SearchView from "./views/SearchView";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
