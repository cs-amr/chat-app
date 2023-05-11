import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { db } from "../firebase";

export default function ChatLink({ user }) {
  const [chats, setChats] = useState();
  const { authUser } = useUser();
  const fid = user.uid + authUser.uid;
  const sid = authUser.uid + user.uid;
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  if (chats?.length === 0) {
    setDoc(doc(db, "chats", fid), {
      id: fid,
      messages: [],
      user1: authUser.uid,
      user2: user.uid,
    });
  }

  return (
    <div className="flex px-6 py-1 items-start mb-2 " onClick={handleClick}>
      <div className="w-7 h-7 bg-orange-700 rounded-full mr-2 overflow-hidden">
        <img src={user.photoURL} alt="" className="h-8 object-cover" />
      </div>
      <p className="text-light-h dark:text-dark-h">{user.userName}</p>
    </div>
  );
}
