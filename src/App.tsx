import { BrowserRouter } from "react-router";
import Router from "./Router";
import { AuthProvider } from "./context/AuthProvider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
