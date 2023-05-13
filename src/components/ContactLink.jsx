import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { db } from "../firebase";
import { useGlobal } from "../context/AppContext";

export default function CantactLink({ linkUser }) {
  const [chats, setChats] = useState();
  const { user, setChat } = useGlobal();
  const fid = linkUser.uid + user.uid;
  const sid = user.uid + linkUser.uid;
  function handleClick() {
    const colRef = collection(db, "chats");
    getDocs(colRef)
      .then((snapshot) => {
        let chats = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().id === fid) {
            chats.push(doc.data());
          } else if (doc.data().id === sid) {
            chats.push(doc.data());
          }
        });
        setChats(chats);
        console.log(chats);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  if (chats?.length === 0) {
    setDoc(doc(db, "chats", fid), {
      id: fid,
      messages: [],
      uid1: user.uid,
      uid2: linkUser.uid,
    });
  }
  return (
    <div
      className="flex px-6 py-1 items-start mb-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-7 h-7 bg-orange-700 rounded-full mr-2 overflow-hidden">
        <img src={linkUser.photoURL} alt="" className="h-8 w-8 object-cover" />
      </div>
      <p className="text-light-h dark:text-dark-h">{linkUser.userName}</p>
    </div>
  );
}
