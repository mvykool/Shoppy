import { Routes, Route } from "react-router";
import Home from "./views/HomeView";
import LoginView from "./views/LoginView";
import SearchView from "./views/SearchView";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<SearchView />} />
    </Routes>
  );
};

export default Router;
