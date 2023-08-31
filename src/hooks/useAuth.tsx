import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { AuthObject } from "../types/UserType";

interface AuthContextProps {
  auth?: AuthObject;
  setAuth: (auth?: AuthObject) => void; // Update the type
}

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
