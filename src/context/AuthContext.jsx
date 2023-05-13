import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {},
});
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      const userRef = doc(db, "users", user?.uid);
      if (user) {
        updateDoc(userRef, {
          online: true,
        });
      }
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
