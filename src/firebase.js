import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfWTygRWZCJO0XRgxeYVXtV4C2zzKlOD0",
  authDomain: "chat-app-dfe5d.firebaseapp.com",
  projectId: "chat-app-dfe5d",
  storageBucket: "chat-app-dfe5d.appspot.com",
  messagingSenderId: "577478916573",
  appId: "1:577478916573:web:22255fe56a8bcf2e8cde34"
};


export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);

export const storage = getStorage();