import {create} from "zustand";
import { AuthObject } from "../types/UserType";

interface AuthStore {
  auth?: AuthObject;
  setAuth: (auth?: AuthObject) => void;
}

/* The code is creating a custom hook called `useAuthStore` using the `create` function from the
`zustand` library. */
export const useAuthStore = create<AuthStore>((set) => {
    const storedAuth = localStorage.getItem("auth");
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : undefined;
  
    return {
      auth: initialAuth,
      setAuth: (auth) => {
        set({ auth });
        if (auth) {
          localStorage.setItem("auth", JSON.stringify(auth));
        } else {
          localStorage.removeItem("auth");
        }
      },
    };
  });
  