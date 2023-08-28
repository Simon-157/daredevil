import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { AuthObject } from "../types/UserType";

interface AuthContextProps {
  auth?: AuthObject;
  setAuth: Dispatch<SetStateAction<AuthObject | undefined>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthObject | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
