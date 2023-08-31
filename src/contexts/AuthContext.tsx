import { createContext, ReactNode  } from "react";
import { AuthObject } from "../types/UserType";
import { useAuthStore } from "../store/authStore";



interface AuthContextProps {
  auth?: AuthObject;
  setAuth: (auth?: AuthObject) => void; // Change the type here
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthStore((state) => state.auth);
  const setAuth = useAuthStore((state) => state.setAuth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
