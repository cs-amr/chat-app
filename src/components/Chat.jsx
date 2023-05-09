import ReceivedMessage from "./RecivedMessage";
import SentMessage from "./SentMessage";
import { useRef } from "react";
export default function Chat() {
  const messagesRef = useRef(null);
  let ref = messagesRef.current;
  if (ref) {
    ref.scrollTop = ref.scrollHeight - ref?.clientHeight;
  }

  return (
    <div className="bg-light-chat-bg dark:bg-dark-chat-bg w-full  bg-chat-pattern h-screen duration-300 lg:static fixed left-[100vw]">
      <div className="relative w-full h-full flex flex-col ">
        <div className="backdrop-blur-sm bg-light-bg/70 dark:bg-dark-bg/30  border-b dark:border-gray-700 shadow   w-full min-h-[90px] max-h-[90px]  z-10 p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10  rounded-full"></div>
            <div className="dark:text-dark-p text-light-p ">
              <p className="font-bold text-lg">Marguerite Campbell</p>
              <div className="semibold">Active</div>
            </div>
          </div>
        </div>
        <ul
          id="mydiv"
          ref={messagesRef}
          className="px-6  absolute pb-[90px] overflow-scroll max-h-full w-full"
        >
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
        </ul>
        <div className="shadow absolute dark:border-slate-600 bottom-0 w-full h-[90px] border-t p-6 dark:bg-dark-chat-bg bg-light-chat-bg z-10">
          <form className="flex gap-4">
            <input
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
