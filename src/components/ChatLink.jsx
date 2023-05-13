import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useGlobal } from "../context/AppContext";

export default function ChatLink({ chat }) {
  const [user, setUser] = useState();
  const { authUser } = useUser();
  const { setChat } = useGlobal();
  useEffect(() => {
    if (authUser.uid === chat.uid1) {
      onSnapshot(doc(db, "users", chat.uid2), (doc) => {
        setUser(doc.data());
      });
    } else if (authUser.uid === chat.uid2) {
      onSnapshot(doc(db, "users", chat.uid1), (doc) => {
        setUser(doc.data());
      });
    } else {
      setUser();
    }
  }, [authUser]);
  function handleClick() {
    const unsub = onSnapshot(doc(db, "chats", chat.id), (doc) => {
      setChat(doc.data());
    });
  }
  return (
    <div
      className="flex px-6 py-1 items-center mb-2 cursor-pointer border-b dark:border-dark-received-bg border-light-received-bg "
      onClick={handleClick}
    >
      <div className="w-8 h-8 bg-orange-700 rounded-full mr-2 overflow-hidden">
        <img src={user?.photoURL} alt="" className="h-8 w-8 object-cover" />
      </div>
      <div>
        <p className="text-light-h dark:text-dark-h">
          {user?.userName}{" "}
          <span
            className={`ml-2 inline-block w-2 h-2 ${
              user?.online ? "bg-green-400" : "bg-red-400"
            } rounded-full`}
          ></span>
        </p>
        <p
          className="w-[200px] text-sm  overflow-ellipsis whitespace-nowrap overflow-hidden
        "
        >
          {chat?.messages.at(-1)?.msgContent}
        </p>
      </div>
    </div>
  );
}
