import { BrowserRouter } from "react-router";
import Router from "./Router";
import { AuthProvider } from "./context/AuthProvider";
import { Layout } from "./components/layout/Layout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Router />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
