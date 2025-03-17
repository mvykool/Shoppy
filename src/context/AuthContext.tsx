import { createContext } from "react";
import { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});
