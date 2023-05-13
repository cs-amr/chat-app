import Chats from "./Chats";
import Profile from "./Profile";
import Settings from "./Settings";
import Contacts from "./Contacts";

export default function Tap({ currentTap }) {
  return (
    <div className="bg-light-bg min-w-[300px] h-full dark:bg-dark-bg border-r dark:border-dark-chat-bg">
      {currentTap === "PROFILE" && <Profile />}
      {currentTap === "CHATS" && <Chats />}
      {currentTap === "SETTINGS" && <Settings />}
      {currentTap === "CONTACTS" && <Contacts />}
    </div>
  );
}
