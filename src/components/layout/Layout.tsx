import { Header } from "./Header";
import { useAuth } from "../../hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? <Header /> : null}
      <div>{children}</div>
      <div className="w-full h-10 bg-red">footer</div>
    </>
  );
};
