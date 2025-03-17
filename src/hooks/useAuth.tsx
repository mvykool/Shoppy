import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  //initialize useContext by passing the desirared context
  const context = useContext(AuthContext);

  //check if the context exist
  if (context === undefined) {
    throw new Error("User must be authenticated");
  }

  //return context
  return context;
};
