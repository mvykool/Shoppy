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

  //write a function to handle the login logic, an asyncronous function that takes form event as param
  //set loading true until the request is done
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    //if the inputs are empty, return nothing
    if (!name.trim() || !email.trim()) {
      return;
    }

    //loading true
    setIsLoading(true);
    try {
      //use onSubmit prop, and pass name and email
      await onSubmit(name, email);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="text-black">
      {error ? <div>error</div> : null}
      <div>
        <form onSubmit={handleLogin}>
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            name={name}
            required
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            name={email}
            required
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "loading...." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};
