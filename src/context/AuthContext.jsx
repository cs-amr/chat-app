import { collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { auth, db } from "../firebase";

export const AuthContext = createContext({
  user: null,
  authUser: null,
  setAuthUser: () => {},
});

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  return context;
}
