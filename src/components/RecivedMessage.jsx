export default function ReceivedMessage({ msg, user }) {
  return (
    <li className="my-4 flex flex-col max-w-full break-words w-[90%]">
      <div className="ml-6  mb-2 px-5 py-3 rounded dark:bg-dark-received-bg bg-light-received-bg text-black dark:text-white w-fit shadow">
        {msg.msgContent}
      </div>
      <div className="flex">
        <div className="w-7 h-7 bg-red-300 rounded-full mr-4 ">
          <img
            src={user?.photoURL}
            className="w-7 h-7 object-cover rounded-full"
            alt=""
          />
        </div>
        <p className="text-h dark:text-dark-h">
          <span className="font-semibold">{user?.userName}</span> {msg?.msgTime}
        </p>
      </div>
    </li>
  );
}
