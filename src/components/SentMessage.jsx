export default function SentMessage({ msg, user }) {
  return (
    <li className="ml-auto my-4 flex flex-col max-w-full break-words w-[90%]">
      <div className="mr-6 ml-auto mb-2 px-5 py-3 dark:bg-dark-sent-bg bg-light-sent-bg text-black dark:text-white w-fit shadow rounded">
        {" "}
        {msg.msgContent}{" "}
      </div>
      <div className="flex  justify-end">
        <p className="text-h dark:text-dark-h">
          {msg?.msgTime} <span className="font-semibold">You </span>{" "}
        </p>
        <div className="w-7 h-7 bg-red-300 rounded-full ml-4 ">
          <img
            src={user?.photoURL}
            className="w-7 h-7 object-cover rounded-full"
            alt=""
          />{" "}
        </div>
      </div>
    </li>
  );
}
