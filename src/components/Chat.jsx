import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { useUser } from "../context/AuthContext";
import ReceivedMessage from "./RecivedMessage";
import SentMessage from "./SentMessage";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useGlobal } from "../context/AppContext";

export default function Chat() {
  const { authUser } = useUser();
  const [chatUser, setchatUser] = useState();
  const messagesRef = useRef(null);
  const { chat, user, setChat } = useGlobal();
  let ref = messagesRef.current;
  if (ref) {
    ref.scrollTop = ref.scrollHeight - ref.clientHeight;
  }
  if (chat) {
    useEffect(() => {
      if (authUser.uid === chat.uid1) {
        onSnapshot(doc(db, "users", chat.uid2), (doc) => {
          setchatUser(doc.data());
        });
      } else {
        onSnapshot(doc(db, "users", chat.uid1), (doc) => {
          setchatUser(doc.data());
        });
      }
    }, [chat]);
  } else {
    useEffect(() => {});
  }
  function handleSubmit(e) {
    e.preventDefault();

    const time = Date().slice(4, 10) + Date().slice(15, 21);

    if (e.target.message.value.length > 0) {
      updateDoc(doc(db, "chats", chat.id), {
        messages: [
          ...chat.messages,
          {
            msgContent: e.target.message.value,
            senderId: authUser.uid,
            msgTime: time,
          },
        ],
      });
    }
    e.target.reset();
  }
  async function deleteChat() {
    const docRef = doc(db, "chats", chat.id);

    deleteDoc(docRef);
  }
  return (
    <div
      className={`bg-light-chat-bg dark:bg-dark-chat-bg w-full   bg-chat-pattern h-screen duration-300   ${
        chat ? "lg:static fixed" : "lg:fixed absolute left-[100vw]"
      } `}
    >
      <div className="relative w-full h-full flex flex-col ">
        <div className="backdrop-blur-sm bg-light-bg/70 dark:bg-dark-bg/30  border-b dark:border-gray-700 shadow   w-full min-h-[90px] max-h-[90px]  z-10 p-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setChat(null)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-chevron-left dark:text-white"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />{" "}
              </svg>
            </button>
            <div className="w-10 h-10  rounded-full">
              <img
                src={chatUser?.photoURL}
                className="rounded-full h-10 w-10 object-cover"
                alt=""
              />
            </div>
            <div className="dark:text-dark-p text-light-p ">
              <p className="font-bold text-lg">
                {chatUser?.userName}{" "}
                <span
                  className={`ml-2 inline-block w-2 h-2 ${
                    chatUser?.online ? "bg-green-400" : "bg-red-400"
                  } rounded-full`}
                ></span>
              </p>
              {/* <div className="semibold">Active</div> */}
            </div>
            <button
              className="ml-auto border text-red-200 rounded border-red-200 p-2"
              title="delete chat"
              onClick={deleteChat}
            >
              delete
            </button>
          </div>
        </div>
        <div className=" h-full items-end flex  ">
          <ul
            id="mydiv"
            ref={messagesRef}
            className=" px-6 absolute  pb-[90px] mt-auto min-h-fit overflow-scroll max-h-full w-full"
          >
            {chat?.messages?.map((msg, index) => {
              if (msg.senderId === authUser.uid) {
                return <SentMessage user={user} msg={msg} key={index} />;
              } else {
                return (
                  <ReceivedMessage user={chatUser} msg={msg} key={index} />
                );
              }
            })}
          </ul>
        </div>
        <div className="shadow absolute dark:border-slate-600 bottom-0 w-full h-[90px] border-t p-6 dark:bg-dark-chat-bg bg-light-chat-bg z-10">
          <form className="flex gap-4" onSubmit={(e) => handleSubmit(e)}>
            <input
              autocomplete="off"
              name="message"
              type="text"
              placeholder="Enter Your Message"
              className="border w-full px-4 py-2 rounded-md focus:outline-none dark:bg-dark-bg-sec dark:border-slate-600 dark:text-white"
            />
            <button className="h-11 w-11 rounded-md bg-light-sent-bg dark:bg-dark-sent-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-send-fill m-auto text-light-h dark:text-white"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
