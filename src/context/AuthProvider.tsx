import { useState, useCallback } from "react";
import { AuthContextType, User } from "../types";
import { AuthContext } from "./AuthContext";
import api from "../services/fetchApi";

//creating interfaces to pass in props
interface AuthProps {
  children: React.ReactNode;
}

//exporting function, and passing props
export const AuthProvider = ({ children }: AuthProps) => {
  //set state to USER and null
  const [user, setUser] = useState<User | null>(null);

  //use callback to avoid render every time this is called and pass name and email to this function as parameters
  //we create an async function so it works asynchronously
  const login = useCallback(async (name: string, email: string) => {
    //
    //we create a try catch block so we have an action, manipulate data, etc
    try {
      console.log("await for api service and pass user");
      //here we are going to use the method from the fetchApiWithAth function
      await api.auth.login(name, email);
      const newUser = { name, email };
      setUser(newUser);
    } catch (err) {
      console.log("erro", err);
    }
  }, []);

  //use callback to avoid render every time this is called
  const logout = useCallback(async () => {
    try {
      console.log("await for api service and pass user");
      //here we call logout method from auth object in fetchWithAuth function
      await api.auth.logout();
      setUser(null);
    } catch (err) {
      console.log("erro", err);
    }
  }, []);

  //create constant value to store multiple variables, and pass them as value in the provider
  const value: AuthContextType = {
    user,
    // here !!user is to set the value to whatever user is, that way we wouldnt have to manually change it, it changes dynamically depeding if user is true or false
    isAuthenticated: !!user,
    login,
    logout,
  };

  //return the context with dot provider, pass a value, and children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
