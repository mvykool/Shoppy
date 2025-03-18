import { useState } from "react";

// create interface to handle submit form, and error
interface LoginFormProp {
  onSubmit: (name: string, email: string) => Promise<void>;
  error: string | null;
}
export const LoginForm = ({ onSubmit, error }: LoginFormProp) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return <div></div>;
};
