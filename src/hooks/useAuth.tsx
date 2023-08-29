import { Dispatch, SetStateAction, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { AuthObject } from "../types/UserType";


interface AuthContextProps {
  auth?: AuthObject;
  setAuth: Dispatch<SetStateAction<AuthObject | undefined>>;
}


const useAuth = ():AuthContextProps => {
  return useContext(AuthContext)!;
};

export default useAuth;
