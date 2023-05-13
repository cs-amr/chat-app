import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
export const AppContext = createContext();
export default function AppProvider({ children }) {
  const [user, setUser] = useState();
  const { authUser } = useUser();
  const [chat, setChat] = useState();

  useEffect(() => {
    if (authUser) {
      onSnapshot(doc(db, "users", authUser.uid), (doc) => {
        setUser(doc.data());
      });
    }
  }, [authUser]);
  return (
    <AppContext.Provider value={{ user, setUser, chat, setChat }}>
      {children}
    </AppContext.Provider>
  );
}

export function useGlobal() {
  return useContext(AppContext);
}
