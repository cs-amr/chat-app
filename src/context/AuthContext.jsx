import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "../firebase";

export const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {},
});

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  return context;
}
