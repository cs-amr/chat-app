import { useEffect, useState } from "react";
import ChatLink from "./ChatLink";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "../context/AuthContext";

export default function Chats() {
  const [chats, setChats] = useState();
  const colRef = collection(db, "chats");
  const { authUser } = useUser();
  // useEffect(() => {
  //   getDocs(colRef)
  //     .then((snapshot) => {
  //       let chats = [];
  //       snapshot.docs.forEach((doc) => {
  //         chats.push(doc.data());
  //       });
  //       setChats(chats);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, [authUser]);
  useEffect(() => {
    if (authUser) {
      onSnapshot(colRef, (snapshot) => {
        let chats = [];
        snapshot.docs.forEach((doc) => {
          chats.push(doc.data());
        });
        setChats(chats);
      });
    }
  }, [authUser]);

  return (
    <div>
      <div className="p-6   ">
        <div className="flex justify-between ">
          <h2 className="font-semibold text-2xl text-light-h dark:text-dark-h ">
            Chats
          </h2>
          <div></div>
        </div>
      </div>

      <div className="py-4 flex flex-col  justify-between  text-light-p dark:text-dark-p">
        <h3 className="p-6 py-3 text-sm font-semibold">Direct Messages</h3>
        <div>
          {chats &&
            chats?.map((chat, index) => {
              if (chat.id.includes(authUser.uid)) {
                return <ChatLink key={index} chat={chat} />;
              }
            })}
        </div>
      </div>
    </div>
  );
}
