import { Routes, Route } from "react-router";
import Home from "./views/HomeView";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
