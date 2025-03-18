import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { LoginForm } from "../components/auth/LoginForm";

const LoginView: React.FC = () => {
  //ok so this will be the wrapper with the loginForm component, i need to create a error useStata
  //a function to handle login logic, use useAuth login
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (name: string, email: string) => {
    //here we need to check that the strings aren't not only empty
    //but also that there's no white space
    if (!name.trim() || !email.trim()) {
      setError("please enter both name and email");
      return;
    }

    setError(null);

    try {
      await login(name, email);
      navigate("/");
    } catch (error) {
      setError("error");
      console.log(error);
      throw new Error();
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 px-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-black  p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-Coltext">Logo</h1>
          <p className="text-gray-600 mt-2">subtitle</p>
        </div>

        <LoginForm onSubmit={handleLogin} error={error} />

        <div className="mt-6 text-center text-sm text-gray-500">some text</div>
      </div>
    </div>
  );
};

export default LoginView;
