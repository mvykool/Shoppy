import { BrowserRouter } from "react-router";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
